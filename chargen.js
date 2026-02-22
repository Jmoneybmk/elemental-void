// ============================================================
// ELEMENTAL VOID — CHARGEN.JS
// Element NOT revealed during chargen. Serpent reveals it.
// ============================================================

const CHARGEN = (() => {
  let currentStep = 1;
  const answers = {};

  const SOUL1_MAP = { charge:'fire', calculate:'earth', organize:'wind', observe:'shadow' };
  const SOUL2_MAP = { mercy:'light', bargain:'water', execute:'fire', torture:'shadow' };
  const ORIGIN_STATS = {
    soldier:  { strength:8, agility:4, resolve:3, magic:2, corruption:5 },
    scholar:  { strength:2, agility:2, resolve:6, magic:8, corruption:0 },
    criminal: { strength:4, agility:8, resolve:2, magic:3, corruption:8 },
    survivor: { strength:3, agility:6, resolve:6, magic:4, corruption:3 },
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

  function resolveElement() {
    const e1 = SOUL1_MAP[answers.soul1] || 'fire';
    const e2 = SOUL2_MAP[answers.soul2] || 'shadow';
    // Same element from both soul questions = guaranteed
    if (e1 === e2) return e1;
    // Instinct breaks the tie
    const biasMap = { aggressive:'fire', defensive:'earth', tactical:'wind', adaptive:'water' };
    const bias = biasMap[answers.instinct] || null;
    if (bias && (e1 === bias || e2 === bias)) return bias;
    // No instinct match: soul2 (the moral choice) decides
    // This makes light reachable via mercy + non-matching instinct
    return e2;
  }

  function resolveMoralNature() {
    const dark = ['observe','execute','torture'].filter(v => answers.soul1 === v || answers.soul2 === v).length;
    if (dark >= 2) return 'ruthless';
    if (answers.soul2 === 'mercy') return 'honorable';
    return 'pragmatic';
  }

  function applyBuild() {
    const s = ORIGIN_STATS[answers.origin] || {};
    Object.entries(s).forEach(([stat, val]) => {
      EV.state.stats[stat] = (EV.state.stats[stat] || 10) + val;
    });
    EV.state.stats.corruption = Math.min(100, EV.state.stats.corruption);
    // Element resolved but NOT assigned — serpent reveals it via learnElement()
    EV.state.player._pendingElement = resolveElement();
    EV.state.player.primaryElement = null;
    EV.state.player.origin = answers.origin;
    EV.state.player.soul = `${answers.soul1}/${answers.soul2}`;
    EV.state.player.instinct = INSTINCT_MAP[answers.instinct];
    EV.state.player.nature = resolveMoralNature();
  }

  function buildSummary() {
    const nature = resolveMoralNature();
    const oL = { soldier:'Soldier', scholar:'Scholar', criminal:'Outlaw', survivor:'Survivor' };
    const nL = { ruthless:'Ruthless — you will do what others won\'t', honorable:'Honorable — but honor has a price in Eldara', pragmatic:'Pragmatic — survival over sentiment' };
    const iL = { aggressive:'Aggressive — strike first, question later', defensive:'Defensive — patience is a weapon', tactical:'Tactical — terrain wins fights, not muscle', adaptive:'Adaptive — read, react, survive' };
    document.getElementById('chargen-summary').innerHTML = `
      <div style="margin-bottom:12px;color:var(--gold);font-family:'Cinzel Decorative',serif;font-size:13px;letter-spacing:2px;">${EV.state.player.name}</div>
      <div style="margin-bottom:6px;"><strong style="color:var(--text)">Background:</strong> ${oL[answers.origin]||'—'}</div>
      <div style="margin-bottom:6px;"><strong style="color:var(--text)">Nature:</strong> ${nL[nature]}</div>
      <div style="margin-bottom:6px;"><strong style="color:var(--text)">Instinct:</strong> ${iL[answers.instinct]||'—'}</div>
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
        setTimeout(() => { if (next === 6) buildSummary(); goToStep(next); }, 250);
      });
    });
  }

  function init() {
    document.getElementById('name-next').addEventListener('click', () => {
      const name = document.getElementById('name-input').value.trim();
      if (!name) { EV.showNotification('Enter a name.', 'warning'); return; }
      EV.state.player.name = name; goToStep(2);
    });
    document.getElementById('name-input').addEventListener('keydown', e => { if (e.key === 'Enter') document.getElementById('name-next').click(); });
    wireOptions('origin-options', 'origin', 3);
    wireOptions('soul1-options', 'soul1', 4);
    wireOptions('soul2-options', 'soul2', 5);
    wireOptions('instinct-options', 'instinct', 6);
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
