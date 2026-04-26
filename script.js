/* ═══════════════════════════════════════════════════════════════
   MARCO VISCONTI — SOCIAL MEDIA STRATEGIST
   JavaScript · Interactions & Animations
═══════════════════════════════════════════════════════════════ */

'use strict';

// ── CUSTOM CURSOR ──────────────────────────────────────────────
(function initCursor() {
  const cursor = document.getElementById('cursor');
  const follower = document.getElementById('cursorFollower');
  if (!cursor || !follower) return;

  let mouseX = 0, mouseY = 0;
  let followerX = 0, followerY = 0;
  let rafId;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
  });

  function animateFollower() {
    followerX += (mouseX - followerX) * 0.1;
    followerY += (mouseY - followerY) * 0.1;
    follower.style.left = followerX + 'px';
    follower.style.top = followerY + 'px';
    rafId = requestAnimationFrame(animateFollower);
  }
  animateFollower();

  // Hide on mobile
  if ('ontouchstart' in window) {
    cursor.style.display = 'none';
    follower.style.display = 'none';
  }
})();

// ── NAVBAR SCROLL BEHAVIOR ─────────────────────────────────────
(function initNavbar() {
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  if (!navbar) return;

  let lastScroll = 0;
  let ticking = false;

  function updateNavbar() {
    const scrollY = window.scrollY;

    // Add scrolled class
    if (scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Active link highlighting
    let currentSection = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      if (scrollY >= sectionTop) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href');
      if (href && href === '#' + currentSection) {
        link.classList.add('active');
      }
    });

    lastScroll = scrollY;
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateNavbar);
      ticking = true;
    }
  }, { passive: true });

  updateNavbar();
})();

// ── HAMBURGER MENU ─────────────────────────────────────────────
(function initHamburger() {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  if (!hamburger || !navLinks) return;

  hamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
      navLinks.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });
})();

// ── SMOOTH SCROLL ──────────────────────────────────────────────
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
})();

// ── SCROLL REVEAL ──────────────────────────────────────────────
(function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -60px 0px'
  });

  elements.forEach(el => observer.observe(el));
})();

// ── COUNTER ANIMATION ──────────────────────────────────────────
(function initCounters() {
  const statNumbers = document.querySelectorAll('.stat-number[data-target]');
  if (!statNumbers.length) return;

  function easeOutQuart(t) {
    return 1 - Math.pow(1 - t, 4);
  }

  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-target'), 10);
    const duration = 2000;
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutQuart(progress);
      el.textContent = Math.floor(eased * target);
      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = target;
      }
    }
    requestAnimationFrame(update);
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(el => observer.observe(el));
})();

// ── RESULTS COUNTERS (in results section) ─────────────────────
(function initResultsCounters() {
  const counters = document.querySelectorAll('.counter[data-target]');
  if (!counters.length) return;

  function easeOutQuart(t) {
    return 1 - Math.pow(1 - t, 4);
  }

  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-target'), 10);
    const duration = 2500;
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutQuart(progress);
      el.textContent = Math.floor(eased * target);
      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = target;
      }
    }
    requestAnimationFrame(update);
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  counters.forEach(el => observer.observe(el));
})();

// ── PROGRESS BAR ANIMATION ─────────────────────────────────────
(function initProgressBars() {
  const bars = document.querySelectorAll('.mega-bar-fill');
  if (!bars.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('animated');
        }, 300);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  bars.forEach(bar => observer.observe(bar));
})();

// ── CONTACT FORM ───────────────────────────────────────────────
(function initContactForm() {
  const form = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');
  const formSuccess = document.getElementById('formSuccess');
  if (!form) return;

  function validateField(field) {
    const value = field.value.trim();
    let valid = true;

    if (field.hasAttribute('required') && !value) {
      field.classList.add('error');
      valid = false;
    } else if (field.type === 'email' && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        field.classList.add('error');
        valid = false;
      } else {
        field.classList.remove('error');
      }
    } else {
      field.classList.remove('error');
    }
    return valid;
  }

  // Live validation
  form.querySelectorAll('input, textarea').forEach(field => {
    field.addEventListener('blur', () => validateField(field));
    field.addEventListener('input', () => {
      if (field.classList.contains('error')) validateField(field);
    });
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    let allValid = true;
    form.querySelectorAll('input[required], textarea[required]').forEach(field => {
      if (!validateField(field)) allValid = false;
    });

    if (!allValid) {
      // Shake animation
      form.style.animation = 'shake 0.4s ease';
      setTimeout(() => form.style.animation = '', 400);
      return;
    }

    // Show loading state
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');
    submitBtn.disabled = true;
    if (btnText) btnText.hidden = true;
    if (btnLoading) btnLoading.hidden = false;

    // Simulate API call (replace with real endpoint)
    await new Promise(resolve => setTimeout(resolve, 1800));

    // Show success
    form.hidden = true;
    if (formSuccess) formSuccess.hidden = false;

    // Reset after success (optional auto-reset)
    // setTimeout(() => {
    //   form.reset();
    //   form.hidden = false;
    //   formSuccess.hidden = true;
    //   submitBtn.disabled = false;
    // }, 8000);
  });
})();

