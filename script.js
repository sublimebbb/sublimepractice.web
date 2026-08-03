const popups = {
  writings: {
    title: "writings on philosophy & building",
    html: `
      <div class="film-list">
        <div class="list-heading">start here</div>
        <div class="film-item"><a href="https://boundary.substack.com/p/prayer-as-ancient-technology?r=2tavrw" target="_blank" rel="noopener">prayer as ancient technology</a></div>
        <div class="film-item"><a href="https://boundary.substack.com/p/how-language-shapes-how-we-love?r=2tavrw" target="_blank" rel="noopener">can you love me in my mother tongue?</a></div>
        <div class="film-item"><a href="https://boundary.substack.com/p/do-you-leave-people-lonelier-than?r=2tavrw" target="_blank" rel="noopener">do you leave people lonelier than you met them?</a></div>
      </div>
    `
  },
  boundary: {
    title: "build journal: boundary",
    html: `
      <div class="popup-links">
        <a href="https://boundary.substack.com/" target="_blank" rel="noopener">can we engineer tools for understanding</a>
        <a href="https://boundaryai.app" target="_blank" rel="noopener">yes we can</a>
      </div>
    `
  },
  filmography: {
    title: "filmography",
    html: `
      <div class="film-list">
        <div class="film-item"><a href="https://vimeo.com/manage/762864228/general" target="_blank" rel="noopener">Honeymoon Phase</a> <span class="film-year">(2021)</span></div>
        <div class="film-item"><a href="https://www.nowness.asia/story/woman" target="_blank" rel="noopener">wOman</a> <span class="film-year">(2022)</span> &mdash; <a href="https://vimeo.com/sublimebbaby/womantrailer?fl=ip&fe=ec" target="_blank" rel="noopener">trailer</a></div>
        <div class="film-item">Liminal <span class="film-year">(unreleased)</span></div>
        <div class="film-item">Little Gaza <span class="film-year">(unreleased)</span></div>
        <div class="film-item film-cta"><a href="https://thesublimepractice.substack.com/subscribe" target="_blank" rel="noopener">want access?</a></div>
      </div>
    `
  },
  chat: {
    title: "ask",
    html: `<p>send me a note at <a href="mailto:workwithsublime@gmail.com">workwithsublime@gmail.com</a></p>`
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

// tap-to-toggle photo preview on "sublime" (for touch devices, alongside hover)
document.querySelectorAll('.intro-name').forEach((name) => {
  name.addEventListener('click', (e) => {
    e.stopPropagation();
    const wasActive = name.classList.contains('is-active');
    document.querySelectorAll('.intro-name.is-active').forEach((el) => el.classList.remove('is-active'));
    if (!wasActive) name.classList.add('is-active');
  });
});
document.addEventListener('click', () => {
  document.querySelectorAll('.intro-name.is-active').forEach((el) => el.classList.remove('is-active'));
});

// ascii garden: a still row of trees, with a few gently bouncing
const TREES = {
  cap: [
    '   _   ',
    ' _(_)_ ',
    '(_)@(_)',
    ' (___) ',
    '   Y   ',
    '  \\|/  ',
    '^^^^^^^'
  ],
  bubble: [
    '       ',
    ' @@@@  ',
    '@@()@@ ',
    ' @@@@  ',
    '   |   ',
    '  \\|/  ',
    '^^^^^^^'
  ],
  wtree: [
    '       ',
    ' wWWWw ',
    '(_____)',
    '       ',
    '   Y   ',
    '  /|\\  ',
    '^^^^^^^'
  ],
  vtree: [
    '       ',
    ' vVVVv ',
    '(_____)',
    '       ',
    '   |   ',
    '  \\|/  ',
    '^^^^^^^'
  ],
  lean: [
    '  _    ',
    '_(_)_  ',
    '(_)@(_)',
    ' (_)\\  ',
    '  `|/  ',
    '   |   ',
    '^^^^^^^'
  ]
};

// index -> tree key for the still garden row
const gardenRow = ['cap', 'bubble', 'wtree', 'vtree', 'bubble', 'cap'];
// which of those trees sway, and their phase offset (seconds)
const bounceMap = { 1: 0, 3: -0.9, 4: -1.6 };

const gardenEl = document.getElementById('ascii-garden');

if (gardenEl) {
  gardenRow.forEach((key, i) => {
    const el = document.createElement('pre');
    el.className = 'ascii-tree';
    el.textContent = TREES[key].join('\n');
    if (i in bounceMap) {
      el.classList.add('ascii-tree--bounce');
      el.style.animationDelay = `${bounceMap[i]}s`;
    }
    gardenEl.appendChild(el);
  });
}

// visitor count
(async () => {
  const el = document.getElementById('visitor-count');
  if (!el) return;
  try {
    const res = await fetch('https://abacus.jasoncameron.dev/hit/sublimepractice-web/landing');
    const data = await res.json();
    el.textContent = `visitor #${data.value}`;
  } catch (err) {
    el.remove();
  }
})();

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
