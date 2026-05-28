/* ════════════════════════════════════════════════════
   modern.js — Animations GSAP · 3D Tilt · Parallax
   ════════════════════════════════════════════════════ */

gsap.registerPlugin(ScrollTrigger);

/* ── NAV scroll state ─────────────────────────────── */
const nav = document.getElementById('mnav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

/* ── HERO — états initiaux (avant la timeline) ────────── */
gsap.set('.word',            { yPercent: 110 });
gsap.set('.hero-eyebrow',   { opacity: 0, y: 24 });
gsap.set('.hero-sub',       { opacity: 0, y: 20 });
gsap.set('.hero-ctas',      { opacity: 0, y: 16 });
gsap.set('.badge',          { opacity: 0, x: 30 });
gsap.set('.scroll-indicator', { opacity: 0 });

/* ── HERO — entrance sequence ─────────────────────── */
const heroTl = gsap.timeline({ delay: 0.2 });

// Eyebrow
heroTl.to('.hero-eyebrow', { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' });

// Nom : mots slide up
heroTl.to('.word', { yPercent: 0, duration: 1.0, stagger: 0.12, ease: 'power4.out' }, '-=0.3');

// Sub
heroTl.to('.hero-sub', { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.5');

// CTAs
heroTl.to('.hero-ctas', { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.4');

// Badges stagger
heroTl.to('.badge', { opacity: 1, x: 0, duration: 0.6, stagger: 0.08, ease: 'power3.out' }, '-=0.6');

// Scroll indicator
heroTl.to('.scroll-indicator', { opacity: 1, duration: 0.5, ease: 'power2.out' }, '-=0.2');

/* ── HERO — parallax on scroll ────────────────────── */
gsap.to('.hero-content', {
  yPercent: 30,
  ease: 'none',
  scrollTrigger: {
    trigger: '#s-hero',
    start: 'top top',
    end: 'bottom top',
    scrub: 1.5,
  }
});
gsap.to('.hero-gradient', {
  yPercent: 20,
  ease: 'none',
  scrollTrigger: {
    trigger: '#s-hero',
    start: 'top top',
    end: 'bottom top',
    scrub: 2,
  }
});
gsap.to('.hero-badges', {
  yPercent: 15,
  ease: 'none',
  scrollTrigger: {
    trigger: '#s-hero',
    start: 'top top',
    end: 'bottom top',
    scrub: 1,
  }
});

/* ── Mouse parallax on orbs ────────────────────────── */
document.addEventListener('mousemove', e => {
  const cx = window.innerWidth / 2;
  const cy = window.innerHeight / 2;
  const dx = (e.clientX - cx) / cx;
  const dy = (e.clientY - cy) / cy;

  document.querySelectorAll('.orb, .badge').forEach(el => {
    const speed = parseFloat(el.dataset.speed || 0.3);
    gsap.to(el, {
      x: dx * 30 * speed,
      y: dy * 20 * speed,
      duration: 1.2,
      ease: 'power2.out',
    });
  });
});

/* ── SECTION parallax backgrounds ─────────────────── */
document.querySelectorAll('.parallax-bg').forEach(bg => {
  const factor = parseFloat(bg.dataset.parallax || -0.2);
  gsap.to(bg, {
    yPercent: factor * 100,
    ease: 'none',
    scrollTrigger: {
      trigger: bg.parentElement,
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1.5,
    }
  });
});

/* ── SCROLL REVEAL (Intersection Observer) ─────────── */
const revealObs = new IntersectionObserver(
  entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        revealObs.unobserve(e.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

document.querySelectorAll('.reveal-up, .reveal-right').forEach(el => {
  revealObs.observe(el);
});

/* ── 3D TILT on hover ──────────────────────────────── */
const MAX_TILT = 10; // degrees

function bindTiltCards() {
  document.querySelectorAll('.tilt-card:not([data-tilt])').forEach(card => {
    card.dataset.tilt = '1';
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const dx = (e.clientX - rect.left - rect.width  / 2) / (rect.width  / 2);
      const dy = (e.clientY - rect.top  - rect.height / 2) / (rect.height / 2);
      gsap.to(card, { rotateY: dx * MAX_TILT, rotateX: -dy * MAX_TILT, translateZ: 16, duration: 0.25, ease: 'power2.out', overwrite: 'auto' });
    });
    card.addEventListener('mouseleave', () => {
      gsap.to(card, { rotateY: 0, rotateX: 0, translateZ: 0, duration: 0.5, ease: 'elastic.out(1, 0.5)', overwrite: 'auto' });
    });
  });
}
bindTiltCards();

/* ── Smooth hero text counter (numbers in eng cards) ─ */
function animateCount(el, target) {
  const obj = { val: 0 };
  gsap.to(obj, {
    val: target,
    duration: 1.5,
    ease: 'power2.out',
    onUpdate() { el.textContent = Math.round(obj.val); },
    scrollTrigger: { trigger: el, start: 'top 80%', once: true }
  });
}
document.querySelectorAll('.eng-kpi span, .proj-stat span').forEach(el => {
  const txt = el.textContent.replace(/[^0-9]/g, '');
  const num = parseInt(txt);
  if (!isNaN(num) && num > 1) animateCount(el, num);
});

/* ── Active nav link on scroll ─────────────────────── */
const sections = document.querySelectorAll('.m-panel[id]');
const navLinks = document.querySelectorAll('.m-nav-links a');

const activeObs = new IntersectionObserver(
  entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        navLinks.forEach(a => {
          a.style.color = a.getAttribute('href') === '#' + e.target.id
            ? 'var(--text)'
            : '';
        });
      }
    });
  },
  { threshold: 0.5 }
);
sections.forEach(s => activeObs.observe(s));

/* ════════════════════════════════════════════════════
   PROJETS — slider + fiche détail
════════════════════════════════════════════════════ */

/* Données enrichies locales (fallback + infos étendues) */
const IMM_PROJECTS = [
  {
    id: 'corpo',
    title: 'Plateforme Corpo OMNES Lyon',
    subtitle: 'Projet phare · jan.–mai 2026',
    description: 'Plateforme web complète pour 6 000+ étudiants sur 5 écoles et 2 campus lyonnais.',
    long_description: 'Développement complet d\'une plateforme web pour la Corpo OMNES Education Lyon. Le projet centralise billetterie (Stripe & SumUp), QR codes dynamiques, fichiers ICS, pass Google Wallet & Apple Wallet. Annuaire interactif des 38 associations, boutique, interface bilingue FR/EN et back-office d\'administration complet pour les équipes bureau.',
    role: 'VP & Développeur principal',
    challenges: [
      'Architecture multi-école : 5 écoles, 2 campus',
      'Intégration multi-paiement : Stripe + SumUp',
      'Pass numériques Apple Wallet & Google Wallet',
      'Back-office pour la gestion des 38 associations',
      'Scalabilité sur les pics événementiels',
    ],
    tags: ['PHP','MySQL','JS','Stripe','SumUp','Apple Wallet'],
    featured: true, image_url: null,
    stats: [{value:'6 000+',label:'étudiants'},{value:'5',label:'écoles'},{value:'38',label:'assos'}],
    color: '#c9a45a', link_live: null, link_github: null,
  },
  {
    id: 'antitriche',
    title: 'Plateforme examen anti-triche',
    subtitle: 'Outil interne JEECE · 2026',
    description: 'Verrouillage fenêtre, limitation IA, contrôle du temps. Adopté pour les recrutements 2026.',
    long_description: 'Outil interne développé pour JEECE permettant de conduire des examens techniques en ligne. Verrouillage du navigateur, détection des tentatives de sortie, limitation des outils d\'IA, minuterie par question, et système de notation automatisé. Officiellement adopté pour tous les recrutements 2026 de la junior-entreprise.',
    role: 'Développeur & Chef de projet',
    challenges: [
      'Verrouillage navigateur sans extension tierce',
      'Détection et journalisation des tentatives de triche',
      'Interface candidat rapide et sans friction',
      'Back-office de correction pour les administrateurs',
    ],
    tags: ['JS','PHP','HTML/CSS'],
    featured: false, image_url: null,
    stats: [{value:'2026',label:'déploiement'}],
    color: '#4a9eff', link_live: null, link_github: null,
  },
  {
    id: 'homenes',
    title: 'Homenes',
    subtitle: 'Logement étudiant · Lyon · 2024',
    description: 'Mise en relation directe entre étudiants pour le logement à Lyon. Canal de confiance.',
    long_description: 'Plateforme de mise en relation directe entre étudiants lyonnais pour la colocation. Homenes permet de poster et trouver des offres sans intermédiaire, avec un système de confiance basé sur la communauté étudiante. Interface mobile-first pensée pour les étudiants en mobilité.',
    role: 'Développeur full-stack',
    challenges: [
      'UX mobile-first pour des étudiants en déplacement',
      'Système de confiance sans données bancaires',
      'Modération des annonces et signalement',
    ],
    tags: ['PHP','MySQL','JS'],
    featured: false, image_url: null, stats: [],
    color: '#ff7b4f', link_live: null, link_github: null,
  },
  {
    id: 'congres',
    title: 'Congrès Régional Centre-Est 2026',
    subtitle: 'Co-org. · nov. 2025 – mars 2026',
    description: 'Co-organisation : 200 étudiants, 24 JE, conférences, ateliers, soirée de gala.',
    long_description: 'Co-organisation du Congrès Régional Centre-Est 2026 du Mouvement des Junior-Entreprises (CNJE). Coordination d\'un événement de 3 jours réunissant 200 étudiants issus de 24 JE de la région. Programme complet : conférences thématiques, ateliers de développement professionnel, soirée de gala. Gestion budget, partenariats et logistique complète.',
    role: 'Co-organisateur principal',
    challenges: [
      'Coordination de 24 Junior-Entreprises sur 5 mois',
      'Logistique pour 200 participants sur 3 jours',
      'Programme : conférences + ateliers + soirée',
      'Négociation partenariats et gestion budgétaire',
    ],
    tags: ['Événementiel','Management','CNJE'],
    featured: false, image_url: null,
    stats: [{value:'200',label:'participants'},{value:'24',label:'JE'},{value:'3',label:'jours'}],
    color: '#a855f7', link_live: null, link_github: null,
  },
];

/* ── Helper : hex → rgba ── */
function hexRgba(hex, a) {
  const r = parseInt(hex.slice(1,3),16);
  const g = parseInt(hex.slice(3,5),16);
  const b = parseInt(hex.slice(5,7),16);
  return `rgba(${r},${g},${b},${a})`;
}

/* ── Render featured project (grand card) ── */
function renderFeatured(p, wrap) {
  const color = p.color || '#c9a45a';
  wrap.innerHTML = `
    <div class="proj-featured tilt-card reveal-up" style="transition-delay:.08s;cursor:pointer" tabindex="0" role="button" aria-label="Ouvrir la fiche : ${p.title}">
      ${p.image_url ? `<div class="proj-feat-img-bg" style="background-image:url('${p.image_url}')"></div>` : ''}
      <div class="proj-feat-left">
        <div class="proj-feat-tag">${p.subtitle||''}</div>
        <h2 class="proj-feat-title">${p.title}</h2>
        <p class="proj-feat-desc">${p.description||''}</p>
        <div class="chip-row" style="margin-bottom:20px">
          ${(p.tags||[]).map(t=>`<span class="mchip dark">${t}</span>`).join('')}
        </div>
        <span class="proj-feat-cta" style="color:${color}">Voir la fiche complète →</span>
      </div>
      ${(p.stats||[]).length ? `
      <div class="proj-feat-right">
        <div class="proj-stats">
          ${p.stats.map(s=>`<div class="proj-stat"><span style="color:${color}">${s.value}</span><em>${s.label}</em></div>`).join('')}
        </div>
      </div>` : ''}
    </div>`;

  const card = wrap.querySelector('.proj-featured');
  const open = () => openPanel(p);
  card.addEventListener('click', open);
  card.addEventListener('keydown', e => { if (e.key==='Enter'||e.key===' ') { e.preventDefault(); open(); } });
  wrap.querySelectorAll('.reveal-up').forEach(el => revealObs.observe(el));
  bindTiltCards();
}

/* ── Build a compact slider card (autres projets) ── */
function buildCard(p) {
  const color = p.color || '#c9a45a';
  const el = document.createElement('div');
  el.className = 'pslide-card tilt-card';
  el.setAttribute('tabindex','0');
  el.setAttribute('role','button');
  el.setAttribute('aria-label',`Ouvrir la fiche : ${p.title}`);
  el.style.setProperty('--card-border-color', hexRgba(color, .5));

  el.innerHTML = `
    <div class="pslide-accent" style="background:${color}"></div>
    <div class="pslide-body">
      <div class="pslide-title">${p.title}</div>
      <div class="pslide-sub">${p.subtitle||''}</div>
      <p class="pslide-desc">${p.description||''}</p>
      <div class="pslide-footer">
        <div class="chip-row">${(p.tags||[]).slice(0,3).map(t=>`<span class="mchip">${t}</span>`).join('')}</div>
        <span class="pslide-cta">Voir <span class="pslide-arrow">→</span></span>
      </div>
    </div>`;

  const open = () => openPanel(p);
  el.addEventListener('click', open);
  el.addEventListener('keydown', e => { if (e.key==='Enter'||e.key===' ') { e.preventDefault(); open(); } });
  return el;
}

/* ── Render compact slider (autres projets) ── */
function renderSlider(projects) {
  const slider = document.getElementById('proj-slider');
  const dotsEl = document.getElementById('slider-dots');
  if (!slider || !projects.length) return;

  slider.innerHTML = '';
  projects.forEach(p => slider.appendChild(buildCard(p)));

  // Dots
  dotsEl.innerHTML = '';
  projects.forEach((_, i) => {
    const d = document.createElement('button');
    d.className = 'sdot' + (i===0?' active':'');
    d.setAttribute('aria-label',`Projet ${i+1}`);
    d.addEventListener('click', () => goToSlide(i));
    dotsEl.appendChild(d);
  });

  slider.addEventListener('scroll', () => updateDots(getActiveIdx()), { passive:true });
  document.getElementById('slider-prev').onclick = () => goToSlide(Math.max(0, getActiveIdx()-1));
  document.getElementById('slider-next').onclick = () => goToSlide(Math.min(projects.length-1, getActiveIdx()+1));

  // Drag-to-scroll
  let isDown=false, startX=0, scrollL=0;
  slider.addEventListener('mousedown', e => { isDown=true; slider.classList.add('grabbing'); startX=e.pageX-slider.offsetLeft; scrollL=slider.scrollLeft; e.preventDefault(); });
  ['mouseup','mouseleave'].forEach(ev => slider.addEventListener(ev, () => { isDown=false; slider.classList.remove('grabbing'); }));
  slider.addEventListener('mousemove', e => { if(!isDown) return; slider.scrollLeft = scrollL-(e.pageX-slider.offsetLeft-startX)*1.5; });

  bindTiltCards();
}

function getActiveIdx() {
  const slider = document.getElementById('proj-slider');
  if (!slider) return 0;
  const cards = [...slider.querySelectorAll('.pslide-card')];
  const sLeft = slider.scrollLeft;
  let best=0, minD=Infinity;
  cards.forEach((c,i) => { const d=Math.abs(c.offsetLeft-sLeft); if(d<minD){minD=d;best=i;} });
  return best;
}

function goToSlide(i) {
  const slider = document.getElementById('proj-slider');
  const cards  = slider?.querySelectorAll('.pslide-card');
  if (cards?.[i]) slider.scrollTo({ left: cards[i].offsetLeft, behavior:'smooth' });
  updateDots(i);
}

function updateDots(active) {
  document.querySelectorAll('.sdot').forEach((d,i) => d.classList.toggle('active', i===active));
}

/* ════════════════════════════════════════════════════
   FICHE DÉTAIL — PANEL GSAP
════════════════════════════════════════════════════ */
let _panelOpen = false;

function openPanel(p) {
  if (_panelOpen) return;
  _panelOpen = true;

  const panel   = document.getElementById('proj-panel');
  const overlay = document.getElementById('proj-panel-overlay');
  const content = document.getElementById('proj-panel-content');

  content.innerHTML = buildPanelHTML(p);

  document.body.style.overflow = 'hidden';
  overlay.classList.add('active');
  panel.setAttribute('aria-hidden','false');

  gsap.set(panel, { display:'flex', x:'100%' });
  gsap.to(panel, { x:0, duration:0.55, ease:'power4.out' });
  gsap.fromTo('.ppanel-item',
    { opacity:0, y:16 },
    { opacity:1, y:0, stagger:0.055, duration:0.45, ease:'power3.out', delay:0.28 }
  );
}

function closePanel() {
  if (!_panelOpen) return;
  const panel   = document.getElementById('proj-panel');
  const overlay = document.getElementById('proj-panel-overlay');

  overlay.classList.remove('active');
  gsap.to(panel, { x:'100%', duration:0.4, ease:'power3.in', onComplete() {
    gsap.set(panel,{display:'none'});
    document.getElementById('proj-panel-content').innerHTML = '';
    panel.setAttribute('aria-hidden','true');
    _panelOpen = false;
  }});
  document.body.style.overflow = '';
}

function buildPanelHTML(p) {
  const c = p.color || '#c9a45a';
  const SVG_EXT  = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>`;
  const SVG_GH   = `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>`;

  const stats = (p.stats||[]).length ? `
    <div class="ppanel-item ppanel-stats">
      ${p.stats.map(s=>`<div class="ppanel-stat">
        <span class="ppanel-stat-val" style="color:${c}">${s.value}</span>
        <em class="ppanel-stat-lbl">${s.label}</em>
      </div>`).join('')}
    </div>` : '';

  const role = p.role ? `
    <div class="ppanel-item">
      <div class="ppanel-stitle">Mon rôle</div>
      <div class="ppanel-role" style="border-color:${c}">${p.role}</div>
    </div>` : '';

  const challenges = (p.challenges||[]).length ? `
    <div class="ppanel-item">
      <div class="ppanel-stitle">Défis techniques & organisationnels</div>
      <ul class="ppanel-challenges">
        ${p.challenges.map(ch=>`<li>${ch}</li>`).join('')}
      </ul>
    </div>` : '';

  const links = (p.link_live||p.link_github) ? `
    <div class="ppanel-item ppanel-links">
      ${p.link_live ? `<a href="${p.link_live}" target="_blank" rel="noopener" class="ppanel-link">${SVG_EXT} Voir le projet</a>` : ''}
      ${p.link_github ? `<a href="${p.link_github}" target="_blank" rel="noopener" class="ppanel-link">${SVG_GH} GitHub</a>` : ''}
    </div>` : '';

  return `
    <div class="ppanel-accent ppanel-item" style="background:${c}"></div>
    <div class="ppanel-eyebrow ppanel-item">${p.subtitle||''}</div>
    <h2 class="ppanel-title ppanel-item">${p.title}</h2>
    <div class="ppanel-tags ppanel-item chip-row">
      ${(p.tags||[]).map(t=>`<span class="mchip dark">${t}</span>`).join('')}
    </div>
    ${stats}
    <div class="ppanel-item ppanel-desc">${(p.long_description||p.description||'').replace(/\n/g,'<br>')}</div>
    ${role}
    ${challenges}
    ${links}`;
}

/* ── Panel event listeners ── */
document.getElementById('proj-panel-close')?.addEventListener('click', closePanel);
document.getElementById('proj-panel-overlay')?.addEventListener('click', closePanel);
document.addEventListener('keydown', e => { if (e.key==='Escape' && _panelOpen) closePanel(); });

/* ── Fetch depuis Supabase puis render ── */
async function fetchAndRenderProjects() {
  let projects = IMM_PROJECTS;

  const notConfigured = typeof _supabase === 'undefined' ||
    typeof SUPABASE_URL === 'undefined' || SUPABASE_URL.includes('REMPLACE');

  if (!notConfigured) {
    try {
      const { data, error } = await _supabase
        .from('projects').select('*').order('display_order', { ascending:true });
      if (!error && data?.length) {
        // Merge DB data (titre, image, tags…) avec données locales enrichies
        projects = data.map(db => {
          const local = IMM_PROJECTS.find(l => l.title===db.title || l.id===db.id);
          return { ...local, ...db, color: local?.color || '#c9a45a' };
        });
      }
    } catch (_) {}
  }

  const featured = projects.find(p => p.featured) || projects[0];
  const others   = projects.filter(p => p !== featured);

  const featWrap = document.getElementById('proj-featured-wrap');
  if (featured && featWrap) renderFeatured(featured, featWrap);

  const othersOuter = document.getElementById('proj-others-outer');
  if (others.length && othersOuter) {
    othersOuter.style.display = '';
    renderSlider(others);
  } else if (othersOuter) {
    othersOuter.style.display = 'none';
  }
}

fetchAndRenderProjects();
