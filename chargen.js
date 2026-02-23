// ============================================================
// ELEMENTAL VOID — CHARGEN.JS v2
// 13 psychological questions. Weighted scoring.
// Element NOT revealed during chargen. Serpent reveals it.
// ============================================================

const CHARGEN = (() => {
  let currentStep = 1;
  const answers = {};

  // ── ELEMENT SCORING ──────────────────────────────────────
  const scores = { fire:0, water:0, earth:0, wind:0, light:0, shadow:0 };

  // Q1: Origin (stats only, no element scoring)
  const ORIGIN_STATS = {
    soldier:  { strength:8, agility:4, resolve:3, magic:2, defense:6, corruption:5 },
    scholar:  { strength:2, agility:2, resolve:6, magic:8, defense:2, corruption:0 },
    criminal: { strength:4, agility:8, resolve:2, magic:3, defense:3, corruption:8 },
    survivor: { strength:3, agility:6, resolve:6, magic:4, defense:4, corruption:3 },
  };

  // ── QUESTION SCORING MAPS ──────────────────────────────
  const Q_SCORES = {
    // Q2: Crisis response
    crisis: {
      rush_in:     { fire:3 },
      find_way:    { earth:2, water:1 },
      coordinate:  { wind:2, light:1 },
      wait_moment: { shadow:2, earth:1 },
    },
    // Q3: Moral dilemma
    moral: {
      promise:     { light:3 },
      negotiate:   { water:3 },
      end_it:      { fire:2, shadow:1 },
      pressure:    { shadow:2, fire:1 },
    },
    // Q4: Combat instinct
    combat: {
      aggressive:  { fire:2, wind:1 },
      defensive:   { earth:3 },
      tactical:    { wind:2, earth:1 },
      adaptive:    { water:2, shadow:1 },
    },
    // Q5: Core value
    protect: {
      people:      { light:2, water:1 },
      truth:       { wind:2, light:1 },
      yourself:    { shadow:2, fire:1 },
      idea:        { earth:2, fire:1 },
    },
    // Q6: Childhood memory
    memory: {
      warmth:      { fire:2, light:1 },
      quiet:       { water:3 },
      movement:    { wind:3 },
      watching:    { shadow:2, wind:1 },
    },
    // Q7: Betrayal response
    betrayal: {
      confront:    { fire:2, light:1 },
      understand:  { light:2, water:1 },
      plan:        { shadow:2, earth:1 },
      leave:       { wind:2, water:1 },
    },
    // Q8: Locked door
    door: {
      break:       { fire:2, earth:1 },
      pick:        { shadow:2, wind:1 },
      find_key:    { earth:2, light:1 },
      go_around:   { water:2, wind:1 },
    },
    // Q9: What haunts you
    fear: {
      failure:     { fire:2, earth:1 },
      alone:       { light:2, water:1 },
      unseen:      { shadow:3 },
      trapped:     { wind:2, fire:1 },
    },
    // Q10: Leadership
    leader: {
      front:       { fire:2, light:1 },
      listen:      { water:2, earth:1 },
      delegate:    { wind:2, shadow:1 },
      solo:        { earth:2, shadow:1 },
    },
    // Q11: Journey vs destination
    philosophy: {
      destination: { earth:2, fire:1 },
      journey:     { wind:2, water:1 },
      people_met:  { light:2, water:1 },
      lessons:     { shadow:2, wind:1 },
    },
    // Q12: Witnessing injustice
    justice: {
      intervene:   { light:2, fire:1 },
      document:    { wind:2, shadow:1 },
      systemic:    { water:2, earth:1 },
      survive:     { shadow:2, fire:1 },
    },
    // Q13: Relationship with power
    power: {
      tool:        { earth:2, wind:1 },
      burden:      { light:2, water:1 },
      freedom:     { fire:2, wind:1 },
      mirror:      { shadow:2, light:1 },
    },
  };

  const INSTINCT_MAP = { aggressive:'aggressive', defensive:'defensive', tactical:'tactical', adaptive:'adaptive' };

  function goToStep(n) {
    document.querySelectorAll('.chargen-step').forEach(el => el.classList.remove('active'));
    const step = document.getElementById(`step-${n}`);
    if (step) step.classList.add('active');
    document.querySelectorAll('.chargen-dot').forEach((dot, i) => {
      dot.classList.remove('active', 'done');
      if (i + 1 === n) dot.classList.add('active');
      else if (i + 1 < n) dot.classList.add('done');
    });
    currentStep = n;
  }

  function addScores(questionKey, answerValue) {
    const map = Q_SCORES[questionKey];
    if (!map || !map[answerValue]) return;
    Object.entries(map[answerValue]).forEach(([el, val]) => { scores[el] += val; });
  }

  function resolveElement() {
    let best = null;
    let bestScore = -1;
    const priority = ['fire','water','earth','wind','light','shadow'];
    priority.forEach(el => {
      if (scores[el] > bestScore) { bestScore = scores[el]; best = el; }
    });
    return best || 'fire';
  }

  function resolveMoralNature() {
    const dark = ['pressure','end_it','survive','mirror'].filter(v =>
      answers.moral === v || answers.justice === v || answers.power === v
    ).length;
    if (dark >= 2) return 'ruthless';
    if (answers.moral === 'promise' || answers.justice === 'intervene') return 'honorable';
    return 'pragmatic';
  }

  function applyBuild() {
    const s = ORIGIN_STATS[answers.origin] || {};
    Object.entries(s).forEach(([stat, val]) => {
      EV.state.stats[stat] = (EV.state.stats[stat] || 10) + val;
    });
    EV.state.stats.corruption = Math.min(100, EV.state.stats.corruption);

    const keys = ['crisis','moral','combat','protect','memory','betrayal','door','fear','leader','philosophy','justice','power'];
    keys.forEach(k => addScores(k, answers[k]));

    EV.state.player._pendingElement = resolveElement();
    EV.state.player._elementScores = { ...scores };

    // Find 2nd highest element for Brennan to teach
    const sorted = Object.entries(scores).sort((a,b) => b[1] - a[1]);
    const firstEl = sorted[0][0];
    const secondEl = sorted[1] ? sorted[1][0] : null;
    EV.state.player._pendingSecondElement = secondEl;

    // Set initial proficiency based on chargen scores
    Object.entries(scores).forEach(([el, sc]) => {
      if(sc > 0) EV.state.player.elementProficiency[el] = Math.min(5, Math.floor(sc / 3));
    });

    EV.state.player.primaryElement = null;
    EV.state.player.origin = answers.origin;
    EV.state.player.instinct = INSTINCT_MAP[answers.combat] || 'adaptive';
    EV.state.player.nature = resolveMoralNature();
  }

  function buildSummary() {
    const tempScores = { fire:0, water:0, earth:0, wind:0, light:0, shadow:0 };
    const keys = ['crisis','moral','combat','protect','memory','betrayal','door','fear','leader','philosophy','justice','power'];
    keys.forEach(k => {
      const map = Q_SCORES[k];
      if (map && map[answers[k]]) {
        Object.entries(map[answers[k]]).forEach(([el,v]) => { tempScores[el] += v; });
      }
    });

    const nature = resolveMoralNature();
    const oL = { soldier:'Soldier', scholar:'Scholar', criminal:'Outlaw', survivor:'Survivor' };
    const nL = {
      ruthless:"Ruthless — you will do what others won't",
      honorable:"Honorable — but honor has a price in Eldara",
      pragmatic:"Pragmatic — survival over sentiment"
    };

    const maxScore = Math.max(...Object.values(tempScores), 1);
    const elColors = { fire:'#c94a2a', water:'#2a7ac9', earth:'#8a7a3a', wind:'#5a9a5a', light:'#c9b84a', shadow:'#7a4a9a' };
    let affinityHtml = '<div style="margin-top:14px;font-size:12px;color:var(--text-faint);margin-bottom:8px;">Elemental resonance detected:</div>';
    Object.entries(tempScores).forEach(([el, sc]) => {
      const pct = Math.round((sc / maxScore) * 100);
      if (pct > 0) {
        affinityHtml += `<div style="display:flex;align-items:center;gap:8px;margin-bottom:3px;">
          <span style="width:50px;font-size:11px;color:${elColors[el]};text-transform:capitalize;">${el}</span>
          <div style="flex:1;height:4px;background:var(--void);border-radius:2px;overflow:hidden;">
            <div style="width:${pct}%;height:100%;background:${elColors[el]};border-radius:2px;"></div>
          </div>
        </div>`;
      }
    });

    document.getElementById('chargen-summary').innerHTML = `
      <div style="margin-bottom:12px;color:var(--gold);font-family:'Cinzel Decorative',serif;font-size:13px;letter-spacing:2px;">${EV.state.player.name}</div>
      <div style="margin-bottom:6px;"><strong style="color:var(--text)">Background:</strong> ${oL[answers.origin]||'—'}</div>
      <div style="margin-bottom:6px;"><strong style="color:var(--text)">Nature:</strong> ${nL[nature]}</div>
      ${affinityHtml}
      <div style="margin-top:14px;font-size:12px;color:var(--text-faint);font-style:italic;line-height:1.6;">
        Something waits for you on the other side. It already knows what you are. You don't. Not yet.
      </div>`;
  }

  function wireOptions(cid, key, next) {
    const c = document.getElementById(cid); if (!c) return;
    c.querySelectorAll('.chargen-option').forEach(btn => {
      btn.addEventListener('click', () => {
        c.querySelectorAll('.chargen-option').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        answers[key] = btn.dataset.value;
        setTimeout(() => { if (next === 15) buildSummary(); goToStep(next); }, 250);
      });
    });
  }

  function init() {
    document.getElementById('name-next').addEventListener('click', () => {
      const name = document.getElementById('name-input').value.trim();
      if (!name) { EV.showNotification('Enter a name.', 'warning'); return; }
      EV.state.player.name = name; goToStep(2);
    });
    document.getElementById('name-input').addEventListener('keydown', e => {
      if (e.key === 'Enter') document.getElementById('name-next').click();
    });

    wireOptions('origin-options', 'origin', 3);
    wireOptions('crisis-options', 'crisis', 4);
    wireOptions('moral-options', 'moral', 5);
    wireOptions('combat-options', 'combat', 6);
    wireOptions('protect-options', 'protect', 7);
    wireOptions('memory-options', 'memory', 8);
    wireOptions('betrayal-options', 'betrayal', 9);
    wireOptions('door-options', 'door', 10);
    wireOptions('fear-options', 'fear', 11);
    wireOptions('leader-options', 'leader', 12);
    wireOptions('philosophy-options', 'philosophy', 13);
    wireOptions('justice-options', 'justice', 14);
    wireOptions('power-options', 'power', 15);

    document.getElementById('begin-btn').addEventListener('click', () => {
      applyBuild();
      document.getElementById('chargen-overlay').classList.remove('active');
      EV.hideTitleScreen(); EV.renderStats(); EV.renderInventory(); EV.initCanvas();
      EV.loadChapter(1, 1, 'arrival');
    });
  }

  return { init, resolveElement };
})();
document.addEventListener('DOMContentLoaded', () => CHARGEN.init());
