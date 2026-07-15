/* ============================================================
   FISIORED — interactions
   Nav scroll, mobile menu, section fade-in, form, FAB
   ============================================================ */

(function () {
  'use strict';

  /* -------- Nav: elevation on scroll -------- */
  const navShell = document.querySelector('.nav-shell');
  if (navShell) {
    const onScroll = () => {
      navShell.classList.toggle('is-scrolled', window.scrollY > 24);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* -------- Mobile menu toggle -------- */
  const menuToggle = document.querySelector('[data-menu-toggle]');
  const mobileMenu = document.querySelector('[data-mobile-menu]');
  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('is-open');
      menuToggle.setAttribute('aria-expanded', String(isOpen));
    });

    mobileMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('is-open');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* -------- Section fade-in on scroll -------- */
  const fadeEls = document.querySelectorAll('.section-fade');
  if ('IntersectionObserver' in window && fadeEls.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    fadeEls.forEach((el) => observer.observe(el));
  } else {
    fadeEls.forEach((el) => el.classList.add('is-visible'));
  }

  /* -------- Contact form: client-side handling -------- */
  const form = document.querySelector('[data-contact-form]');
  if (form) {
    const status = form.querySelector('[data-form-status]');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(form).entries());

      if (status) {
        status.textContent = 'Enviando solicitud...';
        status.className = 'font-label-md text-on-surface-variant';
      }

      // Simulated send — wire to real endpoint when backend is ready.
      setTimeout(() => {
        if (status) {
          status.textContent =
            '¡Gracias ' +
            (data.nombre || '') +
            '! Recibimos tu solicitud. Te contactaremos pronto.';
          status.className = 'font-label-md text-primary';
        }
        form.reset();
      }, 700);
    });
  }

  /* -------- Active nav link highlighting -------- */
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('[data-nav-link]');
  if ('IntersectionObserver' in window && sections.length && navLinks.length) {
    const linkObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navLinks.forEach((link) => {
              const isActive = link.getAttribute('href') === '#' + id;
              link.classList.toggle('text-primary', isActive);
              link.classList.toggle('border-primary', isActive);
              link.classList.toggle('text-on-surface-variant', !isActive);
            });
          }
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    sections.forEach((s) => linkObserver.observe(s));
  }
})();