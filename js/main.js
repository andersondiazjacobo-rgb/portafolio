/* ============================================
   MAIN JS - Anderson Díaz Jacobo Portfolio
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ============================================
  // 1. WAVES
  // ============================================
  const canvas = document.getElementById('particles-canvas');
  const ctx = canvas.getContext('2d');
  let time = 0;

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  const waves = [
    { amplitude: 60, frequency: 0.008, speed: 0.012, color: 'rgba(147, 51, 234, 0.12)', offsetY: 0.4 },
    { amplitude: 40, frequency: 0.012, speed: 0.018, color: 'rgba(168, 85, 247, 0.10)', offsetY: 0.5 },
    { amplitude: 80, frequency: 0.005, speed: 0.008, color: 'rgba(107, 33, 168, 0.08)', offsetY: 0.6 },
    { amplitude: 30, frequency: 0.015, speed: 0.022, color: 'rgba(192, 132, 252, 0.07)', offsetY: 0.3 },
    { amplitude: 50, frequency: 0.009, speed: 0.014, color: 'rgba(147, 51, 234, 0.06)', offsetY: 0.7 },
  ];

  function drawWaves() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    waves.forEach(wave => {
      ctx.beginPath();
      const baseY = canvas.height * wave.offsetY;

      ctx.moveTo(0, baseY + Math.sin(0) * wave.amplitude);

      for (let x = 0; x <= canvas.width; x += 2) {
        const y = baseY
          + Math.sin(x * wave.frequency + time * wave.speed) * wave.amplitude
          + Math.sin(x * wave.frequency * 1.7 + time * wave.speed * 0.6) * (wave.amplitude * 0.4);
        ctx.lineTo(x, y);
      }

      ctx.lineTo(canvas.width, canvas.height);
      ctx.lineTo(0, canvas.height);
      ctx.closePath();
      ctx.fillStyle = wave.color;
      ctx.fill();
    });

    time++;
    requestAnimationFrame(drawWaves);
  }

  drawWaves();

  // ============================================
  // 2. TYPEWRITER
  // ============================================
  const typewriterEl = document.getElementById('typewriter');
  const words = [
    'Guitarrista',
    'Bajista',
    'Compositor',
    'Músico'
  ];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeSpeed = 100;

  function typeEffect() {
    const current = words[wordIndex];

    if (isDeleting) {
      typewriterEl.textContent = current.substring(0, charIndex - 1);
      charIndex--;
      typeSpeed = 50;
    } else {
      typewriterEl.textContent = current.substring(0, charIndex + 1);
      charIndex++;
      typeSpeed = 100;
    }

    if (!isDeleting && charIndex === current.length) {
      typeSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      typeSpeed = 400;
    }

    setTimeout(typeEffect, typeSpeed);
  }

  typeEffect();

  // ============================================
  // 3. NAVBAR
  // ============================================
  const navbar = document.querySelector('.navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');

  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;

    navbar.classList.toggle('scrolled', currentScroll > 50);

    if (currentScroll > 100) {
      if (currentScroll > lastScroll) {
        navbar.classList.add('hidden');
      } else {
        navbar.classList.remove('hidden');
      }
    } else {
      navbar.classList.remove('hidden');
    }

    lastScroll = currentScroll;
  });

  // Hamburger
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
  });

  // Close menu on link click
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });

  // ============================================
  // 4. ACTIVE NAV LINK ON SCROLL
  // ============================================
  const sections = document.querySelectorAll('section[id]');

  function updateActiveLink() {
    const scrollY = window.scrollY + 120;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollY >= top && scrollY < top + height) {
        document.querySelectorAll('.nav-links a').forEach(a => {
          a.classList.remove('active');
        });
        const activeLink = document.querySelector(`.nav-links a[href="#${id}"]`);
        if (activeLink) activeLink.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', updateActiveLink);

  // ============================================
  // 5. REVEAL ON SCROLL (Intersection Observer)
  // ============================================
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // ============================================
  // 6. SKILL BARS ANIMATION
  // ============================================
  const skillFills = document.querySelectorAll('.skill-fill');

  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill = entry.target;
        const width = fill.getAttribute('data-width');
        fill.style.width = width + '%';
      }
    });
  }, { threshold: 0.5 });

  skillFills.forEach(fill => skillObserver.observe(fill));

  // ============================================
  // 7. CONTACT FORM
  // ============================================
  const contactForm = document.getElementById('contact-form');

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !message) {
      alert('Por favor completa los campos requeridos.');
      return;
    }

    // Simulate sending
    const btn = contactForm.querySelector('.btn');
    const originalText = btn.textContent;
    btn.textContent = 'Enviando...';
    btn.disabled = true;

    setTimeout(() => {
      alert('¡Mensaje enviado con éxito! Te contactaré pronto.');
      contactForm.reset();
      btn.textContent = originalText;
      btn.disabled = false;
    }, 1500);
  });

  // ============================================
  // 8. SMOOTH SCROLL FOR ANCHOR LINKS
  // ============================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
});
