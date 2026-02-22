// ============================================================
// ELEMENTAL VOID — ENGINE.JS
// Core engine — state, rendering, canvas, battle, save/load
// No ES modules. Works offline via <script> tags.
// ============================================================

const EV = (() => {

  const CHAPTERS = {};

  function registerChapter(arcNum, chapterNum, data) {
    CHAPTERS[`${arcNum}-${chapterNum}`] = data;
  }

  // ── DEFAULT STATE ──────────────────────────────────────────
  const DEFAULT_STATE = {
    player: {
      name: '',
      origin: '',
      soul: '',
      nature: '',
      instinct: '',
      primaryElement: null,
      secondaryElement: null,
      tertiaryElement: null,
      knownElements: [],    // All elements the player has learned
      _pendingElement: null, // Set by chargen, revealed by serpent
    },
    stats: {
      hp: 100, maxHp: 100,
      mana: 80, maxMana: 80,
      strength: 10,
      agility: 10,
      resolve: 10,     // Willpower. Persuasion, mental resistance, mana efficiency, resist corruption gain
      magic: 10,       // Magical power. Element attack damage, spell checks, elemental interactions
      corruption: 0,   // Darkness. Dark choices, shadow boost, light penalty, NPC reactions, story gates
    },
    flags: {},
    inventory: [],
    visitedScenes: {},  // Track visited scenes to prevent exploit loops
    currentArc: 1,
    currentChapter: 1,
    currentScene: 'start',
    history: [],
    killCount: 0,
    choiceLog: [],
  };

  let state = JSON.parse(JSON.stringify(DEFAULT_STATE));
  let chapterData = null;

  // ── ELEMENT METADATA (ALL 25) ──────────────────────────────
  const ELEMENTS = {
    fire:        { label:'Fire',        color:'#c0392b', glow:'#ff6b35', symbol:'🔥', tier:'primary',   desc:'Heat, passion, destruction' },
    water:       { label:'Water',       color:'#2980b9', glow:'#74c5e8', symbol:'🌊', tier:'primary',   desc:'Fluidity, adaptation, healing' },
    earth:       { label:'Earth',       color:'#6b4c2a', glow:'#a0784a', symbol:'⛰',  tier:'primary',   desc:'Stability, endurance, will' },
    wind:        { label:'Wind',        color:'#27ae60', glow:'#7dcea0', symbol:'🌀', tier:'primary',   desc:'Freedom, intellect, movement' },
    light:       { label:'Light',       color:'#d4ac0d', glow:'#f9e79f', symbol:'☀',  tier:'primary',   desc:'Truth, clarity, radiance' },
    shadow:      { label:'Shadow',      color:'#5b2c6f', glow:'#a569bd', symbol:'🌑', tier:'primary',   desc:'Mystery, void, concealment' },
    ice:         { label:'Ice',         color:'#85c1e9', glow:'#d6eaf8', symbol:'❄',  tier:'secondary', desc:'Water + Wind' },
    metal:       { label:'Metal',       color:'#aab7b8', glow:'#d5dbdb', symbol:'⚙',  tier:'secondary', desc:'Earth + Fire' },
    electricity: { label:'Electricity', color:'#f4d03f', glow:'#fef9e7', symbol:'⚡', tier:'secondary', desc:'Fire + Wind' },
    nature:      { label:'Nature',      color:'#1e8449', glow:'#82e0aa', symbol:'🌿', tier:'secondary', desc:'Earth + Water' },
    crystal:     { label:'Crystal',     color:'#76d7c4', glow:'#d1f2eb', symbol:'💎', tier:'secondary', desc:'Earth + Light' },
    storm:       { label:'Storm',       color:'#2471a3', glow:'#7fb3d3', symbol:'⛈',  tier:'secondary', desc:'Wind + Water' },
    lava:        { label:'Lava',        color:'#ba4a00', glow:'#f0b27a', symbol:'🌋', tier:'secondary', desc:'Fire + Earth' },
    sound:       { label:'Sound',       color:'#884ea0', glow:'#c39bd3', symbol:'🔊', tier:'secondary', desc:'Wind + Water' },
    space:       { label:'Space',       color:'#1a1a2e', glow:'#7986cb', symbol:'✦',  tier:'tertiary',  desc:'Shadow + Crystal' },
    gravity:     { label:'Gravity',     color:'#2c3e50', glow:'#85929e', symbol:'◉',  tier:'tertiary',  desc:'Earth + Space' },
    time:        { label:'Time',        color:'#b7950b', glow:'#f7dc6f', symbol:'⏳', tier:'tertiary',  desc:'Light + Space' },
    arcane:      { label:'Arcane',      color:'#6c3483', glow:'#d7bde2', symbol:'✴',  tier:'tertiary',  desc:'Light + Crystal' },
    illusion:    { label:'Illusion',    color:'#117a65', glow:'#76d7c4', symbol:'◈',  tier:'tertiary',  desc:'Shadow + Light' },
    venom:       { label:'Venom',       color:'#1e8449', glow:'#58d68d', symbol:'☠',  tier:'tertiary',  desc:'Shadow + Nature' },
    cosmic:      { label:'Cosmic',      color:'#1a0533', glow:'#9b59b6', symbol:'🌌', tier:'master',    desc:'Space + Light + Time' },
    soul:        { label:'Soul',        color:'#f8f9fa', glow:'#aed6f1', symbol:'👁',  tier:'master',    desc:'Light + Nature + Arcane' },
    void_el:     { label:'Void',        color:'#0a0a0a', glow:'#5d6d7e', symbol:'◯',  tier:'master',    desc:'Shadow + Space + Gravity' },
    creation:    { label:'Creation',    color:'#fdfefe', glow:'#fad7a0', symbol:'✨', tier:'master',    desc:'Light + Nature + Arcane' },
    continuum:   { label:'Continuum',   color:'#0e2954', glow:'#5dade2', symbol:'∞',  tier:'master',    desc:'Space + Time + Gravity' },
  };

  // ── SAVE / LOAD ────────────────────────────────────────────
  const SAVE_KEY = 'elemental_void_save';
  function save() { try { localStorage.setItem(SAVE_KEY, JSON.stringify(state)); showNotification('Progress saved.','success'); } catch(e) { showNotification('Save failed.','error'); } }
  function load() {
    try {
      const r = localStorage.getItem(SAVE_KEY);
      if (!r) { showNotification('No save found.', 'warning'); return false; }
      const loaded = JSON.parse(r);
      // Clear and repopulate same object to preserve EV.state reference
      Object.keys(state).forEach(k => delete state[k]);
      Object.assign(state, loaded);
      showNotification('Save loaded.', 'success');
      return true;
    } catch(e) { showNotification('Load failed.', 'error'); return false; }
  }
  function deleteSave(silent) {
    localStorage.removeItem(SAVE_KEY);
    // Clear and repopulate same object to preserve EV.state reference
    const fresh = JSON.parse(JSON.stringify(DEFAULT_STATE));
    Object.keys(state).forEach(k => delete state[k]);
    Object.assign(state, fresh);
    if (!silent) showNotification('Save erased.', 'warning');
  }
  function hasSave() { return !!localStorage.getItem(SAVE_KEY); }

  // ── NOTIFICATION ───────────────────────────────────────────
  function showNotification(msg, type='info') {
    const el=document.getElementById('notification'); if(!el)return;
    el.textContent=msg; el.className=`notification show ${type}`;
    setTimeout(()=>el.classList.remove('show'), 2800);
  }

  // ── STAT HELPERS ───────────────────────────────────────────
  function modStat(stat, delta) {
    if(!(stat in state.stats))return;
    const maxKey='max'+stat.charAt(0).toUpperCase()+stat.slice(1);
    const cap=state.stats[maxKey]||(stat==='corruption'?100:9999);
    state.stats[stat]=Math.max(0, Math.min(state.stats[stat]+delta, cap));
    renderStats();
  }
  function setFlag(key, val) { state.flags[key]=(val===undefined)?true:val; }
  function getFlag(key) { return state.flags[key]; }
  function hasFlag(key) { return !!state.flags[key]; }
  function addItem(name,icon) { state.inventory.push({name,icon:icon||'◆'}); renderInventory(); showNotification(`Acquired: ${name}`,'info'); }
  function removeItem(name) { const i=state.inventory.findIndex(it=>it.name===name); if(i>-1)state.inventory.splice(i,1); renderInventory(); }
  function hasItem(name) { return state.inventory.some(it=>it.name===name); }

  // ── CONSUMABLE ITEMS ────────────────────────────────────────
  const CONSUMABLE_EFFECTS = {
    'Mana Tincture':     { mana: 30, msg: 'Mana surges back. +30 mana.' },
    'Salvaged Tincture': { mana: 20, msg: 'Crude but effective. +20 mana.' },
    'Health Salve':      { hp: 30,   msg: 'Warmth spreads through wounds. +30 HP.' },
    'Trail Rations':     { hp: 15, mana: 10, msg: 'You eat quickly. +15 HP, +10 mana.' },
    'Fire Herb Pouch':   { mana: 25, msg: 'The herbs burn pleasantly. +25 mana.' },
    'Clarity Fruit':     { mana: 20, hp: 10, msg: 'Sweet and sharp. +10 HP, +20 mana.' },
  };

  function useConsumable(name) {
    const effects = CONSUMABLE_EFFECTS[name];
    if (!effects) {
      // Generic fallback for unknown consumables
      modStat('hp', 20); modStat('mana', 15);
      logBattle(`You use ${name}. +20 HP, +15 mana.`, 'log-hit');
    } else {
      if (effects.hp) modStat('hp', effects.hp);
      if (effects.mana) modStat('mana', effects.mana);
      logBattle(effects.msg, 'log-hit');
    }
    removeItem(name);
    renderStats();
    updateBattleDisplay();
    // Enemy still gets a turn after item use
    enemyTurn();
  }

  // ── MAGIC CHECK (for story choices gated by magic stat) ──
  function magicCheck(threshold) {
    const roll = state.stats.magic + Math.floor(Math.random() * 6);
    return roll >= threshold;
  }

  // ── ELEMENT HELPERS ────────────────────────────────────────
  function knowsElement(el) { return state.player.knownElements.includes(el); }
  function learnElement(el) {
    if(!knowsElement(el)) {
      state.player.knownElements.push(el);
      const meta=ELEMENTS[el];
      if(meta) showNotification(`Element awakened: ${meta.symbol} ${meta.label}`,'success');
      renderStats();
    }
  }
  function getPlayerElementMeta() {
    const el=state.player.primaryElement;
    return el?ELEMENTS[el]:null;
  }

  // ── DYNAMIC TEXT ───────────────────────────────────────────
  // Replaces {ELEMENT}, {ELEMENT_SYMBOL}, {ELEMENT_DESC}, {PLAYER_NAME} in scene text
  function resolveDynamicText(raw) {
    let text = raw;
    const el = state.player.primaryElement;
    const meta = el ? ELEMENTS[el] : null;
    text = text.replace(/\{ELEMENT\}/g, meta ? meta.label : 'your element');
    text = text.replace(/\{ELEMENT_LOWER\}/g, meta ? meta.label.toLowerCase() : 'your element');
    text = text.replace(/\{ELEMENT_SYMBOL\}/g, meta ? meta.symbol : '◆');
    text = text.replace(/\{ELEMENT_DESC\}/g, meta ? meta.desc : '');
    text = text.replace(/\{ELEMENT_COLOR\}/g, meta ? meta.glow : '#c9a84c');
    text = text.replace(/\{PLAYER_NAME\}/g, state.player.name || 'Outsider');
    return text;
  }

  // ── RENDER STATS ───────────────────────────────────────────
  function renderStats() {
    const s=state.stats, p=state.player;
    const setPct=(id,val,max)=>{const el=document.getElementById(id);if(el)el.style.width=Math.min(100,Math.max(0,(val/max)*100))+'%';};
    const setText=(id,txt)=>{const el=document.getElementById(id);if(el)el.textContent=txt;};
    setPct('bar-hp',s.hp,s.maxHp); setPct('bar-mana',s.mana,s.maxMana);
    setPct('bar-str',s.strength,100); setPct('bar-agi',s.agility,100);
    setPct('bar-res',s.resolve,100); setPct('bar-mag',s.magic,100); setPct('bar-cor',s.corruption,100);
    setText('val-hp',`${s.hp}/${s.maxHp}`); setText('val-mana',`${s.mana}/${s.maxMana}`);
    setText('val-str',s.strength); setText('val-agi',s.agility);
    setText('val-res',s.resolve); setText('val-mag',s.magic); setText('val-cor',s.corruption);
    // Element display
    const elPanel=document.getElementById('element-display');
    if(elPanel){
      elPanel.innerHTML='';
      if(p.knownElements.length===0){
        elPanel.innerHTML='<span class="inv-empty">No affinity yet</span>';
      } else {
        p.knownElements.forEach(el=>{
          const meta=ELEMENTS[el]; if(!meta)return;
          const badge=document.createElement('span');
          badge.className='element-badge';
          badge.style.cssText=`color:${meta.glow};border-color:${meta.color};text-shadow:0 0 8px ${meta.glow};`;
          badge.innerHTML=`${meta.symbol} ${meta.label}`;
          elPanel.appendChild(badge);
        });
      }
    }
    // Corruption bar color
    const corBar=document.getElementById('bar-cor');
    if(corBar){corBar.style.background=s.corruption>70?'linear-gradient(90deg,#4a0080,#9b00ff)':s.corruption>40?'linear-gradient(90deg,#5b2c6f,#7d3c98)':'linear-gradient(90deg,#1a0533,#5b2c6f)';}
    const nameEl=document.getElementById('player-name-display');
    if(nameEl&&p.name)nameEl.textContent=p.name;
    const arcLabel=document.getElementById('arc-label');
    if(arcLabel)arcLabel.textContent=`Arc ${state.currentArc} · Chapter ${state.currentChapter}`;
  }

  function renderInventory() {
    const bar=document.getElementById('inventory-bar'); if(!bar)return;
    bar.innerHTML='';
    if(state.inventory.length===0){bar.innerHTML='<span class="inv-empty">— empty —</span>';return;}
    state.inventory.forEach(item=>{
      const span=document.createElement('span'); span.className='inv-item';
      span.innerHTML=`<span class="inv-icon">${item.icon}</span> ${item.name}`;
      bar.appendChild(span);
    });
  }

  // ── TEXT FORMATTING ────────────────────────────────────────
  function formatText(raw) {
    let text=raw.trim();
    // Process tags BEFORE paragraph split (dotAll flag 's' for multi-line spans)
    text=text.replace(/\[blood\]([\s\S]*?)\[\/blood\]/g,'<span class="text-blood">$1</span>');
    text=text.replace(/\[void\]([\s\S]*?)\[\/void\]/g,'<span class="text-void">$1</span>');
    text=text.replace(/\[element\]([\s\S]*?)\[\/element\]/g,'<span class="text-element">$1</span>');
    text=text.replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>');
    text=text.replace(/\*(.+?)\*/g,'<em>$1</em>');
    return text.split('\n\n').map(p=>`<p>${p.trim()}</p>`).join('');
  }

  // ── SCENE RENDERING ────────────────────────────────────────
  let typewriterTimer=null;

  function renderScene(sceneObj) {
    if(!sceneObj)return;
    const key=findSceneKey(sceneObj);
    if(key) {
      state.currentScene=key;
      const visitKey=`${state.currentArc}-${state.currentChapter}-${key}`;
      state.visitedScenes[visitKey]=true;
    }
    // Assign pending element BEFORE text resolution so {ELEMENT} works
    if(state.player._pendingElement && !state.player.primaryElement) {
      // Check if this scene or previous scenes set element_revealed
      // We check effects preemptively
      if((sceneObj.effects && sceneObj.effects.setFlag && sceneObj.effects.setFlag.element_revealed) || state.flags.element_revealed) {
        state.player.primaryElement = state.player._pendingElement;
        learnElement(state.player._pendingElement);
        delete state.player._pendingElement;
      }
    }
    const locEl=document.getElementById('location-display');
    if(locEl) locEl.textContent=sceneObj.location||'Unknown';
    const resolved=resolveDynamicText(sceneObj.text);
    const sceneEl=document.getElementById('scene-text');
    if(sceneEl){
      const html=formatText(resolved);
      typewriterHTML(sceneEl,html,()=>renderChoices(sceneObj.choices||[]));
    }
    if(sceneObj.effects) applyEffects(sceneObj.effects);
    if(sceneObj.scene) drawScene(sceneObj.scene);
    else if(sceneObj.mood) drawScene(sceneObj.mood);
    const moodTitle=document.getElementById('mood-title');
    if(moodTitle) moodTitle.textContent=sceneObj.moodLabel||'';
    renderStats();
  }

  function findSceneKey(sceneObj) {
    if(!chapterData)return null;
    for(const[key,val]of Object.entries(chapterData)){if(val===sceneObj)return key;}
    return null;
  }

  function typewriterHTML(container,html,callback) {
    if(typewriterTimer)clearTimeout(typewriterTimer);
    const tmp=document.createElement('div'); tmp.innerHTML=html;
    container.innerHTML='';
    const paragraphs=tmp.querySelectorAll('p');
    let i=0;
    function next(){
      if(i>=paragraphs.length){if(callback)callback();return;}
      const p=document.createElement('p'); p.className='scene-paragraph';
      p.innerHTML=paragraphs[i].innerHTML; p.style.animationDelay=(i*0.12)+'s';
      container.appendChild(p); i++;
      typewriterTimer=setTimeout(next,80);
    }
    next();
  }

  function renderChoices(choices) {
    const box=document.getElementById('choice-container'); if(!box)return;
    box.style.display=''; box.innerHTML='';
    const visible=choices.filter(c=>{
      if(!c.condition)return true;
      return evalCondition(c.condition);
    });
    visible.forEach((choice,idx)=>{
      const btn=document.createElement('button');
      btn.className='choice-btn';
      let label=resolveDynamicText(choice.text);
      btn.innerHTML=`<span class="choice-num">${idx+1}.</span> ${label}`;
      if(choice.hint) btn.innerHTML+=`<span class="choice-hint">${resolveDynamicText(choice.hint)}</span>`;
      if(choice.disabled){btn.classList.add('disabled');}
      btn.style.animationDelay=(idx*0.1)+'s';
      btn.addEventListener('click',()=>{ if(choice.disabled)return; handleChoice(choice); });
      box.appendChild(btn);
    });
  }

  function handleChoice(choice) {
    state.choiceLog.push(choice.text);
    if(state.choiceLog.length>30)state.choiceLog.shift();
    if(choice.effects) applyEffects(choice.effects);
    if(choice.next) navigateTo(choice.next);
  }

  function applyEffects(effects) {
    if(!effects)return;
    if(effects.hp!==undefined)       modStat('hp',effects.hp);
    if(effects.mana!==undefined)     modStat('mana',effects.mana);
    if(effects.maxMana!==undefined)  {state.stats.maxMana+=effects.maxMana;modStat('mana',effects.maxMana);}
    if(effects.strength!==undefined) modStat('strength',effects.strength);
    if(effects.agility!==undefined)  modStat('agility',effects.agility);
    if(effects.resolve!==undefined)  modStat('resolve',effects.resolve);
    if(effects.magic!==undefined)    modStat('magic',effects.magic);
    if(effects.corruption!==undefined){
      // Resolve reduces corruption gain: every 10 resolve = 1 less corruption gained
      let corDelta=effects.corruption;
      if(corDelta>0){corDelta=Math.max(1,corDelta-Math.floor(state.stats.resolve/10));}
      modStat('corruption',corDelta);
    }
    if(effects.item){const it=effects.item;addItem(typeof it==='string'?it:it.name,it.icon);}
    if(effects.removeItem)removeItem(effects.removeItem);
    if(effects.setFlag)Object.entries(effects.setFlag).forEach(([k,v])=>setFlag(k,v));
    if(effects.learnElement)learnElement(effects.learnElement);
    if(effects.kill)state.killCount+=effects.kill;
    renderStats();
  }

  function evalCondition(cond) {
    if(!cond)return true;
    try{
      if(cond.flag) return hasFlag(cond.flag)===(cond.is!==false);
      if(cond.noFlag) return !hasFlag(cond.noFlag);
      if(cond.stat) return state.stats[cond.stat]>=(cond.min||0);
      if(cond.statBelow) return state.stats[cond.statBelow]<(cond.max||999);
      if(cond.item) return hasItem(cond.item);
      if(cond.element) return knowsElement(cond.element);
      if(cond.noElement) return !knowsElement(cond.noElement);
      if(cond.corruption) return state.stats.corruption>=cond.corruption;
      if(cond.corruptionBelow) return state.stats.corruption<cond.corruptionBelow;
      if(cond.resolve) return state.stats.resolve>=cond.resolve;
      if(cond.magic) return state.stats.magic>=cond.magic;
      if(cond.visited){
        const vk=`${state.currentArc}-${state.currentChapter}-${cond.visited}`;
        return !!state.visitedScenes[vk];
      }
      if(cond.notVisited){
        const vk=`${state.currentArc}-${state.currentChapter}-${cond.notVisited}`;
        return !state.visitedScenes[vk];
      }
      if(cond.fn) return cond.fn(state);
      // AND: all conditions must be true
      if(cond.and) return cond.and.every(c=>evalCondition(c));
      // OR: at least one must be true
      if(cond.or) return cond.or.some(c=>evalCondition(c));
    }catch(e){return true;}
    return true;
  }

  // ── NAVIGATION ─────────────────────────────────────────────
  function navigateTo(target) {
    if(typeof target==='object'){api.renderScene(target);return;}
    const parts=target.split('/');
    if(parts.length===3){
      const arcNum=parseInt(parts[0].replace('arc',''));
      const chNum=parseInt(parts[1].replace('chapter',''));
      loadChapter(arcNum,chNum,parts[2]);
    } else if(parts.length===1){
      if(chapterData&&chapterData[target]){api.renderScene(chapterData[target]);}
      else{showNotification('Scene missing: '+target,'error');}
    }
  }

  function loadChapter(arcNum,chapterNum,startScene) {
    state.currentArc=arcNum; state.currentChapter=chapterNum;
    const data=CHAPTERS[`${arcNum}-${chapterNum}`];
    if(!data){showNotification(`Chapter ${arcNum}.${chapterNum} not yet available.`,'warning');return;}
    chapterData=data;
    const scene=startScene||Object.keys(chapterData)[0];
    state.currentScene=scene;
    if(chapterData[scene])api.renderScene(chapterData[scene]);
    else showNotification('Scene not found: '+scene,'error');
  }

  // ══════════════════════════════════════════════════════════
  // CANVAS SCENE SYSTEM
  // ══════════════════════════════════════════════════════════
  let canvas,ctx,sceneAnimFrame=null,sceneTime=0,currentCanvasScene='void';

  function initCanvas(){
    canvas=document.getElementById('scene-canvas'); if(!canvas)return;
    ctx=canvas.getContext('2d'); resizeCanvas();
    window.addEventListener('resize',resizeCanvas);
  }
  function resizeCanvas(){if(!canvas)return;const r=canvas.parentElement.getBoundingClientRect();canvas.width=r.width;canvas.height=r.height;}

  function drawScene(sceneName){
    currentCanvasScene=sceneName||'void';
    if(sceneAnimFrame)cancelAnimationFrame(sceneAnimFrame);
    sceneTime=0;
    function animate(){
      sceneTime+=0.016;if(!ctx||!canvas)return;
      ctx.clearRect(0,0,canvas.width,canvas.height);
      const W=canvas.width,H=canvas.height;
      switch(currentCanvasScene){
        case 'void':drawVoid(W,H);break;
        case 'dark':case 'forest':drawDarkForest(W,H);break;
        case 'village':drawVillage(W,H);break;
        case 'battle':drawBattleVis(W,H);break;
        case 'mountain':drawMountain(W,H);break;
        case 'lake':drawLake(W,H);break;
        case 'sanctuary':drawSanctuary(W,H);break;
        case 'road':drawRoad(W,H);break;
        case 'checkpoint':drawCheckpoint(W,H);break;
        case 'fire':drawFireScene(W,H);break;
        case 'serpent':drawSerpent(W,H);break;
        case 'hollow':drawHollow(W,H);break;
        default:drawVoid(W,H);break;
      }
      sceneAnimFrame=requestAnimationFrame(animate);
    }
    animate();
  }

  function drawVoid(W,H){
    const g=ctx.createRadialGradient(W/2,H/2,0,W/2,H/2,Math.max(W,H)*0.7);
    g.addColorStop(0,'#0e0618');g.addColorStop(0.5,'#080410');g.addColorStop(1,'#020104');
    ctx.fillStyle=g;ctx.fillRect(0,0,W,H);
    for(let i=0;i<100;i++){
      const x=Math.sin(i*2.3+sceneTime*0.08)*W*0.48+W/2;
      const y=Math.cos(i*1.7+sceneTime*0.06)*H*0.45+H/2;
      const sz=(Math.sin(i*3.1+sceneTime*1.2)*0.5+0.5)*2.5+0.3;
      const a=0.2+Math.sin(i+sceneTime*0.8)*0.2;
      ctx.fillStyle=`rgba(160,100,220,${a})`;ctx.beginPath();ctx.arc(x,y,sz,0,Math.PI*2);ctx.fill();
    }
    ctx.save();ctx.translate(W/2,H/2);
    for(let i=0;i<4;i++){ctx.rotate(sceneTime*0.15+i*Math.PI/2);
      const lg=ctx.createLinearGradient(0,-H*0.4,0,H*0.4);
      lg.addColorStop(0,'rgba(80,30,160,0)');lg.addColorStop(0.5,'rgba(80,30,160,0.12)');lg.addColorStop(1,'rgba(80,30,160,0)');
      ctx.fillStyle=lg;ctx.fillRect(-W*0.008,-H*0.4,W*0.016,H*0.8);
    }
    ctx.restore();
    const p=Math.sin(sceneTime*0.6)*0.15+0.85;
    ctx.strokeStyle=`rgba(201,168,76,${0.3*p})`;ctx.lineWidth=1.5;
    ctx.beginPath();ctx.arc(W/2,H/2,25*p,0,Math.PI*2);ctx.stroke();
  }

  function drawDarkForest(W,H){
    const sky=ctx.createLinearGradient(0,0,0,H*0.6);sky.addColorStop(0,'#050808');sky.addColorStop(1,'#0a1510');
    ctx.fillStyle=sky;ctx.fillRect(0,0,W,H);ctx.fillStyle='#060e08';ctx.fillRect(0,H*0.62,W,H*0.4);
    for(let i=0;i<18;i++){
      const x=(i/17)*W*1.15-W*0.075,tH=H*0.35+Math.sin(i*2.3)*H*0.12,sw=Math.sin(sceneTime*0.4+i*0.8)*2;
      ctx.save();ctx.translate(x+sw,H*0.65);ctx.fillStyle='#1a100a';ctx.fillRect(-3,-tH*0.3,6,tH*0.35);
      for(let l=0;l<3;l++){ctx.fillStyle=`rgba(${8+l*6},${30+l*12},${10+l*4},${0.85-l*0.15})`;
        ctx.beginPath();ctx.moveTo(0,-tH-l*10);ctx.lineTo(-22+l*4,-tH*0.45-l*8);ctx.lineTo(22-l*4,-tH*0.45-l*8);ctx.closePath();ctx.fill();}
      ctx.restore();
    }
    for(let i=0;i<30;i++){const t=sceneTime*0.2+i*1.1,x=(Math.sin(t*0.5+i)*0.5+0.5)*W,y=H*0.4+(Math.cos(t*0.3+i*2)*0.5+0.5)*H*0.45,a=(Math.sin(t*2.5)*0.5+0.5)*0.6;
      ctx.fillStyle=`rgba(80,200,120,${a})`;ctx.beginPath();ctx.arc(x,y,1.2,0,Math.PI*2);ctx.fill();}
    for(let i=0;i<15;i++){const b=Math.sin(sceneTime*1.5+i*3.1)*0.3+0.4;ctx.fillStyle=`rgba(180,140,200,${b})`;
      ctx.beginPath();ctx.arc((Math.sin(i*4.3)*0.5+0.5)*W,(Math.cos(i*2.7)*0.5+0.5)*H*0.35,0.8,0,Math.PI*2);ctx.fill();}
  }

  function drawVillage(W,H){
    const sky=ctx.createLinearGradient(0,0,0,H*0.6);sky.addColorStop(0,'#0a0e18');sky.addColorStop(1,'#141a28');
    ctx.fillStyle=sky;ctx.fillRect(0,0,W,H);ctx.fillStyle='#0e0c08';ctx.fillRect(0,H*0.6,W,H*0.4);
    [{x:.08,w:.12,h:.28,r:'#3a1808'},{x:.22,w:.14,h:.34,r:'#2a3015'},{x:.40,w:.18,h:.38,r:'#3a2008'},{x:.60,w:.13,h:.26,r:'#3a1a08'},{x:.76,w:.16,h:.30,r:'#2a2510'}].forEach(b=>{
      const x=b.x*W,w=b.w*W,h=b.h*H,y=H*0.6;ctx.fillStyle='#1a1408';ctx.fillRect(x,y-h,w,h);
      for(let wy=1;wy<3;wy++){for(let wx=0;wx<2;wx++){const lit=Math.sin(sceneTime*2.5+b.x*10+wy+wx)>-0.2;ctx.fillStyle=lit?'rgba(200,140,40,0.7)':'rgba(20,15,8,0.8)';ctx.fillRect(x+w*0.15+wx*w*0.35,y-h*(0.2+wy*0.25),w*0.2,h*0.15);}}
      ctx.fillStyle=b.r;ctx.beginPath();ctx.moveTo(x-w*0.05,y-h);ctx.lineTo(x+w*0.5,y-h-h*0.3);ctx.lineTo(x+w*1.05,y-h);ctx.closePath();ctx.fill();
    });
  }

  function drawSerpent(W,H){
    drawDarkForest(W,H);
    const eg=Math.sin(sceneTime*0.8)*0.2+0.7;
    for(let side of[-1,1]){const ex=W/2+side*20,ey=H*0.4;
      const g=ctx.createRadialGradient(ex,ey,0,ex,ey,15);g.addColorStop(0,`rgba(140,200,255,${eg})`);g.addColorStop(0.4,`rgba(80,140,200,${eg*0.5})`);g.addColorStop(1,'rgba(80,140,200,0)');
      ctx.fillStyle=g;ctx.fillRect(ex-20,ey-20,40,40);ctx.fillStyle=`rgba(200,230,255,${eg})`;ctx.beginPath();ctx.arc(ex,ey,3,0,Math.PI*2);ctx.fill();}
    ctx.save();ctx.globalAlpha=0.15+Math.sin(sceneTime*0.3)*0.05;
    for(let i=0;i<20;i++){const t=sceneTime*0.2+i*0.5,sx=W/2+Math.sin(t)*(40+i*6),sy=H*0.4+Math.cos(t*0.7)*15+i*4;
      ctx.fillStyle='#1a1a2e';ctx.beginPath();ctx.arc(sx,sy,8-i*0.3,0,Math.PI*2);ctx.fill();}
    ctx.restore();
  }

  function drawHollow(W,H){
    drawDarkForest(W,H);
    // Glitch overlay
    const glitchAlpha=0.05+Math.sin(sceneTime*7)*0.03;
    ctx.fillStyle=`rgba(180,180,200,${glitchAlpha})`;
    for(let i=0;i<5;i++){const y=Math.random()*H,h=1+Math.random()*3;ctx.fillRect(0,y,W,h);}
    // Hollow figure
    const cx=W/2,cy=H*0.35;
    const jitter=Math.sin(sceneTime*11)*2;
    ctx.save();ctx.translate(cx+jitter,cy);
    // Body — tall, wrong proportions
    ctx.fillStyle='rgba(10,8,15,0.9)';
    ctx.beginPath();ctx.ellipse(0,30,12,50,0,0,Math.PI*2);ctx.fill();
    // Head — smooth, featureless, pale
    const headGlow=ctx.createRadialGradient(0,-25,0,0,-25,18);
    headGlow.addColorStop(0,`rgba(200,195,210,${0.7+Math.sin(sceneTime*2)*0.1})`);headGlow.addColorStop(1,'rgba(200,195,210,0)');
    ctx.fillStyle=headGlow;ctx.beginPath();ctx.arc(0,-25,14,0,Math.PI*2);ctx.fill();
    ctx.fillStyle='rgba(180,175,195,0.6)';ctx.beginPath();ctx.arc(0,-25,10,0,Math.PI*2);ctx.fill();
    // Arms — too long
    ctx.strokeStyle='rgba(10,8,15,0.7)';ctx.lineWidth=3;
    ctx.beginPath();ctx.moveTo(-10,0);ctx.lineTo(-30+Math.sin(sceneTime*1.5)*5,60);ctx.stroke();
    ctx.beginPath();ctx.moveTo(10,0);ctx.lineTo(30+Math.cos(sceneTime*1.5)*5,65);ctx.stroke();
    ctx.restore();
    // Wrongness aura
    const wa=ctx.createRadialGradient(cx,cy,0,cx,cy,80);
    wa.addColorStop(0,`rgba(40,0,60,${0.15+Math.sin(sceneTime*0.7)*0.05})`);wa.addColorStop(1,'rgba(40,0,60,0)');
    ctx.fillStyle=wa;ctx.fillRect(0,0,W,H);
  }

  function drawFireScene(W,H){
    drawDarkForest(W,H);
    for(let i=0;i<15;i++){const fx=W/2+Math.sin(sceneTime*3+i*1.1)*(8+i*2),fy=H*0.55-i*5-Math.sin(sceneTime*4+i)*5,sz=6-i*0.3,a=Math.max(0,0.7-i*0.04);
      ctx.fillStyle=`rgba(255,${Math.max(0,180-i*12)},${Math.max(0,40-i*3)},${a})`;ctx.beginPath();ctx.arc(fx,fy,Math.max(1,sz),0,Math.PI*2);ctx.fill();}
    const fg=ctx.createRadialGradient(W/2,H*0.5,0,W/2,H*0.5,W*0.3);
    fg.addColorStop(0,`rgba(255,100,20,${0.1+Math.sin(sceneTime*2)*0.03})`);fg.addColorStop(1,'rgba(255,100,20,0)');ctx.fillStyle=fg;ctx.fillRect(0,0,W,H);
  }

  function drawMountain(W,H){
    const sky=ctx.createLinearGradient(0,0,0,H);sky.addColorStop(0,'#060810');sky.addColorStop(0.5,'#0a0e18');sky.addColorStop(1,'#101520');
    ctx.fillStyle=sky;ctx.fillRect(0,0,W,H);
    ctx.fillStyle='rgba(15,15,25,0.8)';ctx.beginPath();
    ctx.moveTo(0,H);ctx.lineTo(W*0.12,H*0.38);ctx.lineTo(W*0.30,H*0.55);ctx.lineTo(W*0.48,H*0.22);ctx.lineTo(W*0.65,H*0.50);ctx.lineTo(W*0.82,H*0.30);ctx.lineTo(W,H*0.45);ctx.lineTo(W,H);ctx.closePath();ctx.fill();
    ctx.fillStyle='rgba(180,190,210,0.5)';
    [[W*0.48,H*0.22],[W*0.82,H*0.30],[W*0.12,H*0.38]].forEach(([px,py])=>{ctx.beginPath();ctx.moveTo(px,py);ctx.lineTo(px-18,py+22);ctx.lineTo(px+18,py+22);ctx.closePath();ctx.fill();});
    for(let i=0;i<60;i++){const b=Math.sin(sceneTime*1.2+i*2.7)*0.3+0.5;ctx.fillStyle=`rgba(180,170,220,${b*0.6})`;ctx.beginPath();ctx.arc((i/60)*W*1.1,Math.sin(i*4.7)*H*0.12+H*0.1,0.8,0,Math.PI*2);ctx.fill();}
  }
  function drawLake(W,H){drawMountain(W,H);ctx.fillStyle='rgba(15,25,50,0.6)';ctx.fillRect(0,H*0.65,W,H*0.35);for(let i=0;i<30;i++){const rx=(i/30)*W,ry=H*0.68+Math.sin(sceneTime+i*0.5)*3,a=Math.sin(sceneTime*0.8+i)*0.1+0.15;ctx.fillStyle=`rgba(100,140,200,${a})`;ctx.fillRect(rx,ry,15,1);}}
  function drawSanctuary(W,H){drawMountain(W,H);ctx.fillStyle='#12101a';ctx.fillRect(W*0.3,H*0.4,W*0.4,H*0.3);ctx.fillStyle='#0a0810';ctx.beginPath();ctx.arc(W*0.5,H*0.6,W*0.08,Math.PI,0);ctx.fillRect(W*0.42,H*0.6,W*0.16,H*0.1);ctx.fill();const cg=ctx.createRadialGradient(W*0.5,H*0.58,0,W*0.5,H*0.58,30);cg.addColorStop(0,`rgba(100,200,180,${0.2+Math.sin(sceneTime)*0.08})`);cg.addColorStop(1,'rgba(100,200,180,0)');ctx.fillStyle=cg;ctx.fillRect(W*0.4,H*0.5,W*0.2,H*0.2);}
  function drawRoad(W,H){drawDarkForest(W,H);ctx.fillStyle='#1a1510';ctx.beginPath();ctx.moveTo(W*0.35,H);ctx.lineTo(W*0.45,H*0.5);ctx.lineTo(W*0.48,H*0.3);ctx.lineTo(W*0.52,H*0.3);ctx.lineTo(W*0.55,H*0.5);ctx.lineTo(W*0.65,H);ctx.closePath();ctx.fill();}
  function drawCheckpoint(W,H){drawRoad(W,H);ctx.fillStyle='#1a1a1a';ctx.fillRect(W*0.35,H*0.35,W*0.3,H*0.3);const fg=ctx.createRadialGradient(W*0.5,H*0.45,0,W*0.5,H*0.45,25);fg.addColorStop(0,`rgba(200,80,20,${0.3+Math.sin(sceneTime*2)*0.1})`);fg.addColorStop(1,'rgba(200,80,20,0)');ctx.fillStyle=fg;ctx.fillRect(W*0.4,H*0.35,W*0.2,H*0.2);}
  function drawBattleVis(W,H){ctx.fillStyle='#0a0000';ctx.fillRect(0,0,W,H);const bg=ctx.createRadialGradient(W/2,H/2,0,W/2,H/2,Math.max(W,H)*0.6);bg.addColorStop(0,'#1a0505');bg.addColorStop(1,'#050000');ctx.fillStyle=bg;ctx.fillRect(0,0,W,H);for(let i=0;i<20;i++){const t=sceneTime*1.5+i*1.7,x=(Math.sin(t*0.6+i*2)*0.5+0.5)*W,y=H-(t*15+i*20)%H,a=Math.sin(t*3)*0.3+0.4;ctx.fillStyle=`rgba(255,${80+i*5},20,${a})`;ctx.beginPath();ctx.arc(x,y,1.5,0,Math.PI*2);ctx.fill();}}

  // ══════════════════════════════════════════════════════════
  // BATTLE SYSTEM
  // ══════════════════════════════════════════════════════════
  let battleState={};

  function startBattle(config) {
    const {enemy, onWin, onLose, canFlee=false} = config;
    battleState={
      enemy:{...enemy}, maxEnemyHp:enemy.hp,
      onWin, onLose, canFlee,
      defending:false, turn:0,
      selectingElement:false,
    };
    drawScene('battle');
    const ui=document.getElementById('battle-ui'); if(ui)ui.classList.add('active');
    var cc=document.getElementById('choice-container');if(cc){cc.innerHTML='';cc.style.display='none';}
    const st=(id,t)=>{const e=document.getElementById(id);if(e)e.textContent=t;};
    st('enemy-name-disp',enemy.name.toUpperCase());
    st('enemy-hp-disp',enemy.hp);
    const ehb=document.getElementById('enemy-hp-bar');if(ehb)ehb.style.width='100%';
    st('player-battle-name',state.player.name||'Outsider');
    st('player-hp-disp',state.stats.hp);
    const phb=document.getElementById('player-hp-bar');if(phb)phb.style.width=(state.stats.hp/state.stats.maxHp*100)+'%';
        const log=document.getElementById('battle-log');if(log)log.innerHTML='';
    logBattle(enemy.name + ' confronts you.', '');
    if (enemy.intro) logBattle(enemy.intro, 'log-enemy');
    showBattleActions();
    updateBattleDisplay();
  }

  function logBattle(msg,cls){
    const log=document.getElementById('battle-log');if(!log)return;
    const e=document.createElement('div');e.className='log-entry '+(cls||'');e.textContent=msg;
    log.appendChild(e);log.scrollTop=log.scrollHeight;
  }

  function setBattleButtons(disabled){
    var box = document.getElementById('battle-actions-box');
    if (box) box.querySelectorAll('.battle-btn').forEach(b => b.disabled = disabled);
  }

  function showBattleActions(){
    const box=document.getElementById('battle-actions-box');if(!box)return;
    box.innerHTML='';
    const actions=[
      {label:'Attack',action:'attack'},
      {label:'Element',action:'element_select'},
      {label:'Defend',action:'defend'},
      {label:'Item',action:'item'},
    ];
    if(battleState.canFlee)actions.push({label:'Flee',action:'flee'});
    actions.forEach(a=>{
      const btn=document.createElement('button');btn.className='battle-btn';btn.textContent=a.label;
      btn.addEventListener('click',()=>battleAction(a.action));
      box.appendChild(btn);
    });
  }

  function showElementSelect(){
    const box=document.getElementById('battle-actions-box');if(!box)return;
    box.innerHTML='';
    // Back button
    const back=document.createElement('button');back.className='battle-btn';back.textContent='← Back';
    back.addEventListener('click',()=>showBattleActions());
    box.appendChild(back);
    // Element buttons for each known element
    state.player.knownElements.forEach(el=>{
      const meta=ELEMENTS[el];if(!meta)return;
      const btn=document.createElement('button');btn.className='battle-btn';
      btn.innerHTML=`${meta.symbol} ${meta.label}`;
      btn.style.cssText=`color:${meta.glow};border-color:${meta.color};`;
      const manaCost=15;
      if(state.stats.mana<manaCost){btn.disabled=true;btn.title='Not enough mana';}
      btn.addEventListener('click',()=>battleElementAttack(el));
      box.appendChild(btn);
    });
    if(state.player.knownElements.length===0){
      const msg=document.createElement('span');msg.style.cssText='color:var(--text-faint);font-size:12px;padding:8px;';
      msg.textContent='No elements learned yet.';box.appendChild(msg);
    }
  }

  function updateBattleDisplay(){
    const e=battleState.enemy,s=state.stats;
    const st=(id,t)=>{const el=document.getElementById(id);if(el)el.textContent=t;};
    st('enemy-hp-disp',Math.max(0,e.hp));
    const ehb=document.getElementById('enemy-hp-bar');if(ehb)ehb.style.width=Math.max(0,e.hp/battleState.maxEnemyHp*100)+'%';
    st('player-hp-disp',Math.max(0,s.hp));
    const phb=document.getElementById('player-hp-bar');if(phb)phb.style.width=Math.max(0,s.hp/s.maxHp*100)+'%';
  }

  function battleAction(type){
    setBattleButtons(true);
    const e=battleState.enemy,s=state.stats;

    if(type==='element_select'){showElementSelect();setBattleButtons(false);return;}

    if(type==='attack'){
      const baseDmg=Math.floor(s.strength*0.8)+Math.floor(Math.random()*Math.ceil(s.strength*0.4));
      const dmg=Math.max(1,baseDmg-(e.defense||0));
      e.hp-=dmg; logBattle(`You strike for ${dmg} damage.`,'log-hit');
      battleState.defending=false;
    } else if(type==='defend'){
      battleState.defending=true; logBattle('You brace yourself.','');
    } else if(type==='item'){
      // Show consumable items
      const consumables = state.inventory.filter(it =>
        it.name.match(/Tincture|Potion|Crystal|Herb|Salve|Ration/i)
      );
      if(consumables.length===0){
        logBattle('No consumable items available.','log-miss');
        setBattleButtons(false);return;
      }
      // Show item selection
      const box=document.getElementById('battle-actions-box');if(!box){setBattleButtons(false);return;}
      box.innerHTML='';
      const back=document.createElement('button');back.className='battle-btn';back.textContent='← Back';
      back.addEventListener('click',()=>showBattleActions());
      box.appendChild(back);
      consumables.forEach(item=>{
        const btn=document.createElement('button');btn.className='battle-btn';
        btn.textContent=`${item.icon} ${item.name}`;
        btn.addEventListener('click',()=>{
          useConsumable(item.name);
          setBattleButtons(false);
        });
        box.appendChild(btn);
      });
      return;
    } else if(type==='flee'){
      if(!battleState.canFlee){logBattle('There is no escape.','log-miss');setBattleButtons(false);return;}
      const chance=0.35+s.agility*0.02;
      if(Math.random()<chance){logBattle('You disengage and retreat.','');setTimeout(()=>endBattle('flee'),800);return;}
      else{logBattle('You fail to break away.','log-miss');}
      battleState.defending=false;
    }
    updateBattleDisplay();
    if(e.hp<=0){e.hp=0;updateBattleDisplay();logBattle(`${e.name} falls.`,'log-crit');state.killCount++;setTimeout(()=>endBattle('win'),1000);return;}
    enemyTurn();
  }

  function battleElementAttack(elementKey){
    setBattleButtons(true);
    const e=battleState.enemy,s=state.stats;
    const meta=ELEMENTS[elementKey];
    const manaCost=15;
    s.mana-=manaCost;

    // Base damage from magic stat
    let dmg=Math.max(2,Math.floor(s.magic*1.0)+Math.floor(Math.random()*Math.ceil(s.magic*0.6)));

    // Check enemy weakness (1.5x, not 2x)
    if(e.weakTo&&e.weakTo.includes(elementKey)){dmg=Math.floor(dmg*1.5);logBattle(`${meta.symbol} ${meta.label} is super effective!`,'log-crit');}
    // Check enemy resistance
    if(e.resistsAll&&!e.weakTo?.includes(elementKey)){dmg=Math.max(1,Math.floor(dmg*0.3));logBattle(`${e.name} resists ${meta.label}...`,'log-miss');}
    if(e.resists&&e.resists.includes(elementKey)){dmg=Math.max(1,Math.floor(dmg*0.3));}

    e.hp-=dmg;
    logBattle(`${meta.symbol} You channel ${meta.label} for ${dmg} damage.`,'log-magic');
    renderStats(); updateBattleDisplay(); showBattleActions();
    battleState.defending=false;
    if(e.hp<=0){e.hp=0;updateBattleDisplay();logBattle(`${e.name} falls.`,'log-crit');state.killCount++;setTimeout(()=>endBattle('win'),1000);return;}
    enemyTurn();
  }

  function enemyTurn(){
    setTimeout(()=>{
      const e=battleState.enemy,s=state.stats;
      if(e.hp<=0)return;

      // Check if enemy misses (Hollow: 50% miss if player AGI >= 20)
      if(e.missChance){
        const missThreshold=typeof e.missChance==='function'?e.missChance(s):e.missChance;
        if(Math.random()<missThreshold){
          logBattle(`${e.name} lunges — but misses!`,'log-miss');
          setBattleButtons(false); showBattleActions(); return;
        }
      }

      let eDmg;
      if(e.ability&&Math.random()<(e.abilityChance||0.25)){
        const result=e.ability(state,battleState);
        logBattle(result.msg,'log-enemy');
        eDmg=result.damage||0;
      } else {
        eDmg=Math.max(1,e.atk+Math.floor(Math.random()*(e.atkVar||3)));
      }
      if(battleState.defending)eDmg=Math.floor(eDmg*0.4);
      s.hp-=eDmg;
      if(!e.ability||Math.random()>=(e.abilityChance||0.25)){
        logBattle(`${e.name} strikes you for ${eDmg} damage.`,'log-enemy');
      }
      renderStats();updateBattleDisplay();
      if(s.hp<=0){s.hp=0;renderStats();updateBattleDisplay();logBattle('You collapse.','log-enemy');setTimeout(()=>endBattle('lose'),1000);return;}
      setBattleButtons(false); showBattleActions();
    },700);
  }

  function endBattle(result){
    const ui = document.getElementById('battle-ui');
    if (ui) ui.classList.remove('active');
    var cc=document.getElementById('choice-container');if(cc)cc.style.display='';
    renderStats();
    if (result === 'win' && battleState.onWin) battleState.onWin();
    else if (result === 'lose' && battleState.onLose) battleState.onLose();
    else if (result === 'flee') {
      if (battleState.onWin) battleState.onWin('fled');
      else if (battleState.onLose) battleState.onLose('fled');
    }
  }

  // ── TITLE SCREEN ───────────────────────────────────────────
  function showTitleScreen(){document.getElementById('title-screen').style.display='flex';document.getElementById('game-screen').style.display='none';}
  function hideTitleScreen(){document.getElementById('title-screen').style.display='none';document.getElementById('game-screen').style.display='block';}

  const api = {
    state,ELEMENTS,CHAPTERS,
    registerChapter,
    save,load,deleteSave,hasSave,
    modStat,setFlag,getFlag,hasFlag,
    addItem,removeItem,hasItem,useConsumable,magicCheck,
    knowsElement,learnElement,getPlayerElementMeta,
    renderStats,renderInventory,renderScene,
    navigateTo,loadChapter,
    showTitleScreen,hideTitleScreen,
    showNotification,formatText,resolveDynamicText,
    applyEffects,evalCondition,
    initCanvas,drawScene,resizeCanvas,
    startBattle,endBattle,logBattle,battleAction,battleElementAttack,
  };

  return api;
})();
