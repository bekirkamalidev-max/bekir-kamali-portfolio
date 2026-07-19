const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('.nav');

document.body.classList.add('loading');

window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('pageLoader').classList.add('hide');
    document.body.classList.remove('loading');
  }, 650);
});

menuButton.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
});

document.querySelectorAll('.nav a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const glow = document.querySelector('.cursor-glow');
window.addEventListener('pointermove', (event) => {
  glow.style.left = `${event.clientX}px`;
  glow.style.top = `${event.clientY}px`;
});

const projects = [
  {
    name: 'Wink AI',
    category: 'Mobil Uygulama',
    image: 'assets/references/wink-ai.jpeg',
    link: 'https://winkaiapp.com/',
    alt: 'Wink AI referans projesi'
  },
  {
    name: 'UBEON Logistics',
    category: 'Mobil & Web',
    image: 'assets/references/ubeon.jpeg',
    link: 'https://ubeonlogistics.com/',
    alt: 'UBEON Logistics referans projesi'
  },
  {
    name: 'Anlaşmalı Evlilik',
    category: 'Web Platformu',
    image: 'assets/references/anlasmali-evlilik.jpeg',
    link: 'https://anlasmalievlilik.net',
    alt: 'Anlaşmalı Evlilik referans projesi'
  },
  {
    name: 'Ev Arkadaşı',
    category: 'Web Platformu',
    image: 'assets/references/evecikiyorum.jpeg',
    link: 'https://evecikiyorum.com',
    alt: 'Ev Arkadaşı referans projesi'
  }
];

const image = document.getElementById('showcaseImage');
const nameEl = document.getElementById('showcaseName');
const categoryEl = document.getElementById('showcaseCategory');
const linkEl = document.getElementById('showcaseLink');
const dots = [...document.querySelectorAll('.showcase-dot')];
let currentIndex = 0;
let sliderTimer;

function setProject(index) {
  const project = projects[index];
  image.style.opacity = '0';
  image.style.transform = 'scale(1.025)';

  setTimeout(() => {
    image.src = project.image;
    image.alt = project.alt;
    nameEl.textContent = project.name;
    categoryEl.textContent = project.category;
    linkEl.href = project.link;

    image.onload = () => {
      image.style.opacity = '1';
      image.style.transform = '';
    };
  }, 220);

  dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
  currentIndex = index;
}

function startSlider() {
  clearInterval(sliderTimer);
  sliderTimer = setInterval(() => {
    setProject((currentIndex + 1) % projects.length);
  }, 4300);
}

dots.forEach(dot => {
  dot.addEventListener('click', () => {
    setProject(Number(dot.dataset.index));
    startSlider();
  });
});

startSlider();

const counters = document.querySelectorAll('[data-counter]');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    const target = Number(entry.target.dataset.counter);
    let current = 0;
    const step = Math.max(1, Math.ceil(target / 24));

    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      entry.target.textContent = current;
    }, 55);

    counterObserver.unobserve(entry.target);
  });
}, { threshold: 0.7 });

counters.forEach(counter => counterObserver.observe(counter));

document.getElementById('year').textContent = new Date().getFullYear();
