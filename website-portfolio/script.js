/* ── Navbar shadow on scroll ── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
});

/* ── Reveal on scroll ── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ── Project Slider (симметричный выход крайних карточек) ── */
const track = document.getElementById('sliderTrack');
const cards = Array.from(track.querySelectorAll('.project-card'));
const GAP = 20;
let idx = 0;                       // текущее смещение (может быть отрицательным)
let baseX = 0;
const VISIBLE = 3;                 // количество видимых карточек
const maxIdx = cards.length - VISIBLE; // максимальное смещение влево (положительное)
const minIdx = -maxIdx;                 // максимальное смещение вправо (отрицательное)

function initSlider() {
  requestAnimationFrame(() => {
    const viewport = document.querySelector('.slider-viewport');
    const vw = viewport.getBoundingClientRect().width;
    const cw = cards[0]?.getBoundingClientRect().width;
    if (!cw) return;

    const trackWidth = cards.length * (cw + GAP) - GAP;

    // Центрируем трек относительно вьюпорта слайдера
    baseX = (vw - trackWidth) / 2;

    track.style.transition = 'none';
    applySlide(false);
  });
}

function applySlide(animate) {
  const cw = cards[0].getBoundingClientRect().width;
  track.style.transition = animate ? 'transform .5s cubic-bezier(.4,0,.2,1)' : 'none';
  // Смещение = базовое - сдвиг на idx карточек
  track.style.transform = `translateX(${baseX - idx * (cw + GAP)}px)`;
}

// Обработчики кнопок
document.getElementById('prevBtn').addEventListener('click', () => {
  if (idx > minIdx) {   // можно двигаться вправо (idx уменьшается)
    idx--;
    applySlide(true);
  }
});
document.getElementById('nextBtn').addEventListener('click', () => {
  if (idx < maxIdx) {   // можно двигаться влево (idx увеличивается)
    idx++;
    applySlide(true);
  }
});

// Пересчёт при изменении размера окна
window.addEventListener('load', initSlider);
window.addEventListener('resize', initSlider);

/* ── Contact form ── */
document.getElementById('contactForm').addEventListener('submit', e => {
  e.preventDefault();
  const toast = document.getElementById('toast');
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
  e.target.reset();
});