// ============================================================
// ELEMENTAL VOID — PROGRESS.JS
// Chapter map renderer — 3 arcs, 10 chapters each
// ============================================================

const PROGRESS = (() => {

  const ARC_DATA = {
    1: {
      title: 'Arc I — Blood and Awakening',
      theme: '"A broken world does not care that you are lost."',
      chapters: [
        { num: 1,  title: 'The Void Opens' },
        { num: 2,  title: 'The Whispering Woods' },
        { num: 3,  title: 'Elmridge — What Survives' },
        { num: 4,  title: 'The First Blood' },
        { num: 5,  title: 'Crimson Guard' },
        { num: 6,  title: 'The Price of Fire' },
        { num: 7,  title: 'Reflection Lake' },
        { num: 8,  title: 'The Mountain Path' },
        { num: 9,  title: 'Sanctuary' },
        { num: 10, title: 'Awakening' },
      ]
    },
    2: {
      title: 'Arc II — The Shadow Circle',
      theme: '"In the pits below Veridia, survival is the only currency."',
      chapters: [
        { num: 1,  title: 'Veridia' },
        { num: 2,  title: 'The Academy of Elements' },
        { num: 3,  title: 'Beneath the Surface' },
        { num: 4,  title: 'First Bout' },
        { num: 5,  title: 'The Void Walker\'s Name' },
        { num: 6,  title: 'Secondary Resonance' },
        { num: 7,  title: 'Blood and Gold' },
        { num: 8,  title: 'The Codex Fragment' },
        { num: 9,  title: 'Betrayal Below' },
        { num: 10, title: 'The Champion\'s Price' },
      ]
    },
    3: {
      title: 'Arc III — The Weight of Elements',
      theme: '"Power without cost is a lie. Power with cost is war."',
      chapters: [
        { num: 1,  title: 'The Aetherian Signal' },
        { num: 2,  title: 'War Drums' },
        { num: 3,  title: 'Secondary Mastery' },
        { num: 4,  title: 'Aldarion\'s Shadow' },
        { num: 5,  title: 'The Tertiary Path' },
        { num: 6,  title: 'The Hidden Kingdom' },
        { num: 7,  title: 'Aetheria' },
        { num: 8,  title: 'Queen Elysia\'s Court' },
        { num: 9,  title: 'The Convergence Warning' },
        { num: 10, title: 'The Void Between Worlds' },
      ]
    }
  };

  function render() {
    Object.entries(ARC_DATA).forEach(([arcNum, arc]) => {
      const grid = document.getElementById(`arc${arcNum}-grid`);
      if (!grid) return;
      grid.innerHTML = '';

      arc.chapters.forEach(ch => {
        const node = document.createElement('div');
        node.className = 'chapter-node';

        const isCurrentArc = parseInt(arcNum) === EV.state.currentArc;
        const isPastArc = parseInt(arcNum) < EV.state.currentArc;
        const isCurrentChapter = isCurrentArc && ch.num === EV.state.currentChapter;
        const isPastChapter = isPastArc || (isCurrentArc && ch.num < EV.state.currentChapter);
        const isLocked = parseInt(arcNum) > EV.state.currentArc ||
                         (isCurrentArc && ch.num > EV.state.currentChapter);

        if (isCurrentChapter) node.classList.add('current');
        else if (isPastChapter) node.classList.add('completed');
        else if (isLocked) node.classList.add('locked');

        // Check if chapter data exists
        const chKey = `${arcNum}-${ch.num}`;
        const hasData = !!EV.CHAPTERS[chKey];

        node.innerHTML = `
          <span class="chapter-num">Ch. ${arcNum}.${ch.num}</span>
          ${ch.title}
          ${!hasData && isLocked ? '<span class="chapter-stub">—</span>' : ''}
        `;
        grid.appendChild(node);
      });
    });
  }

  return { render, ARC_DATA };
})();
