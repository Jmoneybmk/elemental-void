// ============================================================
// ELEMENTAL VOID — PROGRESS.JS
// Chapter map renderer — Arc I active, Arc II coming soon
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
      comingSoon: true,
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
  };

  function render() {
    Object.entries(ARC_DATA).forEach(([arcNum, arc]) => {
      const grid = document.getElementById(`arc${arcNum}-grid`);
      if (!grid) return;
      grid.innerHTML = '';

      // Coming soon arc — show banner instead of chapter nodes
      if (arc.comingSoon) {
        const banner = document.createElement('div');
        banner.className = 'arc-coming-soon';
        banner.innerHTML = `
          <span class="coming-soon-icon">◈</span>
          <span class="coming-soon-text">Coming Soon</span>
          <span class="coming-soon-sub">${arc.chapters.length} chapters planned</span>
        `;
        grid.appendChild(banner);
        return;
      }

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
