(function(){
  "use strict";

  /* ---------- EDIT ME: your GitHub username ---------- */
  const GITHUB_USERNAME = "robertosachioc";

  /* ---------- EDIT ME: paste your Google Apps Script Web App URL here.
     Follow the steps in contact-form-setup.md (in this repo) — takes ~5 minutes, totally free.
     While this is empty (""), the form falls back to opening the visitor's email app. ---------- */
  const SHEET_WEBAPP_URL = "";

  /* ---------- Theme toggle (light/dark) ---------- */
  const root = document.documentElement;
  const themeBtn = document.getElementById('themeToggle');
  function applyTheme(t){
    root.setAttribute('data-theme', t);
    try{ localStorage.setItem('theme', t); }catch(e){}
  }
  let savedTheme = 'light';
  try{ savedTheme = localStorage.getItem('theme') || 'light'; }catch(e){}
  applyTheme(savedTheme);
  themeBtn.addEventListener('click', function(){
    applyTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
  });

  /* ---------- Mobile menu ---------- */
  const hamburger = document.getElementById('hamburger');
  const panel = document.getElementById('mobilePanel');
  hamburger.addEventListener('click', function(){
    const open = panel.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  panel.querySelectorAll('a').forEach(function(a){
    a.addEventListener('click', function(){ panel.classList.remove('open'); hamburger.setAttribute('aria-expanded','false'); });
  });

  /* ---------- Gentle scroll reveal (progressive enhancement — visible without JS) ---------- */
  document.documentElement.classList.add('js-ready');
  const obs = new IntersectionObserver(function(entries){
    entries.forEach(function(e){ if (e.isIntersecting) { e.target.classList.add('in'); obs.unobserve(e.target); } });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(function(el){ obs.observe(el); });

  /* ---------- Contact form -> Google Sheet (or mailto fallback if URL not set) ---------- */
  const form = document.getElementById('contactForm');
  const formNote = document.getElementById('formNote');
  form.addEventListener('submit', function(e){
    e.preventDefault();
    const name = document.getElementById('cf-name').value;
    const email = document.getElementById('cf-email').value;
    const company = document.getElementById('cf-company').value;
    const message = document.getElementById('cf-message').value;
    const btn = form.querySelector('button[type="submit"]');

    if (SHEET_WEBAPP_URL) {
      btn.disabled = true; btn.textContent = 'Sending…';
      const data = new FormData();
      data.append('name', name); data.append('email', email);
      data.append('company', company); data.append('message', message);
      fetch(SHEET_WEBAPP_URL, { method:'POST', mode:'no-cors', body:data })
        .then(function(){
          btn.textContent = 'Sent ✓'; form.reset();
          formNote.textContent = 'Thanks! Your message has been delivered.';
          setTimeout(function(){ btn.disabled = false; btn.textContent = 'Send message →'; }, 4000);
        })
        .catch(function(){
          btn.disabled = false; btn.textContent = 'Send message →';
          formNote.textContent = "Couldn't send — please email me directly instead.";
        });
    } else {
      const subject = encodeURIComponent('Portfolio contact from ' + name);
      const body = encodeURIComponent(message + '\n\n— ' + name + ' (' + email + ')' + (company ? '\n' + company : ''));
      window.location.href = 'mailto:robertosc1178@gmail.com?subject=' + subject + '&body=' + body;
    }
  });

  /* ---------- Active nav highlight while scrolling ---------- */
  const navAs = document.querySelectorAll('.nav-links a[href^="#"]');
  const secObs = new IntersectionObserver(function(entries){
    entries.forEach(function(en){
      if (en.isIntersecting) {
        navAs.forEach(function(a){ a.classList.toggle('active', a.getAttribute('href') === '#' + en.target.id); });
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });
  document.querySelectorAll('section[id], div[id="contact"]').forEach(function(s){ secObs.observe(s); });

  /* ---------- Back to top ---------- */
  const toTop = document.getElementById('toTop');
  window.addEventListener('scroll', function(){
    toTop.classList.toggle('show', window.scrollY > 600);
  }, { passive:true });
  toTop.addEventListener('click', function(){ window.scrollTo({ top:0, behavior:'smooth' }); });

  /* ---------- "See all projects" — only kicks in when you have more than 4 project cards ---------- */
  (function(){
    const grid = document.getElementById('projectsGrid');
    const row = document.getElementById('seeAllRow');
    const btn = document.getElementById('seeAllBtn');
    if (!grid || !row || !btn) return;
    const cards = Array.prototype.slice.call(grid.querySelectorAll('.proj'));
    if (cards.length > 4) {
      cards.slice(4).forEach(function(c){ c.classList.add('extra'); });
      row.classList.add('show');
      btn.addEventListener('click', function(){
        const expanded = grid.classList.toggle('expanded');
        btn.textContent = expanded ? 'Show fewer ↑' : 'See all projects ↓';
      });
    }
  })();

  /* ---------- GitHub repos ---------- */
  const ghGrid = document.getElementById('ghGrid');
  function repoCard(r){
    const desc = r.description ? r.description : 'No description yet.';
    const lang = r.language ? r.language : '—';
    return '<a class="gh-card" href="' + r.html_url + '" target="_blank" rel="noopener">' +
      '<span class="gh-name">' + r.name + '</span>' +
      '<span class="gh-desc">' + desc.replace(/</g,'&lt;') + '</span>' +
      '<span class="gh-meta"><span><span class="gh-lang-dot"></span>' + lang + '</span><span>★ ' + r.stargazers_count + '</span></span>' +
      '</a>';
  }
  fetch('https://api.github.com/users/' + GITHUB_USERNAME + '/repos?sort=updated&per_page=6')
    .then(function(res){ if(!res.ok) throw new Error('bad response'); return res.json(); })
    .then(function(repos){
      if (!Array.isArray(repos) || repos.length === 0) throw new Error('empty');
      const cards = repos.filter(function(r){ return !r.fork; }).slice(0,6).map(repoCard).join('');
      ghGrid.innerHTML = cards || '<p class="gh-empty">No public repositories yet.</p>';
    })
    .catch(function(){
      ghGrid.innerHTML = '<p class="gh-empty">Couldn&#39;t load repositories — set <code>GITHUB_USERNAME</code> near the bottom of this file, or view them directly on ' +
        '<a href="https://github.com/' + GITHUB_USERNAME + '" target="_blank" rel="noopener">GitHub</a>.</p>';
    });

})();
