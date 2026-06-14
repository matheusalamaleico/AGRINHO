const heroSketch = (p) => {
  const PARTICLES = 55;
  let parts = [];

  class Particle {
    constructor() { this.reset(true); }

    reset(initial = false) {
      this.x = p.random(p.width);
      this.y = initial ? p.random(p.height) : p.height + 10;
      this.size = p.random(3, 9);
      this.speedY = p.random(0.25, 0.75);
      this.speedX = p.random(-0.3, 0.3);
      this.opacity = p.random(60, 160);
      const icons = ['🌿', '🌱', '💧', '✦', '○'];
      this.icon = icons[Math.floor(p.random(icons.length))];
      this.useIcon = p.random() > 0.6;
    }

    update() {
      this.y -= this.speedY;
      this.x += this.speedX;
      if (this.y < -20) this.reset();
    }

    draw() {
      if (this.useIcon) {
        p.textSize(this.size * 2.2);
        p.textAlign(p.CENTER, p.CENTER);
        p.text(this.icon, this.x, this.y);
      } else {
        p.noStroke();
        p.fill(255, 255, 255, this.opacity);
        p.ellipse(this.x, this.y, this.size);
      }
    }
  }

  p.setup = () => {
    const heroEl = document.getElementById('hero');
    const cnv = p.createCanvas(heroEl.offsetWidth, heroEl.offsetHeight);
    cnv.id('hero-canvas');
    cnv.parent('hero');

    // Garante que o canvas fique atrás do conteúdo
    const canvasEl = document.getElementById('hero-canvas');
    canvasEl.style.position = 'absolute';
    canvasEl.style.top = '0';
    canvasEl.style.left = '0';
    canvasEl.style.width = '100%';
    canvasEl.style.height = '100%';
    canvasEl.style.pointerEvents = 'none';
    canvasEl.style.zIndex = '0';

    for (let i = 0; i < PARTICLES; i++) parts.push(new Particle());
  };

  p.draw = () => {
    p.clear();
    parts.forEach(pt => { pt.update(); pt.draw(); });
  };

  p.windowResized = () => {
    const heroEl = document.getElementById('hero');
    p.resizeCanvas(heroEl.offsetWidth, heroEl.offsetHeight);
  };
};

function animateBars() {
  const bars = [
    { bar: 'bar1', pct: 'pct1', val: 30 },
    { bar: 'bar2', pct: 'pct2', val: 40 },
    { bar: 'bar3', pct: 'pct3', val: 25 },
    { bar: 'bar4', pct: 'pct4', val: 55 },
  ];

  bars.forEach((b, i) => {
    setTimeout(() => {
      const barEl = document.getElementById(b.bar);
      const pctEl = document.getElementById(b.pct);
      if (!barEl || !pctEl) return;

      barEl.style.width = b.val + '%';
      let n = 0;
      const step = b.val / 55;
      const timer = setInterval(() => {
        n += step;
        if (n >= b.val) { n = b.val; clearInterval(timer); }
        pctEl.textContent = Math.floor(n) + '%';
      }, 25);
    }, i * 180);
  });
}

const impactObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      animateBars();
      impactObserver.disconnect();
    }
  });
}, { threshold: 0.3 });

function initScrollButtons() {
  document.querySelectorAll('[data-scroll]').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = document.getElementById(btn.dataset.scroll);
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });
}

function initContactForm() {
  const btn = document.getElementById('btn-enviar');
  if (btn) {
    btn.addEventListener('click', () => {
      alert('Mensagem enviada! Entraremos em contato em breve. 🌱');
    });
  }
}

window.addEventListener('DOMContentLoaded', () => {
  if (typeof p5 !== 'undefined') {
    new p5(heroSketch);
  }

  const impactEl = document.getElementById('impactos');
  if (impactEl) impactObserver.observe(impactEl);

  initScrollButtons();
  initContactForm();
});