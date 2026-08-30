'use strict';

const minimumLoaderTime = 1350;
const loaderStartedAt = performance.now();

window.addEventListener('load', () => {
  const elapsed = performance.now() - loaderStartedAt;
  const remaining = Math.max(0, minimumLoaderTime - elapsed);
  window.setTimeout(() => document.body.classList.remove('is-loading'), remaining);
});

const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.site-nav');

if (navToggle && nav) {
  navToggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(open));
  });

  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((el, index) => {
  el.style.transitionDelay = `${Math.min(index * 45, 180)}ms`;
  revealObserver.observe(el);
});

const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

const finePointer = window.matchMedia('(pointer: fine)');
const cursorDot = document.querySelector('.cursor-dot');
const cursorRing = document.querySelector('.cursor-ring');

if (finePointer.matches && cursorDot && cursorRing) {
  window.addEventListener('mousemove', (event) => {
    cursorDot.style.left = `${event.clientX}px`;
    cursorDot.style.top = `${event.clientY}px`;
    cursorRing.animate(
      { left: `${event.clientX}px`, top: `${event.clientY}px` },
      { duration: 180, fill: 'forwards' }
    );
  }, { passive: true });

  document.querySelectorAll('.interactive, a, button').forEach((element) => {
    element.addEventListener('mouseenter', () => document.body.classList.add('cursor-active'));
    element.addEventListener('mouseleave', () => document.body.classList.remove('cursor-active'));
  });
}

// Interacción táctil: genera una respuesta visual breve sin depender del estado hover.
document.querySelectorAll('.interactive').forEach((element) => {
  element.addEventListener('pointerdown', (event) => {
    if (event.pointerType === 'touch' || event.pointerType === 'pen') {
      element.animate(
        [{ transform: 'scale(1)' }, { transform: 'scale(.975)' }, { transform: 'scale(1)' }],
        { duration: 230, easing: 'ease-out' }
      );
    }
  });
});
