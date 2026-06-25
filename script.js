// ═══════════════════════════════════════
// MATRIX RAIN
// ═══════════════════════════════════════
(function () {
  const canvas = document.getElementById('matrix-canvas');
  const ctx = canvas.getContext('2d');
  const chars = 'ァアィイゥウェエォオカガキギクグケゲコゴサザシジスズセゼソゾタダチヂッツヅテデトドナニヌネノハバパヒビピフブプヘベペホボポマミムメモャヤュユョヨラリルレロワヲンABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.split('');
  const fontSize = 16;
  let width, height, columns, drops;

  function resize() {
    width  = canvas.width  = window.innerWidth;
    height = canvas.height = window.innerHeight;
    columns = Math.floor(width / fontSize);
    drops   = new Array(columns).fill(1);
  }

  function draw() {
    ctx.fillStyle = 'rgba(10,10,10,0.05)';
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = '#00ff41';
    ctx.font = fontSize + 'px "Share Tech Mono", monospace';
    for (let i = 0; i < drops.length; i++) {
      const text = chars[Math.floor(Math.random() * chars.length)];
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);
      if (drops[i] * fontSize > height && Math.random() > 0.975) drops[i] = 0;
      drops[i]++;
    }
  }

  resize();
  setInterval(draw, 30);
  window.addEventListener('resize', resize);
})();


// ═══════════════════════════════════════
// SCROLL PROGRESS BAR
// ═══════════════════════════════════════
(function () {
  const bar = document.getElementById('scroll-progress');
  window.addEventListener('scroll', function () {
    const docH = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    bar.style.width = (window.scrollY / docH * 100) + '%';
  });
})();


// ═══════════════════════════════════════
// SCROLL TO TOP BUTTON
// ═══════════════════════════════════════
(function () {
  const btn = document.getElementById('scroll-top-btn');
  window.addEventListener('scroll', function () {
    btn.classList.toggle('visible', window.scrollY > 400);
  });
  btn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();


// ═══════════════════════════════════════
// MOBILE HAMBURGER
// ═══════════════════════════════════════
(function () {
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  hamburger.addEventListener('click', function () {
    mobileMenu.classList.toggle('open');
  });
  mobileMenu.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () {
      mobileMenu.classList.remove('open');
    });
  });
})();


// ═══════════════════════════════════════
// TYPEWRITER EFFECT
// ═══════════════════════════════════════
(function () {
  const el      = document.getElementById('typewriter-text');
  const fullText = 'root@shanks:~# whoami';
  let i = 0;
  const interval = setInterval(function () {
    el.textContent = fullText.slice(0, i);
    i++;
    if (i > fullText.length) clearInterval(interval);
  }, 55);
})();


// ═══════════════════════════════════════
// TERMINAL BLOCK SCROLL REVEAL
// ═══════════════════════════════════════
(function () {
  const terminals = document.querySelectorAll('.terminal');
  const observer  = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  terminals.forEach(function (t) { observer.observe(t); });
})();


// ═══════════════════════════════════════
// STAT COUNTER ANIMATION
// ═══════════════════════════════════════
(function () {
  const boxes = document.querySelectorAll('.stat-box');
  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      const box    = entry.target;
      const target = parseInt(box.dataset.target, 10);
      const suffix = box.dataset.suffix || '';
      const numEl  = box.querySelector('.stat-number');
      const inc    = Math.max(1, Math.floor(target / 40));
      let current  = 0;
      const interval = setInterval(function () {
        current += inc;
        if (current >= target) {
          numEl.textContent = target + suffix;
          clearInterval(interval);
        } else {
          numEl.textContent = current + suffix;
        }
      }, 25);
      observer.unobserve(box);
    });
  }, { threshold: 0.5 });
  boxes.forEach(function (b) { observer.observe(b); });
})();


// ═══════════════════════════════════════
// SKILL BAR ANIMATION
// ═══════════════════════════════════════
(function () {
  const rows = document.querySelectorAll('.skill-row');
  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      const fill = entry.target.querySelector('.skill-fill');
      const pct  = fill.dataset.pct;
      setTimeout(function () { fill.style.width = pct + '%'; }, 200);
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.1 });
  rows.forEach(function (r) { observer.observe(r); });
})();