// ── CARD HOVER PARALLAX ────────────────────────────────────────
(function initCardParallax() {
  const cards = document.querySelectorAll('.service-card, .testimonial-card, .case-card, .mega-stat');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      const intensity = 6;
      card.style.transform = `translateY(-6px) rotateX(${-y * intensity}deg) rotateY(${x * intensity}deg)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'transform 0.5s cubic-bezier(0.4,0,0.2,1), border-color 0.35s, box-shadow 0.35s';
    });

    card.addEventListener('mouseenter', () => {
      card.style.transition = 'transform 0.1s, border-color 0.35s, box-shadow 0.35s';
    });
  });
})();

// ── HERO PARALLAX ──────────────────────────────────────────────
(function initHeroParallax() {
  const heroGrid = document.querySelector('.hero-grid');
  const heroGradient = document.querySelector('.hero-gradient');
  if (!heroGrid) return;

  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        if (scrollY < window.innerHeight) {
          const offset = scrollY * 0.3;
          heroGrid.style.transform = `translateY(${offset}px)`;
          heroGradient.style.transform = `translateY(${offset * 0.5}px)`;
        }
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
})();

// ── FLOATING BADGE ANIMATION ───────────────────────────────────
(function initFloatingBadge() {
  const badge = document.querySelector('.about-badge-floating');
  const accentCard = document.querySelector('.about-accent-card');
  if (!badge) return;

  let t = 0;
  function animate() {
    t += 0.025;
    const y1 = Math.sin(t) * 6;
    const y2 = Math.sin(t + 1.5) * 8;
    if (badge) badge.style.transform = `translate(-16px, ${y1}px)`;
    if (accentCard) accentCard.style.transform = `translate(0, ${y2}px)`;
    requestAnimationFrame(animate);
  }
  animate();
})();

// ── TYPING EFFECT FOR HERO (Optional subtle enhancement) ───────
(function initHeroBadgePulse() {
  const badge = document.querySelector('.hero-badge');
  if (!badge) return;
  // Already has CSS animation, just ensure visibility
  badge.style.opacity = '1';
})();

// ── SHAKE KEYFRAME ─────────────────────────────────────────────
const style = document.createElement('style');
style.textContent = `
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    20% { transform: translateX(-8px); }
    40% { transform: translateX(8px); }
    60% { transform: translateX(-5px); }
    80% { transform: translateX(5px); }
  }
`;
document.head.appendChild(style);

// ── SECTION ENTRANCE GLOW ──────────────────────────────────────
(function initSectionGlow() {
  const glowSections = document.querySelectorAll('.results-section, .cta-banner');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.transition = 'box-shadow 1s ease';
      }
    });
  }, { threshold: 0.1 });

  glowSections.forEach(s => observer.observe(s));
})();

// ── BUTTON RIPPLE EFFECT ───────────────────────────────────────
(function initRipple() {
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      const rect = btn.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255,255,255,0.15);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple-anim 0.55s ease-out forwards;
        pointer-events: none;
      `;

      btn.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  });

  const rippleStyle = document.createElement('style');
  rippleStyle.textContent = `
    @keyframes ripple-anim {
      to { transform: scale(2.5); opacity: 0; }
    }
  `;
  document.head.appendChild(rippleStyle);
})();

// ── PRELOADER (lightweight) ────────────────────────────────────
(function initLoad() {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s ease';

  window.addEventListener('load', () => {
    setTimeout(() => {
      document.body.style.opacity = '1';
    }, 100);
  });

  // Fallback
  setTimeout(() => {
    document.body.style.opacity = '1';
  }, 800);
})();

// ── STATS TICKER ON HOVER ──────────────────────────────────────
(function initStatHover() {
  document.querySelectorAll('.stat').forEach(stat => {
    const num = stat.querySelector('.stat-number');
    if (!num) return;
    const original = num.textContent;
    stat.addEventListener('mouseenter', () => {
      num.style.color = 'var(--blue-light)';
      num.style.transition = 'color 0.3s';
    });
    stat.addEventListener('mouseleave', () => {
      num.style.color = '';
    });
  });
})();

// ── INIT COMPLETE LOG ──────────────────────────────────────────
console.log('%c🚀 Marco Visconti — Portfolio loaded', 'font-family:sans-serif;font-size:14px;color:#1A6EFA;font-weight:bold;');
