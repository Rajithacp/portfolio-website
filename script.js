const body = document.body;
const themeToggle = document.getElementById('themeToggle');
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
const yearEl = document.getElementById('year');
const sections = document.querySelectorAll('section');
const navAnchors = document.querySelectorAll('.nav-links a');

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
  body.classList.add('dark');
  themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
}

themeToggle.addEventListener('click', () => {
  body.classList.toggle('dark');
  const darkMode = body.classList.contains('dark');
  themeToggle.innerHTML = darkMode
    ? '<i class="fa-solid fa-sun"></i>'
    : '<i class="fa-solid fa-moon"></i>';
  localStorage.setItem('theme', darkMode ? 'dark' : 'light');
});

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

navAnchors.forEach((anchor) => {
  anchor.addEventListener('click', () => navLinks.classList.remove('open'));
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.14 }
);

document.querySelectorAll('.reveal').forEach((item) => observer.observe(item));

window.addEventListener('scroll', () => {
  let current = '';

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 120;
    if (window.scrollY >= sectionTop) current = section.getAttribute('id');
  });

  navAnchors.forEach((link) => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
});

document.querySelector('.contact-form').addEventListener('submit', (e) => {
  e.preventDefault();
  alert('Thanks for reaching out! Replace this alert with backend integration.');
  e.target.reset();
});

yearEl.textContent = new Date().getFullYear();
