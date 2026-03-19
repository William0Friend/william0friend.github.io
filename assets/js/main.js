/* ================================================================
   William Friend Portfolio — Main JS
   ================================================================ */

/* ── AOS ── */
AOS.init({ duration: 700, easing: 'ease-out-cubic', once: true, offset: 60 });

/* ── Swiper (featured projects carousel) ── */
new Swiper('.projects-swiper', {
  slidesPerView: 1,
  spaceBetween: 24,
  loop: true,
  autoplay: { delay: 4500, disableOnInteraction: false, pauseOnMouseEnter: true },
  pagination: { el: '.swiper-pagination', clickable: true },
  navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
  breakpoints: {
    640:  { slidesPerView: 1 },
    768:  { slidesPerView: 2 },
    1100: { slidesPerView: 3 },
  }
});

/* ── Sticky navbar ── */
const nav = document.getElementById('main-nav');
const onScroll = () => nav && nav.classList.toggle('scrolled', window.scrollY > 50);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

/* ── Active nav link on scroll ── */
const sections  = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.navbar-nav .nav-link[href^="#"]');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => { if (window.scrollY >= s.offsetTop - 100) current = s.id; });
  navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + current));
}, { passive: true });

/* ── Smooth scroll ── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    const collapse = document.getElementById('navbarNav');
    if (collapse && collapse.classList.contains('show')) {
      const inst = bootstrap.Collapse.getInstance(collapse);
      if (inst) inst.hide();
    }
  });
});

/* ── Typed text ── */
const typedEl = document.getElementById('typed-text');
if (typedEl) {
  const phrases = [
    'Software Engineer',
    'Security Engineer',
    'AI/ML Developer',
    'Full-Stack Dev',
    'Open Source Contributor',
    'Threat Intel Builder',
  ];
  let pi = 0, ci = 0, deleting = false;
  function typeLoop() {
    const phrase = phrases[pi];
    if (!deleting) {
      typedEl.textContent = phrase.slice(0, ++ci);
      if (ci === phrase.length) { deleting = true; setTimeout(typeLoop, 2200); return; }
    } else {
      typedEl.textContent = phrase.slice(0, --ci);
      if (ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; }
    }
    setTimeout(typeLoop, deleting ? 55 : 100);
  }
  setTimeout(typeLoop, 900);
}

/* ── GitHub Repos Grid ── */
const GITHUB_USER = 'William0Friend';
const LANG_COLORS = {
  JavaScript: '#f1e05a', Python: '#3572A5', PHP: '#4F5D95',
  TypeScript: '#2b7489', Shell: '#89e051', HTML: '#e34c26',
  CSS: '#563d7c', Java: '#b07219', C: '#555555', 'C++': '#f34b7d',
  Ruby: '#701516', 'C#': '#178600', 'Jupyter Notebook': '#DA5B0B',
  Assembly: '#6E4C13', SCSS: '#c6538c', Blade: '#f7523f',
  Mathematica: '#dd1100', Perl: '#0298c3',
};

const reposGrid = document.getElementById('repos-grid');
if (reposGrid) {
  fetch('https://api.github.com/users/' + GITHUB_USER + '/repos?sort=updated&per_page=30&type=public')
    .then(function(r) { return r.json(); })
    .then(function(repos) {
      if (!Array.isArray(repos)) throw new Error('bad response');
      var show = repos
        .filter(function(r) {
          return !r.fork && r.name !== GITHUB_USER + '.github.io' && r.name !== GITHUB_USER;
        })
        .slice(0, 12);
      reposGrid.innerHTML = show.map(function(r, idx) {
        var color   = LANG_COLORS[r.language] || '#8b949e';
        var lang    = r.language || 'Various';
        var desc    = r.description
          ? (r.description.length > 88 ? r.description.slice(0, 88) + '\u2026' : r.description)
          : 'No description provided.';
        var updated = new Date(r.updated_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
        var delay   = (idx % 3) * 80;
        return '<a href="' + r.html_url + '" target="_blank" rel="noopener noreferrer"' +
          ' class="repo-card" data-aos="fade-up" data-aos-delay="' + delay + '">' +
          '<div class="repo-card-header">' +
          '<i class="fa-regular fa-folder-open"></i>' +
          '<span class="repo-stars"><i class="fa-solid fa-star"></i>&nbsp;' + r.stargazers_count + '</span>' +
          '</div>' +
          '<h4 class="repo-name">' + r.name + '</h4>' +
          '<p class="repo-desc">' + desc + '</p>' +
          '<div class="repo-footer">' +
          '<span class="repo-lang"><span class="lang-dot" style="background:' + color + '"></span>' + lang + '</span>' +
          '<span class="repo-updated">' + updated + '</span>' +
          '</div></a>';
      }).join('');
    })
    .catch(function() {
      reposGrid.innerHTML =
        '<div style="grid-column:1/-1;text-align:center;padding:2rem">' +
        '<p style="color:var(--text-muted);margin-bottom:1rem">Couldn\'t load repos — view them directly on GitHub.</p>' +
        '<a href="https://github.com/' + GITHUB_USER + '" class="btn-primary-solid" target="_blank" rel="noopener">' +
        '<i class="fa-brands fa-github"></i> View on GitHub</a></div>';
    });
}

/* ── Contact form → mailto ── */
var contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    var name    = document.getElementById('c-name').value;
    var email   = document.getElementById('c-email').value;
    var subject = encodeURIComponent(document.getElementById('c-subject').value || 'Freelance Inquiry');
    var message = document.getElementById('c-message').value;
    var body    = encodeURIComponent('Hi William,\n\n' + message + '\n\n---\nFrom: ' + name + '\nReply-to: ' + email);
    window.location.href = 'mailto:william0friend@outlook.com?subject=' + subject + '&body=' + body;
  });
}
