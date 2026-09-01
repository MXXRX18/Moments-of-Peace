'use strict';

class SpaCarousel {
  constructor(root) {
    this.root = root;
    this.track = root.querySelector('[data-carousel-track]');
    this.slides = [...root.querySelectorAll('[data-carousel-slide]')];
    this.prevButton = root.querySelector('[data-carousel-prev]');
    this.nextButton = root.querySelector('[data-carousel-next]');
    this.dotsWrap = root.querySelector('[data-carousel-dots]');
    this.thumbs = [...root.querySelectorAll('[data-carousel-thumb]')];
    this.status = root.querySelector('[data-carousel-status]');
    this.index = 0;
    this.timer = null;
    this.delay = Number(root.dataset.autoplay || 5500);
    this.pointerStartX = null;
    this.pointerDeltaX = 0;
    this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!this.track || this.slides.length < 2) return;

    this.createDots();
    this.bindEvents();
    this.goTo(0, false);
    this.startAutoplay();
  }

  createDots() {
    if (!this.dotsWrap) return;
    this.dotsWrap.innerHTML = '';
    this.dots = this.slides.map((_, index) => {
      const dot = document.createElement('button');
      dot.className = 'carousel-dot';
      dot.type = 'button';
      dot.setAttribute('aria-label', `Ir a la imagen ${index + 1}`);
      dot.addEventListener('click', () => {
        this.goTo(index);
        this.restartAutoplay();
      });
      this.dotsWrap.append(dot);
      return dot;
    });
  }

  bindEvents() {
    this.prevButton?.addEventListener('click', () => {
      this.prev();
      this.restartAutoplay();
    });

    this.nextButton?.addEventListener('click', () => {
      this.next();
      this.restartAutoplay();
    });

    this.thumbs.forEach((thumb, index) => {
      thumb.addEventListener('click', () => {
        this.goTo(index);
        this.restartAutoplay();
      });
    });

    this.root.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        this.prev();
        this.restartAutoplay();
      }
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        this.next();
        this.restartAutoplay();
      }
    });

    this.root.addEventListener('mouseenter', () => this.stopAutoplay());
    this.root.addEventListener('mouseleave', () => this.startAutoplay());
    this.root.addEventListener('focusin', () => this.stopAutoplay());
    this.root.addEventListener('focusout', (event) => {
      if (!this.root.contains(event.relatedTarget)) this.startAutoplay();
    });

    this.track.addEventListener('pointerdown', (event) => {
      if (event.pointerType === 'mouse' && event.button !== 0) return;
      this.pointerStartX = event.clientX;
      this.pointerDeltaX = 0;
      this.stopAutoplay();
      try { this.track.setPointerCapture(event.pointerId); } catch (_) {}
    });

    this.track.addEventListener('pointermove', (event) => {
      if (this.pointerStartX === null) return;
      this.pointerDeltaX = event.clientX - this.pointerStartX;
    });

    const finishSwipe = () => {
      if (this.pointerStartX === null) return;
      const threshold = Math.min(72, this.root.clientWidth * .14);
      if (this.pointerDeltaX <= -threshold) this.next();
      else if (this.pointerDeltaX >= threshold) this.prev();
      this.pointerStartX = null;
      this.pointerDeltaX = 0;
      this.startAutoplay();
    };

    this.track.addEventListener('pointerup', finishSwipe);
    this.track.addEventListener('pointercancel', finishSwipe);

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) this.stopAutoplay();
      else this.startAutoplay();
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) this.startAutoplay();
        else this.stopAutoplay();
      });
    }, { threshold: .2 });
    observer.observe(this.root);
  }

  goTo(index, announce = true) {
    this.index = (index + this.slides.length) % this.slides.length;
    this.track.style.transform = `translate3d(-${this.index * 100}%, 0, 0)`;

    this.slides.forEach((slide, i) => {
      slide.setAttribute('aria-hidden', String(i !== this.index));
    });

    this.dots?.forEach((dot, i) => {
      dot.classList.toggle('is-active', i === this.index);
      dot.setAttribute('aria-current', i === this.index ? 'true' : 'false');
    });

    this.thumbs.forEach((thumb, i) => {
      thumb.classList.toggle('is-active', i === this.index);
      thumb.setAttribute('aria-current', i === this.index ? 'true' : 'false');
    });

    if (this.status) {
      this.status.textContent = `${String(this.index + 1).padStart(2, '0')} / ${String(this.slides.length).padStart(2, '0')}`;
      if (announce) this.status.setAttribute('aria-live', 'polite');
    }
  }

  next() { this.goTo(this.index + 1); }
  prev() { this.goTo(this.index - 1); }

  startAutoplay() {
    if (this.reducedMotion || document.hidden || this.timer) return;
    this.timer = window.setInterval(() => this.next(), this.delay);
  }

  stopAutoplay() {
    if (!this.timer) return;
    window.clearInterval(this.timer);
    this.timer = null;
  }

  restartAutoplay() {
    this.stopAutoplay();
    this.startAutoplay();
  }
}

document.querySelectorAll('[data-carousel]').forEach((carousel) => new SpaCarousel(carousel));
