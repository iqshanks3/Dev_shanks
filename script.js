// ═══════════════════════════════════════
// MATRIX RAIN
// ═══════════════════════════════════════
(function () {
  var canvas = document.getElementById('matrix-canvas');
  var ctx = canvas.getContext('2d');
  var chars = 'ァアィイゥウェエォオカガキギクグケゲコゴサザシジスズセゼソゾタダチヂッツヅテデトドナニヌネノハバパヒビピフブプヘベペホボポマミムメモャヤュユョヨラリルレロワヲンABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.split('');
  var fontSize = 16;
  var width, height, columns, drops;

  function resize() {
    width  = canvas.width  = window.innerWidth;
    height = canvas.height = window.innerHeight;
    columns = Math.floor(width / fontSize);
    drops = [];
    for (var i = 0; i < columns; i++) drops[i] = 1;
  }

  function draw() {
    ctx.fillStyle = 'rgba(10,10,10,0.05)';
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = '#00ff41';
    ctx.font = fontSize + 'px "Share Tech Mono", monospace';
    for (var i = 0; i < drops.length; i++) {
      var text = chars[Math.floor(Math.random() * chars.length)];
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
  var bar = document.getElementById('scroll-progress');
  window.addEventListener('scroll', function () {
    var docH = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    bar.style.width = (window.scrollY / docH * 100) + '%';
  });
})();


// ═══════════════════════════════════════
// SCROLL TO TOP BUTTON
// ═══════════════════════════════════════
(function () {
  var btn = document.getElementById('scroll-top-btn');
  window.addEventListener('scroll', function () {
    if (window.scrollY > 400) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  });
  btn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();


// ═══════════════════════════════════════
// MOBILE HAMBURGER
// ═══════════════════════════════════════
(function () {
  var hamburger  = document.getElementById('hamburger');
  var mobileMenu = document.getElementById('mobile-menu');
  hamburger.addEventListener('click', function () {
    mobileMenu.classList.toggle('open');
  });
  var links = mobileMenu.querySelectorAll('a');
  for (var i = 0; i < links.length; i++) {
    links[i].addEventListener('click', function () {
      mobileMenu.classList.remove('open');
    });
  }
})();


// ═══════════════════════════════════════
// TYPEWRITER EFFECT
// ═══════════════════════════════════════
(function () {
  var el       = document.getElementById('typewriter-text');
  var fullText = 'root@shanks:~# whoami';
  var i = 0;
  var interval = setInterval(function () {
    el.textContent = fullText.slice(0, i);
    i++;
    if (i > fullText.length) clearInterval(interval);
  }, 55);
})();


// ═══════════════════════════════════════
// TERMINAL BLOCK SCROLL REVEAL
// ═══════════════════════════════════════
(function () {
  var terminals = document.querySelectorAll('.terminal');
  var observer  = new IntersectionObserver(function (entries) {
    for (var i = 0; i < entries.length; i++) {
      if (entries[i].isIntersecting) {
        entries[i].target.classList.add('visible');
        observer.unobserve(entries[i].target);
      }
    }
  }, { threshold: 0.08 });
  for (var i = 0; i < terminals.length; i++) {
    observer.observe(terminals[i]);
  }
})();


// ═══════════════════════════════════════
// STAT COUNTER ANIMATION
// ═══════════════════════════════════════
(function () {
  var boxes    = document.querySelectorAll('.stat-box');
  var observer = new IntersectionObserver(function (entries) {
    for (var e = 0; e < entries.length; e++) {
      if (!entries[e].isIntersecting) continue;
      (function (box) {
        var target  = parseInt(box.dataset.target, 10);
        var suffix  = box.dataset.suffix || '';
        var numEl   = box.querySelector('.stat-number');
        var inc     = Math.max(1, Math.floor(target / 40));
        var current = 0;
        var timer   = setInterval(function () {
          current += inc;
          if (current >= target) {
            numEl.textContent = target + suffix;
            clearInterval(timer);
          } else {
            numEl.textContent = current + suffix;
          }
        }, 25);
      })(entries[e].target);
      observer.unobserve(entries[e].target);
    }
  }, { threshold: 0.5 });
  for (var i = 0; i < boxes.length; i++) {
    observer.observe(boxes[i]);
  }
})();


// ═══════════════════════════════════════
// SKILL BAR ANIMATION
// ═══════════════════════════════════════
(function () {
  var rows     = document.querySelectorAll('.skill-row');
  var observer = new IntersectionObserver(function (entries) {
    for (var i = 0; i < entries.length; i++) {
      if (!entries[i].isIntersecting) continue;
      (function (row) {
        var fill = row.querySelector('.skill-fill');
        var pct  = fill.dataset.pct;
        setTimeout(function () { fill.style.width = pct + '%'; }, 200);
      })(entries[i].target);
      observer.unobserve(entries[i].target);
    }
  }, { threshold: 0.1 });
  for (var i = 0; i < rows.length; i++) {
    observer.observe(rows[i]);
  }
})();
