const header = document.getElementById('header');
const menuToggle = document.getElementById('menuToggle');
const menuMobile = document.getElementById('menuMobile');
const backToTop = document.getElementById('backToTop');
const cursorGlow = document.getElementById('cursorGlow');
const year = document.getElementById('year');
const revealElements = document.querySelectorAll('.reveal');
const counters = document.querySelectorAll('[data-counter]');
let countersStarted = false;

year.textContent = new Date().getFullYear();

function toggleMenu() {
  const isOpen = menuMobile.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', isOpen);
  menuToggle.innerHTML = isOpen ? '<i class="bi bi-x-lg"></i>' : '<i class="bi bi-list"></i>';
}

menuToggle.addEventListener('click', toggleMenu);

menuMobile.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    menuMobile.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.innerHTML = '<i class="bi bi-list"></i>';
  });
});

function handleScroll() {
  header.classList.toggle('scrolled', window.scrollY > 40);
  backToTop.classList.toggle('show', window.scrollY > 500);

  revealElements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;
    if (elementTop < window.innerHeight - 90) {
      element.classList.add('active');
    }
  });

  const numbersSection = document.querySelector('.numbers');
  if (numbersSection && !countersStarted && numbersSection.getBoundingClientRect().top < window.innerHeight - 80) {
    startCounters();
    countersStarted = true;
  }
}

function startCounters() {
  counters.forEach((counter) => {
    const target = Number(counter.dataset.counter);
    let current = 0;
    const increment = Math.max(1, Math.ceil(target / 60));

    const updateCounter = () => {
      current += increment;
      if (current >= target) {
        counter.textContent = target;
        return;
      }
      counter.textContent = current;
      requestAnimationFrame(updateCounter);
    };

    updateCounter();
  });
}

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

window.addEventListener('scroll', handleScroll);
window.addEventListener('load', handleScroll);

document.addEventListener('mousemove', (event) => {
  if (!cursorGlow) return;
  cursorGlow.style.left = `${event.clientX}px`;
  cursorGlow.style.top = `${event.clientY}px`;
});
