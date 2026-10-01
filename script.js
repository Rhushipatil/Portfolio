/* ============================================================
   PORTFOLIO SCRIPT – Rhushikesh Vikas Patil
   ============================================================ */

// ─── CURSOR GLOW ──────────────────────────────────────────
const cursorGlow = document.getElementById('cursorGlow');
document.addEventListener('mousemove', (e) => {
  cursorGlow.style.left = e.clientX + 'px';
  cursorGlow.style.top  = e.clientY + 'px';
});

// ─── NAVBAR SCROLL EFFECT ─────────────────────────────────
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  // Sticky style
  if (window.scrollY > 20) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  // Active link highlight
  let current = '';
  sections.forEach((sec) => {
    if (window.scrollY >= sec.offsetTop - 120) {
      current = sec.getAttribute('id');
    }
  });
  navLinks.forEach((link) => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });
});

// ─── HAMBURGER MENU ───────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const navMenu   = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navMenu.classList.toggle('open');
  const spans = hamburger.querySelectorAll('span');
  if (navMenu.classList.contains('open')) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity   = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  }
});

navMenu.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('open');
    hamburger.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  });
});

// ─── TYPEWRITER EFFECT ────────────────────────────────────
const phrases = [
  'Aspiring Data Analyst',
  'Data Engineer',
  'Python Enthusiast',
  'Problem Solver 🚀',
];
let phraseIdx = 0, charIdx = 0, deleting = false;
const tw = document.getElementById('typewriter');

function typeLoop() {
  const current = phrases[phraseIdx];
  if (deleting) {
    charIdx--;
    tw.textContent = current.slice(0, charIdx);
    if (charIdx <= 0) {
      deleting = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
      setTimeout(typeLoop, 400);
      return;
    }
    // Smooth accelerating delete — starts slow, gets faster
    const progress = 1 - (charIdx / current.length);
    const delay = 40 - (progress * 20); // 40ms → 20ms
    setTimeout(typeLoop, delay);
  } else {
    tw.textContent = current.slice(0, charIdx);
    charIdx++;
    if (charIdx > current.length) {
      deleting = true;
      setTimeout(typeLoop, 2200); // Pause to read the full word
      return;
    }
    // Natural variable typing speed with slight randomness
    const base = 70;
    const jitter = Math.random() * 40 - 10; // -10 to +30ms
    setTimeout(typeLoop, base + jitter);
  }
}
typeLoop();

// ─── PARTICLE CANVAS ──────────────────────────────────────
const canvas = document.getElementById('particleCanvas');
const ctx    = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class Particle {
  constructor() { this.reset(); }
  reset() {
    this.x   = Math.random() * canvas.width;
    this.y   = Math.random() * canvas.height;
    this.r   = Math.random() * 1.5 + 0.3;
    this.vx  = (Math.random() - 0.5) * 0.3;
    this.vy  = (Math.random() - 0.5) * 0.3;
    this.alpha = Math.random() * 0.5 + 0.1;
    const palette = ['#63b3ed', '#4fd1c5', '#b794f4', '#68d391'];
    this.color = palette[Math.floor(Math.random() * palette.length)];
  }
  update() {
    this.x += this.vx; this.y += this.vy;
    if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) this.reset();
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = this.color + Math.round(this.alpha * 255).toString(16).padStart(2, '0');
    ctx.fill();
  }
}

for (let i = 0; i < 100; i++) particles.push(new Particle());

function connectParticles() {
  for (let a = 0; a < particles.length; a++) {
    for (let b = a + 1; b < particles.length; b++) {
      const dx = particles[a].x - particles[b].x;
      const dy = particles[a].y - particles[b].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 100) {
        ctx.strokeStyle = `rgba(99,179,237,${(1 - dist / 100) * 0.08})`;
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(particles[a].x, particles[a].y);
        ctx.lineTo(particles[b].x, particles[b].y);
        ctx.stroke();
      }
    }
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => { p.update(); p.draw(); });
  connectParticles();
  requestAnimationFrame(animateParticles);
}
animateParticles();

// ─── SCROLL REVEAL ────────────────────────────────────────
const revealEls = document.querySelectorAll(
  '.about-grid, .skill-category, .project-card, .timeline-item, .edu-card, .contact-item, .contact-form, .cert-badge-card, .achievement-item, .section-header, .certs-section, .achievements-section'
);

revealEls.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 60);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealEls.forEach(el => revealObserver.observe(el));

// ─── PROFICIENCY BARS ─────────────────────────────────────
const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.prof-fill').forEach(fill => {
        const w = fill.dataset.width;
        setTimeout(() => { fill.style.width = w + '%'; }, 200);
      });
      barObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.proficiency-section').forEach(sec => barObserver.observe(sec));

// ─── CONTACT FORM ─────────────────────────────────────────
const form = document.getElementById('contactForm');
const successMsg = document.getElementById('formSuccess');
const submitBtn  = document.getElementById('submitContactBtn');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name    = document.getElementById('contactName').value.trim();
  const email   = document.getElementById('contactEmail').value.trim();
  const subject = document.getElementById('contactSubject').value.trim();
  const message = document.getElementById('contactMessage').value.trim();

  if (!name || !email || !subject || !message) {
    shakeForm(); return;
  }

  // Simulate send (replace with EmailJS or FormSubmit for real email)
  submitBtn.disabled = true;
  submitBtn.querySelector('.btn-text').textContent = 'Sending…';

  setTimeout(() => {
    form.reset();
    submitBtn.disabled = false;
    submitBtn.querySelector('.btn-text').textContent = 'Send Message';
    successMsg.classList.add('visible');
    setTimeout(() => successMsg.classList.remove('visible'), 5000);
  }, 1500);
});

function shakeForm() {
  form.style.animation = 'shake 0.4s ease';
  setTimeout(() => form.style.animation = '', 400);
}

// Add shake keyframe dynamically
const shakeStyle = document.createElement('style');
shakeStyle.textContent = `
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    20% { transform: translateX(-6px); }
    40% { transform: translateX(6px); }
    60% { transform: translateX(-4px); }
    80% { transform: translateX(4px); }
  }
`;
document.head.appendChild(shakeStyle);

// ─── FOOTER YEAR ──────────────────────────────────────────
document.getElementById('footerYear').textContent = new Date().getFullYear();

// ─── SKILL PILL HOVER GLOW ────────────────────────────────
document.querySelectorAll('.skill-pill').forEach(pill => {
  const colors = ['#63b3ed', '#4fd1c5', '#b794f4', '#f687b3', '#68d391'];
  const col = colors[Math.floor(Math.random() * colors.length)];
  pill.addEventListener('mouseenter', () => {
    pill.style.boxShadow = `0 0 14px ${col}60`;
    pill.style.color = col;
    pill.style.borderColor = col;
  });
  pill.addEventListener('mouseleave', () => {
    pill.style.boxShadow = '';
    pill.style.color = '';
    pill.style.borderColor = '';
  });
});

// ─── SMOOTH ACTIVE NAV ON CLICK ───────────────────────────
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navLinks.forEach(l => l.classList.remove('active'));
    link.classList.add('active');
  });
});
