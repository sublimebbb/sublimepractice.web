const popups = {
  boundary: {
    title: "build journal: boundary",
    html: `
      <div class="popup-links">
        <a href="https://boundary.substack.com/" target="_blank" rel="noopener">substack &rarr;</a>
        <a href="https://www.are.na/sublime-bbb/building-boundary-app" target="_blank" rel="noopener">are.na visual journal &rarr;</a>
      </div>
    `
  },
  filmography: {
    title: "filmography",
    html: `<p>coming soon.</p>`
  }
};

const overlay = document.getElementById('popup-overlay');
const content = document.getElementById('popup-content');
const closeBtn = document.getElementById('popup-close');

function openPopup(key) {
  const data = popups[key];
  if (!data) return;
  content.innerHTML = `<h2>${data.title}</h2>${data.html}`;
  overlay.classList.add('open');
}

function closePopup() {
  overlay.classList.remove('open');
  content.innerHTML = '';
}

document.querySelectorAll('.folder').forEach((folder) => {
  folder.addEventListener('click', () => {
    const action = folder.dataset.action;
    if (action === 'popup') {
      openPopup(folder.dataset.popup);
    } else if (action === 'link') {
      const href = folder.dataset.href;
      if (folder.dataset.newtab === 'true') {
        window.open(href, '_blank', 'noopener');
      } else {
        window.location.href = href;
      }
    }
  });
});

closeBtn.addEventListener('click', closePopup);
overlay.addEventListener('click', (e) => {
  if (e.target === overlay) closePopup();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closePopup();
});

// ascii garden: shapeshifting rows of trees
const TREES = {
  cap: [
    '   _   ',
    ' _(_)_ ',
    '(_)@(_)',
    ' (___) ',
    '   Y   ',
    '  \\|/  '
  ],
  bubble: [
    '       ',
    ' @@@@  ',
    '@@()@@ ',
    ' @@@@  ',
    '   |   ',
    '  \\|/  '
  ],
  wtree: [
    '       ',
    ' wWWWw ',
    '(_____)',
    '       ',
    '   Y   ',
    '  /|\\  '
  ],
  vtree: [
    '       ',
    ' vVVVv ',
    '(_____)',
    '       ',
    '   |   ',
    '  \\|/  '
  ],
  lean: [
    '  _    ',
    '_(_)_  ',
    '(_)@(_)',
    ' (_)\\  ',
    '  `|/  ',
    '   |   '
  ]
};

function buildGarden(keys) {
  const gap = '  ';
  const rows = [];
  for (let r = 0; r < 6; r++) {
    rows.push(keys.map((k) => TREES[k][r]).join(gap));
  }
  rows.push('^'.repeat(rows[0].length));
  return rows.join('\n');
}

const gardenFrames = [
  buildGarden(['cap', 'bubble', 'wtree', 'vtree', 'bubble', 'cap']),
  buildGarden(['wtree', 'cap', 'lean', 'bubble', 'vtree']),
  buildGarden(['bubble', 'vtree', 'cap', 'wtree', 'lean', 'vtree'])
];

const asciiEl = document.getElementById('ascii-frame');
let gardenIndex = 0;

function showGardenFrame() {
  if (!asciiEl) return;
  asciiEl.classList.add('is-fading');
  setTimeout(() => {
    gardenIndex = (gardenIndex + 1) % gardenFrames.length;
    asciiEl.textContent = gardenFrames[gardenIndex];
    asciiEl.classList.remove('is-fading');
  }, 600);
}

if (asciiEl) {
  asciiEl.textContent = gardenFrames[0];
  setInterval(showGardenFrame, 3400);
}

// sparkle cursor trail
let lastSparkle = 0;
document.addEventListener('mousemove', (e) => {
  const now = performance.now();
  if (now - lastSparkle < 45) return;
  lastSparkle = now;

  const sparkle = document.createElement('span');
  sparkle.className = 'sparkle';
  const offsetX = (Math.random() - 0.5) * 14;
  const offsetY = (Math.random() - 0.5) * 14;
  sparkle.style.left = `${e.clientX + offsetX}px`;
  sparkle.style.top = `${e.clientY + offsetY}px`;
  const scale = 0.6 + Math.random() * 0.8;
  sparkle.style.transform = `translate(-50%, -50%) scale(${scale})`;
  document.body.appendChild(sparkle);
  sparkle.addEventListener('animationend', () => sparkle.remove());
});
