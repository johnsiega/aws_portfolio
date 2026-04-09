/* ═══════════════════════════════════════════════════════════════
   AWS-THEMED PORTFOLIO — script.js
   Interactions, scroll effects, and particle animation
   ═══════════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  // ── Navbar scroll effect ──
  const navbar = document.querySelector('.navbar');
  const navLinks = document.querySelectorAll('.nav-links a:not(.nav-cta)');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    // Navbar background
    navbar.classList.toggle('scrolled', window.scrollY > 50);

    // Active link highlighting
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // ── Mobile menu toggle ──
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-links');

  mobileToggle.addEventListener('click', () => {
    navMenu.classList.toggle('open');
    mobileToggle.textContent = navMenu.classList.contains('open') ? '✕' : '☰';
  });

  // Close menu on link click
  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      mobileToggle.textContent = '☰';
    });
  });

  // ── Scroll reveal ──
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  revealElements.forEach(el => revealObserver.observe(el));

  // ── Smooth scroll for anchor links ──
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ── Animated counter for hero stats ──
  function animateCounter(el, target) {
    const suffix = el.dataset.suffix || '';
    const duration = 1500;
    const start = performance.now();

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * target);
      el.textContent = current + suffix;
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }

  const statValues = document.querySelectorAll('.hero-stat-value');
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = parseInt(entry.target.dataset.count);
        animateCounter(entry.target, target);
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  statValues.forEach(el => statsObserver.observe(el));

  // ── Floating cloud particles on hero ──
  const heroBg = document.querySelector('.hero-bg');
  if (heroBg) {
    for (let i = 0; i < 20; i++) {
      const particle = document.createElement('div');
      const size = Math.random() * 4 + 2;
      particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: rgba(255, 153, 0, ${Math.random() * 0.15 + 0.05});
        border-radius: 50%;
        top: ${Math.random() * 100}%;
        left: ${Math.random() * 100}%;
        animation: floatParticle ${Math.random() * 8 + 6}s ease-in-out infinite;
        animation-delay: ${Math.random() * -10}s;
      `;
      heroBg.appendChild(particle);
    }

    // Inject float keyframe
    const style = document.createElement('style');
    style.textContent = `
      @keyframes floatParticle {
        0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.3; }
        25% { transform: translate(${Math.random() * 40 - 20}px, -30px) scale(1.3); opacity: 0.6; }
        50% { transform: translate(${Math.random() * 60 - 30}px, -60px) scale(1); opacity: 0.4; }
        75% { transform: translate(${Math.random() * 30 - 15}px, -25px) scale(1.2); opacity: 0.5; }
      }
    `;
    document.head.appendChild(style);
  }

  // ── Contact form handling ──
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const btn = form.querySelector('.form-submit');
      const originalText = btn.textContent;

      btn.textContent = 'Deploying message...';
      btn.style.opacity = '0.7';
      btn.disabled = true;

      setTimeout(() => {
        btn.textContent = '✓ Message Deployed Successfully';
        btn.style.background = 'var(--aws-success)';
        btn.style.color = '#fff';
        btn.style.opacity = '1';

        // Collect form data for console
        const formData = new FormData(form);
        console.log('📧 Contact Form Submission:');
        for (const [key, value] of formData.entries()) {
          console.log(`  ${key}: ${value}`);
        }

        form.reset();

        setTimeout(() => {
          btn.textContent = originalText;
          btn.style.background = '';
          btn.style.color = '';
          btn.disabled = false;
        }, 3000);
      }, 1500);
    });
  }

  // ── Tech tag hover ripple effect ──
  document.querySelectorAll('.tech-tag').forEach(tag => {
    tag.addEventListener('mouseenter', function() {
      this.style.transform = 'scale(1.08)';
    });
    tag.addEventListener('mouseleave', function() {
      this.style.transform = 'scale(1)';
    });
  });

  // ── Console easter egg ──
  console.log(`
  %c☁ AWS-Themed Portfolio ☁
  %cBuilt with vanilla HTML, CSS & JS
  %c⚡ Powered by cloud energy

  `, 
    'color: #FF9900; font-size: 18px; font-weight: bold;',
    'color: #879596; font-size: 12px;',
    'color: #3ECF8E; font-size: 12px;'
  );

});
