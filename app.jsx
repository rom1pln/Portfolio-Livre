/* Main app - scroll-driven cinematic portfolio book */

const { useEffect, useRef, useState, useMemo, useCallback } = React;

/* utilities */
const clamp = (v, lo = 0, hi = 1) => Math.max(lo, Math.min(hi, v));
const lerp = (a, b, t) => a + (b - a) * t;
const phase = (t, a, b) => clamp((t - a) / (b - a), 0, 1);
const easeInOut = (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);
const easeOut = (t) => 1 - Math.pow(1 - t, 3);

/* ------------ DESK SCENE ------------- */
function DeskScene() {
  return (
    <div className="desk-scene" id="desk-scene">
      <div className="desk"></div>
      <div className="lamp-pool"></div>

      {/* Architect-style desk lamp - drawn as a single SVG silhouette */}
      <svg className="lamp-svg" viewBox="0 0 240 340" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="lampShade" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#3a2a1f"/>
            <stop offset="50%" stopColor="#1f1510"/>
            <stop offset="100%" stopColor="#0a0604"/>
          </linearGradient>
          <radialGradient id="lampGlow" cx="0.5" cy="0.2" r="0.6">
            <stop offset="0%" stopColor="#ffe5b0" stopOpacity="0.95"/>
            <stop offset="60%" stopColor="#f4c47a" stopOpacity="0.3"/>
            <stop offset="100%" stopColor="#f4c47a" stopOpacity="0"/>
          </radialGradient>
        </defs>
        {/* Base */}
        <ellipse cx="120" cy="325" rx="50" ry="9" fill="#1a1108"/>
        <ellipse cx="120" cy="320" rx="44" ry="7" fill="#2a1b14"/>
        {/* Arm - two segments with elbow */}
        <line x1="120" y1="315" x2="160" y2="200" stroke="#1a1108" strokeWidth="4" strokeLinecap="round"/>
        <line x1="160" y1="200" x2="100" y2="100" stroke="#1a1108" strokeWidth="4" strokeLinecap="round"/>
        {/* Elbow joint */}
        <circle cx="160" cy="200" r="6" fill="#2a1b14" stroke="#0a0604" strokeWidth="1"/>
        <circle cx="120" cy="315" r="5" fill="#2a1b14"/>
        {/* Lampshade - conical */}
        <path d="M 60 60 L 140 60 L 165 115 L 35 115 Z" fill="url(#lampShade)" stroke="#0a0604" strokeWidth="1.5"/>
        {/* Inner glow */}
        <ellipse cx="100" cy="115" rx="60" ry="8" fill="url(#lampGlow)"/>
        {/* Top cap */}
        <rect x="65" y="56" width="70" height="6" fill="#0a0604" rx="2"/>
      </svg>

      {/* notebook bottom-left */}
      <div className="obj notebook"></div>

      {/* schema notes top-mid */}
      <div className="obj schema">
        <svg viewBox="0 0 280 200" preserveAspectRatio="none">
          <g stroke="#f1e8d6" strokeWidth="0.6" fill="none" opacity="0.55">
            <rect x="20" y="20" width="60" height="40" />
            <rect x="120" y="20" width="60" height="40" />
            <rect x="220" y="20" width="40" height="40" />
            <line x1="80" y1="40" x2="120" y2="40" />
            <line x1="180" y1="40" x2="220" y2="40" />
            <line x1="50" y1="60" x2="50" y2="120" />
            <rect x="20" y="120" width="80" height="40" />
            <line x1="100" y1="140" x2="200" y2="140" />
            <circle cx="220" cy="140" r="12" />
            <text x="22" y="38" fontSize="6" fill="#f1e8d6" fontFamily="monospace">stripe</text>
            <text x="122" y="38" fontSize="6" fill="#f1e8d6" fontFamily="monospace">sumup</text>
            <text x="222" y="38" fontSize="6" fill="#f1e8d6" fontFamily="monospace">qr</text>
            <text x="22" y="138" fontSize="6" fill="#f1e8d6" fontFamily="monospace">mysql</text>
            <text x="208" y="142" fontSize="5" fill="#f1e8d6" fontFamily="monospace">api</text>
          </g>
        </svg>
      </div>

      {/* post-it top-right */}
      <div className="obj postit">
        ne pas oublier&nbsp;:<br/>
        → audit RFP<br/>
        → relancer CR
      </div>

      {/* pen */}
      <div className="obj pen"></div>

      {/* CV - id used for camera target */}
      <div className="cv" id="cv">
        <h4>Romain Plane</h4>
        <div className="role">Étudiant Ingénieur · ECE Lyon</div>
        <div className="line"></div>
        <div className="sec-title">Formation</div>
        <div className="row"><span className="t">2023-29</span><span>ECE Lyon · Diplôme d'ingénieur</span></div>
        <div className="sec-title">Mandats</div>
        <div className="row"><span className="t">Corpo</span><span>Vice-Président · Trésorier · OMNES Lyon</span></div>
        <div className="row"><span className="t">JEECE</span><span>Resp. Intervenants · CA · Référent Lyon</span></div>
        <div className="row"><span className="t">CNJE</span><span>Auditeur-Conseil · Formateur RFP</span></div>
        <div className="sec-title">Expérience</div>
        <div className="row"><span className="t">2025</span><span>CGI - Conseil · Data · Projet</span></div>
        <div className="sec-title">Stack</div>
        <div style={{ fontSize: 11.5, marginTop: 3 }}>
          HTML · CSS · JS · PHP · MySQL · Python · C ·<br/>
          SQL · Power BI · Azure · Stripe · SumUp · Git
        </div>
        <div className="line"></div>
        <div style={{ fontSize: 11, fontStyle: "italic", color: "#6a513a" }}>
          romain.plane@edu.ece.fr - Lyon, France
        </div>

        <button className="cv-download" id="cv-dl">↓ Télécharger mon CV</button>
      </div>

      {/* Business card */}
      <div className="card">
        <div className="name">Romain Plane</div>
        <div style={{ fontSize: 9, opacity: 0.7, letterSpacing: "0.18em", textTransform: "uppercase" }}>
          Étudiant ingénieur - ECE Lyon
        </div>
        <div className="links">
          <span>in · linkedin.com/in/romain-plane</span>
          <span>⌥ · https://github.com/rom1pln</span>
          <span>✉ · romain.plane@edu.ece.fr</span>
        </div>
      </div>

      {/* Book 1 - the main story */}
      <Book
        bookId="1"
        pages={window.PAGE_LIST}
        title="Romain<br/>Plane"
        subtitle="- Etudiant ingénieur -"
        motto={<>"Un livre n'est pas fini<br/>tant qu'on le tient ouvert."</>}
        ledeLines={<>"Étudiant ingénieur,<br/>entrepreneur associatif,<br/>et bâtisseur de plateformes digitales."</>}
        infoLine={<>Ce livre rassemble - chapitre après chapitre - les projets, les responsabilités et les apprentissages d'un parcours en cours.</>}
      />

      {/* Bookshelf - backdrop for book 2 */}
      <Bookshelf />

      {/* Book 2 - the projects (emerges from the shelf) */}
      <Book
        bookId="2"
        pages={window.PROJECT_PAGES}
        title="Carnet<br/>de projets"
        subtitle="- Études de cas -"
        motto={<>"Concevoir, livrer,<br/>mesurer, recommencer."</>}
        ledeLines={<>"De la billetterie d'événements aux outils internes&nbsp;: <br/>quelques projets racontés en détail."</>}
        infoLine={<>Chaque double-page documente un projet&nbsp;: contexte, rôle, problématique, solution, technologies et impact.</>}
        finalLine="- Vol. II · MMXXVI -"
      />

      {/* vignette + grain */}
      <div className="vignette"></div>
      <div className="grain"></div>
    </div>
  );
}

/* ------------ BOOKSHELF ------------- */
function Bookshelf() {
  // Curated spines - each is a tall colored rectangle with a small label
  const spines = [
    { c: "#3a2a1f", h: 350, w: 38, t: "Lyon" },
    { c: "#2a1810", h: 380, w: 52, t: "Atlas" },
    { c: "#4a2c1a", h: 320, w: 30, t: "" },
    { c: "#1a2a3a", h: 360, w: 46, t: "Code" },
    { c: "#2a3a2a", h: 380, w: 34, t: "Arch." },
    { c: "#5a3a1a", h: 340, w: 40, t: "ECE" },
    { c: "#1a1a2a", h: 370, w: 48, t: "Design" },
    { c: "#0e1828", h: 360, w: 36, t: "Web" },
    { c: "#3a2a1a", h: 350, w: 42, t: "Notes" },
    { c: "#2a1a2a", h: 380, w: 30, t: "" },
    { c: "#3a2a1f", h: 330, w: 44, t: "Audit" },
  ];

  return (
    <div className="bookshelf" id="bookshelf">
      {/* top molding */}
      <div className="shelf-top"></div>

      {/* shelf 1 (upper) */}
      <div className="shelf-row">
        <div className="shelf-board"></div>
        <div className="shelf-books">
          {spines.slice(0, 6).map((s, i) => (
            <div key={i} className="spine" style={{
              background: `linear-gradient(90deg, rgba(0,0,0,0.4), ${s.c} 30%, ${s.c} 70%, rgba(0,0,0,0.4))`,
              height: s.h, width: s.w,
              boxShadow: "inset 0 0 8px rgba(0,0,0,0.4)",
            }}>
              {s.t && <span className="spine-label">{s.t}</span>}
            </div>
          ))}
        </div>
      </div>

      {/* shelf 2 (where book 2 sits - gap visible) */}
      <div className="shelf-row">
        <div className="shelf-board"></div>
        <div className="shelf-books">
          {spines.slice(6, 9).map((s, i) => (
            <div key={i} className="spine" style={{
              background: `linear-gradient(90deg, rgba(0,0,0,0.4), ${s.c} 30%, ${s.c} 70%, rgba(0,0,0,0.4))`,
              height: s.h, width: s.w,
              boxShadow: "inset 0 0 8px rgba(0,0,0,0.4)",
            }}>
              {s.t && <span className="spine-label">{s.t}</span>}
            </div>
          ))}
          {/* gap where book 2 came from - slot marker */}
          <div className="spine-slot" id="spine-slot">
            <span className="spine-slot-label">Vol. II</span>
          </div>
          {spines.slice(9).map((s, i) => (
            <div key={`r-${i}`} className="spine" style={{
              background: `linear-gradient(90deg, rgba(0,0,0,0.4), ${s.c} 30%, ${s.c} 70%, rgba(0,0,0,0.4))`,
              height: s.h, width: s.w,
              boxShadow: "inset 0 0 8px rgba(0,0,0,0.4)",
            }}>
              {s.t && <span className="spine-label">{s.t}</span>}
            </div>
          ))}
        </div>
      </div>

      {/* base molding */}
      <div className="shelf-base"></div>
    </div>
  );
}
function Book({ bookId, pages, title, subtitle, motto, ledeLines, infoLine, finalLine }) {
  const totalLeaves = Math.ceil(pages.length / 2);

  // Compose pairs: each leaf holds [frontPage, backPage]
  const leaves = useMemo(() => {
    const out = [];
    for (let i = 0; i < pages.length; i += 2) {
      out.push([pages[i], pages[i + 1] || null]);
    }
    return out;
  }, [pages]);

  return (
    <div className={`book-wrap book-wrap-${bookId}`} id={`book-wrap-${bookId}`}>
      <div className="book" id={`book-${bookId}`}>
        {/* page block - paper stack visible at the right half (where pages live) */}
        <div className="body"></div>
        <div className="spine"></div>

        {/* back cover - sits at right half BEHIND all pages; revealed at the end */}
        <div className="cover cover-back" id={`cover-back-${bookId}`}>
          <div className="face" style={{ display:"flex", alignItems:"center", justifyContent:"center", flexDirection:"column", padding: 40,
                                          background: "linear-gradient(160deg, #f1e8d6 0%, #e0d2b2 100%)" }}>
            <div className="page-eyebrow" style={{ marginBottom: 18 }}>- Ex Libris -</div>
            <div style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: 16, color: "#3d2a1f", textAlign:"center", lineHeight: 1.5 }}>
              {motto}
            </div>
            <div className="signature" style={{ marginTop: 26 }}>R. P.</div>
            <div className="muted" style={{ fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", marginTop: 8 }}>
              {finalLine || "- Lyon · MMXXVI -"}
            </div>
          </div>
        </div>

        {/* pages stack */}
        <div className="pages">
          {leaves.map(([frontPage, backPage], i) => (
            <div className="page-leaf" key={i} id={`leaf-${bookId}-${i}`} data-book={bookId} data-leaf={i}>
              <div className="face">
                {frontPage && frontPage.render()}
              </div>
              <div className="face back">
                {backPage && backPage.render()}
              </div>
            </div>
          ))}
        </div>

        {/* front cover */}
        <div className="cover cover-front" id={`cover-front-${bookId}`}>
          <div className="face">
            <div className="gilt"></div>
            <div className="title" dangerouslySetInnerHTML={{ __html: title }}></div>
            <div className="subtitle">{subtitle}</div>
            <div className="crest">ECE Lyon · MMXXVI</div>
          </div>
          <div className="face back-of-cover" style={{ padding: 40 }}>
            <div className="page-eyebrow">- Ex Libris -</div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 17, fontStyle: "italic", color: "#3d2a1f", marginTop: 20, lineHeight: 1.5 }}>
              {ledeLines}
            </div>
            <div style={{ marginTop: 30, fontSize: 11, color: "#6a513a", lineHeight: 1.6 }}>
              {infoLine}
            </div>
            <div className="signature" style={{ position: "absolute", bottom: 60, right: 36 }}>R. P.</div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------ CHAPTER HUD ------------- */
function ChapterHud({ num, name, total }) {
  return (
    <div className="chapter-hud">
      <div>
        <span className="num">{num}</span>
        <span className="of"> / {String(total).padStart(2, "0")}</span>
      </div>
      <div className="name">{name}</div>
    </div>
  );
}

/* ------------ TOP NAV ------------- */
function TopNav({ jumpTo }) {
  const items = [
    ["Accueil", 0],
    ["Parcours", 0.38],
    ["Engagement", 0.43],
    ["JEECE", 0.48],
    ["Compétences", 0.52],
    ["Projets", 0.70],
    ["Contact", 0.98],
  ];
  return (
    <>
      <div className="brand-mark">R<span className="dot">·</span>P</div>
      <nav className="topnav" role="navigation" aria-label="Navigation principale">
        {items.map(([label, t]) => (
          <button key={label} onClick={() => jumpTo(t)}>{label}</button>
        ))}
        <button className="cta" onClick={() => jumpTo(0.16)}>↓ CV</button>
      </nav>
    </>
  );
}

/* ------------ SIDE PANEL (projects detail) ------------- */
const PROJECTS = {
  homenes: {
    title: "Homenes",
    sub: "Mise en relation logement étudiant",
    context: "Beaucoup de nouveaux étudiants arrivent à Lyon sans réseau local et galèrent à trouver un logement abordable. Homenes propose un canal direct et de confiance.",
    role: "Conception produit, développement web",
    problem: "Réduire le temps et la friction pour trouver un appartement quand on arrive à Lyon, en évitant les arnaques fréquentes des plateformes généralistes.",
    solution: "Site web simple permettant aux nouveaux étudiants de se mettre en relation avec des étudiants déjà installés (chambre libre, colocation, recommandations de quartier).",
    tech: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
    impact: "Premières mises en relation lors de la rentrée 2024.",
  },
  digiwake: {
    title: "Digiwake",
    sub: "Projet ECE - 1ʳᵉ année cycle ingénieur",
    context: "Projet d'application de l'année - ECE Lyon, cycle ingénieur.",
    role: "Conception, développement, présentation",
    problem: "Mobiliser les compétences techniques acquises dans un projet de groupe à fort enjeu d'évaluation.",
    solution: "Conception et développement d'un produit de bout en bout, du cadrage à la démonstration finale.",
    tech: ["C", "Python", "Électronique"],
    impact: "Validation du module projet - première expérience d'équipe complète.",
  },
  congres: {
    title: "Congrès Régional de Printemps - Centre-Est 2026",
    sub: "Événementiel · JEECE · 200 étudiants · 24 écoles",
    context: "Le Congrès Régional de Printemps est le rendez-vous des Junior-Entreprises du Centre-Est. JEECE Lyon a accueilli l'édition 2026.",
    role: "Co-organisation, coordination logistique",
    problem: "Accueillir près de 200 étudiants membres de 24 Junior-Entreprises sur une journée complète : conférences, ateliers, networking, soirée.",
    solution: "Pilotage de la logistique, des partenaires, de la communication et du déroulé de l'événement, en lien avec la CNJE.",
    tech: ["Gestion projet", "Partenariats", "Logistique", "Communication"],
    impact: "Édition réussie, retours positifs des Junior-Entreprises participantes.",
  },
};

function SidePanel({ open, projKey, onClose }) {
  const p = projKey ? PROJECTS[projKey] : null;
  return (
    <aside className={`side-panel ${open ? "open" : ""}`} aria-hidden={!open}>
      <button className="close" onClick={onClose} aria-label="Fermer">×</button>
      {p && (
        <>
          <div className="page-eyebrow">Projet</div>
          <h3>{p.title}</h3>
          <div className="sub">{p.sub}</div>
          <h4>Contexte</h4>
          <p>{p.context}</p>
          <h4>Rôle</h4>
          <p>{p.role}</p>
          <h4>Problématique</h4>
          <p>{p.problem}</p>
          <h4>Solution</h4>
          <p>{p.solution}</p>
          <h4>Technologies / compétences</h4>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {p.tech.map(t => <span key={t} className="chip">{t}</span>)}
          </div>
          <h4>Impact</h4>
          <p>{p.impact}</p>
        </>
      )}
    </aside>
  );
}

/* ============================================================
   ANIMATION DIRECTOR - listens to scroll and pilots the scene
   ============================================================ */
function useScrollDirector(animationsOn) {
  const [chapterInfo, setChapterInfo] = useState({ num: "00", name: "Préambule", total: window.PAGE_LIST.length });
  const progressRef = useRef(0);

  useEffect(() => {
    const rig = document.querySelector(".scroll-rig");
    const deskEl = document.getElementById("desk-scene");
    const cvEl = document.getElementById("cv");
    const cvDl = document.getElementById("cv-dl");
    const hero = document.getElementById("hero-name");
    const scrollCue = document.getElementById("scroll-cue");
    const fill = document.getElementById("scroll-fill");

    // Camera offset to bring book 2 into view
    const BOOK_2_OFFSET_X = 1600;

    // Per-book config + DOM refs
    const books = [
      {
        id: "1",
        baseX: 0,
        openStart: 0.30, openEnd: 0.36,
        pagesStart: 0.36, pagesEnd: 0.56,
        dodgeCV: true,
      },
      {
        id: "2",
        baseX: BOOK_2_OFFSET_X,
        openStart: 0.66, openEnd: 0.72,
        pagesStart: 0.72, pagesEnd: 0.96,
        dodgeCV: false,
      },
    ];
    books.forEach(b => {
      b.wrapEl = document.getElementById(`book-wrap-${b.id}`);
      b.coverFront = document.getElementById(`cover-front-${b.id}`);
      b.coverFrontFaces = b.coverFront ? b.coverFront.querySelectorAll(".face") : [];
      b.leaves = document.querySelectorAll(`[data-book="${b.id}"]`);
      b.numLeaves = b.leaves.length;
      b.leafFaces = Array.from(b.leaves).map(l => l.querySelectorAll(".face"));
      b.spine = b.wrapEl ? b.wrapEl.querySelector(".spine") : null;
    });

    if (!rig || !deskEl) return;

    const W = () => window.innerWidth;
    const H = () => window.innerHeight;

    let raf = 0;
    const tick = () => {
      const rect = rig.getBoundingClientRect();
      const total = rect.height - H();
      const p = clamp(-rect.top / total, 0, 1);
      progressRef.current = p;
      if (fill) fill.style.height = (p * 100) + "%";

      /* ---------- global phases ---------- */
      const P_HERO_END   = 0.06;
      const P_CV_IN      = 0.13;
      const P_CV_HOLD    = 0.18;
      const P_CV_OUT     = 0.24;
      const P_PAN_START  = 0.58;
      const P_PAN_END    = 0.66;
      const P_END        = 1.00;

      // hero opacity
      if (hero) {
        const heroOp = 1 - phase(p, 0.02, 0.07);
        hero.style.opacity = heroOp;
        hero.style.transform = `translateX(-50%) translateY(${ -10 * (1 - heroOp) }px)`;
      }
      if (scrollCue) scrollCue.style.opacity = (1 - phase(p, 0.01, 0.05)) * 0.7;

      // CV download button
      if (cvDl) {
        const cvFocus = phase(p, P_CV_IN, P_CV_HOLD) * (1 - phase(p, P_CV_HOLD + 0.02, P_CV_OUT));
        cvDl.classList.toggle("show", cvFocus > 0.5);
      }

      // camera state
      let tx = 0, ty = 0, tz = 0, sx = 1, rx = 0, ry = 0;

      // hero settle
      const heroT = phase(p, 0, P_HERO_END);
      ty += lerp(20, 0, easeOut(heroT));
      sx *= lerp(0.95, 1.0, easeOut(heroT));
      rx += lerp(2, 0, easeOut(heroT));

      // CV zoom
      const cvT = phase(p, P_HERO_END, P_CV_IN);
      const cvOut = phase(p, P_CV_HOLD + 0.01, P_CV_OUT);
      const cvCenterX = 0.78 * W();
      const cvCenterY = 0.46 * H();
      const cvFocusAmt = easeInOut(cvT) - easeInOut(cvOut);
      const cvFinalScale = 1.15;
      const focusScale = lerp(1, cvFinalScale, cvFocusAmt);
      tx += -(cvCenterX - W() / 2) * cvFinalScale * cvFocusAmt;
      ty += -(cvCenterY - H() / 2) * cvFinalScale * cvFocusAmt;
      sx *= focusScale;
      rx += -1.5 * cvFocusAmt;

      // gentle tilt while reading any book
      const bookCloseupT = phase(p, P_CV_OUT, 0.30);
      rx += lerp(0, 5, easeInOut(bookCloseupT));
      ty += lerp(0, 6, easeInOut(bookCloseupT));

      // pan to book 2
      const panT = phase(p, P_PAN_START, P_PAN_END);
      tx += -BOOK_2_OFFSET_X * easeInOut(panT);

      // gentle breathing during page turns
      const allPagesT = phase(p, books[0].pagesStart, books[1].pagesEnd);
      sx *= 1 + Math.sin(allPagesT * Math.PI * 4) * 0.008;

      // final pullback
      const endT = phase(p, books[1].pagesEnd, P_END);
      sx *= lerp(1, 0.94, endT);
      ty += lerp(0, -8, endT);

      deskEl.style.transform =
        `translate3d(${tx}px, ${ty}px, ${tz}px) scale(${sx}) rotateX(${rx}deg) rotateY(${ry}deg)`;

      /* ---------- per-book transforms ---------- */
      books.forEach(b => {
        // cover open
        const coverT = phase(p, b.openStart, b.openEnd);
        const coverRot = lerp(0, -180, easeInOut(coverT));
        if (b.coverFront) {
          const coverZ = lerp(40, 0, easeInOut(coverT));
          const liftZ = Math.sin(coverT * Math.PI) * 16;
          b.coverFront.style.transform = `translateZ(${coverZ + liftZ}px) rotateY(${coverRot}deg)`;
          if (b.coverFrontFaces.length >= 2) {
            const showOuter = Math.abs(coverRot) < 90;
            b.coverFrontFaces[0].classList.toggle("hide-face", !showOuter);
            b.coverFrontFaces[1].classList.toggle("hide-face", showOuter);
          }
        }

        // wrap shift: closed cover sits in right half of book, so we push left by 250
        // to visually center it; as it opens, the open spread is centered naturally.
        const bookShiftAmt = phase(p, P_CV_OUT, b.openStart);
        let wrapShift = lerp(-250, 0, easeInOut(bookShiftAmt));
        if (b.dodgeCV) wrapShift += -180 * cvFocusAmt;

        // Book 2 emerges from the bookshelf during the pan phase
        let extraY = 0, extraScale = 1, extraRotZ = 0, extraOpacity = 1;
        if (b.id === "2") {
          const emergeT = phase(p, P_PAN_START - 0.02, P_PAN_END);
          // Before pan starts → hide book 2 behind the shelf
          if (emergeT === 0) extraOpacity = 0;
          else extraOpacity = 1;
          // Animate from shelf position (high up, smaller, slight tilt) to rest position
          extraY = lerp(-280, 0, easeInOut(emergeT));
          extraScale = lerp(0.55, 1, easeInOut(emergeT));
          extraRotZ = lerp(-6, 0, easeInOut(emergeT));
        }

        if (b.wrapEl) {
          b.wrapEl.style.transform =
            `translate(calc(-50% + ${b.baseX + wrapShift}px), calc(-50% + ${extraY}px))` +
            ` scale(${extraScale}) rotate(${extraRotZ}deg)`;
          b.wrapEl.style.opacity = extraOpacity;
        }

        if (b.spine) b.spine.style.opacity = clamp(coverT * 2.5, 0, 1);

        // pages
        const turnSpan = b.pagesEnd - b.pagesStart;
        const perLeaf = turnSpan / b.numLeaves;
        const turnFrac = 0.6;
        const zStep = 2;
        b.leaves.forEach((leaf, i) => {
          const start = b.pagesStart + i * perLeaf;
          const end = start + perLeaf * turnFrac;
          const t = phase(p, start, end);
          const rot = lerp(0, -180, easeInOut(t));
          const zClosed = (b.numLeaves - i) * zStep;
          const zOpen = (i + 1) * zStep;
          const baseZ = lerp(zClosed, zOpen, t);
          const liftZ = Math.sin(t * Math.PI) * 14;
          leaf.style.transform = `translateZ(${baseZ + liftZ}px) rotateY(${rot}deg)`;
          const faces = b.leafFaces[i];
          if (faces && faces.length >= 2) {
            const showFront = Math.abs(rot) < 90;
            faces[0].classList.toggle("hide-face", !showFront);
            faces[1].classList.toggle("hide-face", showFront);
          }
        });
      });

      /* ---------- chapter HUD ---------- */
      let hudLabel;
      if (p < 0.05) hudLabel = { name: "Préambule", num: "00" };
      else if (p < P_CV_OUT - 0.01) hudLabel = { name: "Curriculum Vitae", num: "-" };
      else if (p < books[0].openEnd) hudLabel = { name: "Tome I · Le parcours", num: "I" };
      else if (p < P_PAN_START) {
        const into = phase(p, books[0].pagesStart, books[0].pagesEnd);
        const idx = Math.min(Math.floor(into * window.PAGE_LIST.length), window.PAGE_LIST.length - 1);
        const pg = window.PAGE_LIST[idx];
        hudLabel = { name: pg ? pg.chapter : "-", num: String(idx + 1).padStart(2, "0") };
      }
      else if (p < books[1].openEnd) hudLabel = { name: "Tome II · Carnet de projets", num: "II" };
      else {
        const into = phase(p, books[1].pagesStart, books[1].pagesEnd);
        const idx = Math.min(Math.floor(into * window.PROJECT_PAGES.length), window.PROJECT_PAGES.length - 1);
        const pg = window.PROJECT_PAGES[idx];
        hudLabel = { name: pg ? pg.chapter : "-", num: String(idx + 1).padStart(2, "0") };
      }
      setChapterInfo(c => (c.num === hudLabel.num && c.name === hudLabel.name ? c : { ...hudLabel, total: window.PAGE_LIST.length + window.PROJECT_PAGES.length }));

      raf = requestAnimationFrame(tick);
    };

    if (animationsOn) {
      raf = requestAnimationFrame(tick);
    } else {
      tick();
      cancelAnimationFrame(raf);
    }

    return () => cancelAnimationFrame(raf);
  }, [animationsOn]);

  return chapterInfo;
}

/* ------------ MAIN APP ------------- */
function App() {
  const [t, setTweak] = useTweaks(window.TWEAK_DEFAULTS);
  const animationsOn = t.animations !== false;
  const chapterInfo = useScrollDirector(animationsOn);

  const [panelOpen, setPanelOpen] = useState(false);
  const [projKey, setProjKey] = useState(null);

  // delegate clicks on project cards
  useEffect(() => {
    const onClick = (e) => {
      const card = e.target.closest("[data-proj]");
      if (card) {
        setProjKey(card.getAttribute("data-proj"));
        setPanelOpen(true);
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  const jumpTo = useCallback((targetProgress) => {
    const rig = document.querySelector(".scroll-rig");
    if (!rig) return;
    const total = rig.getBoundingClientRect().height - window.innerHeight;
    window.scrollTo({ top: targetProgress * total, behavior: "smooth" });
  }, []);

  // apply accent override
  useEffect(() => {
    if (t.accent) document.documentElement.style.setProperty("--accent", t.accent);
  }, [t.accent]);

  return (
    <>
      <TopNav jumpTo={jumpTo} />

      <ChapterHud {...chapterInfo} />

      <div className="scroll-bar"><div className="fill" id="scroll-fill"></div></div>

      <div className="scroll-rig">
        <div className="stage">
          <div className="scroll-cue" id="scroll-cue">scroll · pour ouvrir le livre ↓</div>

          <DeskScene />
        </div>
      </div>

      <SidePanel open={panelOpen} projKey={projKey} onClose={() => setPanelOpen(false)} />

      <PortfolioTweaks t={t} setTweak={setTweak} />

      {/* mobile fallback */}
      <MobileShell />
    </>
  );
}

function MobileShell() {
  return (
    <div className="mobile-shell">

      {/* ── Header sticky ── */}
      <header className="mob-header">
        <div className="mob-brand">R<span>·</span>P</div>
        <nav className="mob-nav">
          <a href="#mob-parcours">Parcours</a>
          <a href="#mob-projets">Projets</a>
          <a href="#mob-contact">Contact</a>
          <a href="#mob-contact" className="mob-cv-btn">↓ CV</a>
        </nav>
      </header>

      {/* ── Hero ── */}
      <section className="mob-hero">
        <p className="mob-eyebrow">Étudiant ingénieur · ECE Lyon · MMXXVI</p>
        <h1>Romain<br/>Plane.</h1>
        <p className="mob-lede">
          Entre ingénierie, gestion de projet et engagement étudiant —
          je conçois des solutions concrètes à fort impact.
        </p>
        <div className="mob-tags">
          {["Référent ECE", "JEECE", "CNJE", "Corpo OMNES"].map(tag => (
            <span key={tag} className="mob-tag">{tag}</span>
          ))}
        </div>
        <div className="mob-actions">
          <a href="mailto:romain.plane@edu.ece.fr" className="mob-btn">✉ Email</a>
          <a href="https://linkedin.com/in/romain-plane" target="_blank" rel="noopener noreferrer" className="mob-btn ghost">in LinkedIn</a>
          <a href="https://github.com/rom1pln" target="_blank" rel="noopener noreferrer" className="mob-btn ghost">⌥ GitHub</a>
        </div>
      </section>

      {/* ── Parcours ── */}
      <section id="mob-parcours" className="mob-section">
        <p className="mob-eyebrow">I · Parcours</p>
        <h2>Formation</h2>
        <div className="mob-card">
          <strong>ECE Lyon</strong> — Diplôme d'ingénieur (2023–2029)
          <p>Cycle prépa intégré puis cycle ingénieur. C · Python · électronique · projets techniques.</p>
        </div>
        <div className="mob-card">
          <strong>Référent étudiant ambassadeur</strong> — ECE Lyon
          <p>Formation des étudiants au fonctionnement et à la promotion de l'école. Ambassadeur réseaux sociaux, oraux d'admission parallèle.</p>
        </div>
      </section>

      {/* ── Engagement ── */}
      <section className="mob-section">
        <p className="mob-eyebrow">II · Leadership associatif</p>
        <h2>Engagement</h2>
        <div className="mob-card">
          <strong>Vice-Président & Trésorier</strong> — Corpo OMNES Education Lyon
          <p>Représentation de 6 000+ étudiants. Coordination ECE · ESCE · HEIP · INSEEC · Sup de Pub.</p>
        </div>
        <div className="mob-card">
          <strong>Fondateur & Président</strong> — Inter-Association ECE Lyon
          <p>Coordination de 10+ associations. Mise en place d'un cadre fédératif et organisationnel.</p>
        </div>
        <div className="mob-card">
          <strong>BDE Skyfall</strong> — Secrétaire général · Partenariats · Marketing
          <p>50+ partenariats signés — +1 000 % vs. année précédente. Staff séminaire d'intégration (800 premières années).</p>
        </div>
      </section>

      {/* ── JEECE ── */}
      <section className="mob-section">
        <p className="mob-eyebrow">III · Junior-Entreprise</p>
        <h2>JEECE</h2>
        <p className="mob-text">
          Responsable des intervenants · membre du CA · Référent Campus Lyon · Chef de projet.
          Automatisation du recrutement, du suivi et de la gestion documentaire.
        </p>
        <div className="mob-stats">
          <div className="mob-stat"><span>60</span>Intervenants</div>
          <div className="mob-stat"><span>100+</span>Candidats / an</div>
          <div className="mob-stat"><span>24</span>Écoles au congrès</div>
          <div className="mob-stat"><span>200</span>Étudiants accueillis</div>
        </div>
      </section>

      {/* ── CNJE ── */}
      <section className="mob-section">
        <p className="mob-eyebrow">IV · Confédération nationale</p>
        <h2>CNJE</h2>
        <p className="mob-text">
          Auditeur-Conseil Organisationnel Junior · Formateur RFP. Accompagnement de Junior-Entreprises
          dans leur professionnalisation, leur conformité et leur développement.
        </p>
        <div className="mob-stats">
          <div className="mob-stat"><span>4,4%</span>Taux de sélection</div>
          <div className="mob-stat"><span>1 j.</span>Durée d'un audit</div>
        </div>
      </section>

      {/* ── Compétences ── */}
      <section className="mob-section">
        <p className="mob-eyebrow">V · Boîte à outils</p>
        <h2>Compétences</h2>
        {[
          { label: "Développement", tags: ["HTML", "CSS", "JS", "PHP", "MySQL", "Python", "C"] },
          { label: "Data & outils",  tags: ["SQL", "Power BI", "Azure", "Git", "GitHub"] },
          { label: "Gestion",        tags: ["Pilotage", "Agile", "Scrum", "Lean", "Commercial"] },
          { label: "Leadership",     tags: ["Audit", "Formation", "Recrutement", "Événementiel"] },
          { label: "Langues",        tags: ["🇫🇷 Natif", "🇬🇧 Anglais B2", "🇪🇸 Espagnol B1"] },
        ].map(({ label, tags }) => (
          <div key={label} className="mob-skill-group">
            <div className="mob-skill-label">{label}</div>
            <div className="mob-skill-tags">
              {tags.map(t => <span key={t} className="mob-tag">{t}</span>)}
            </div>
          </div>
        ))}
      </section>

      {/* ── Projets ── */}
      <section id="mob-projets" className="mob-section">
        <p className="mob-eyebrow">VI · Réalisations</p>
        <h2>Projets</h2>

        <div className="mob-proj-featured">
          <p className="mob-proj-sub">Projet phare</p>
          <div className="mob-proj-title">Plateforme Corpo OMNES Lyon</div>
          <p className="mob-proj-desc">
            Plateforme web complète pour 6 000+ étudiants sur 5 écoles et 2 campus.
            Billetterie, paiements Stripe/SumUp, QR + wallet, annuaire, boutique, back-office.
          </p>
          <div className="mob-kpis">
            <span>2 471 billets</span><span>€48k CA</span><span>38 associations</span>
          </div>
          <div className="mob-skill-tags" style={{ marginTop: 10 }}>
            {["PHP", "MySQL", "JS", "Stripe", "SumUp", "Apple Wallet"].map(t => (
              <span key={t} className="mob-tag">{t}</span>
            ))}
          </div>
        </div>

        <div className="mob-proj-featured">
          <p className="mob-proj-sub">Outil interne JEECE</p>
          <div className="mob-proj-title">Plateforme d'examen anti-triche</div>
          <p className="mob-proj-desc">
            Verrouillage fenêtre, limitation IA, contrôle du temps réglementaire.
            Adopté pour les recrutements JEECE 2026.
          </p>
          <div className="mob-skill-tags" style={{ marginTop: 10 }}>
            {["HTML", "CSS", "JS", "PHP"].map(t => (
              <span key={t} className="mob-tag">{t}</span>
            ))}
          </div>
        </div>

        <div className="mob-proj-card" data-proj="homenes">
          <div className="mob-proj-title">Homenes</div>
          <p className="mob-proj-desc">Mise en relation logement étudiant · Lyon.</p>
          <div className="mob-skill-tags" style={{ marginTop: 8 }}>
            {["HTML", "CSS", "JS", "PHP", "MySQL"].map(t => <span key={t} className="mob-tag">{t}</span>)}
          </div>
        </div>

        <div className="mob-proj-card" data-proj="congres">
          <div className="mob-proj-title">Congrès Régional C.-E. 2026</div>
          <p className="mob-proj-desc">Co-organisation · 200 étudiants · 24 écoles · Lyon.</p>
        </div>

        <div className="mob-proj-card" data-proj="digiwake">
          <div className="mob-proj-title">Digiwake</div>
          <p className="mob-proj-desc">Projet technique de 1ʳᵉ année · ECE Lyon.</p>
        </div>
      </section>

      {/* ── CGI ── */}
      <section className="mob-section">
        <p className="mob-eyebrow">VII · Expérience professionnelle</p>
        <h2>CGI</h2>
        <div className="mob-card">
          <strong>Stage · Janvier – Février 2025</strong>
          <p>Accompagnement d'un directeur conseil & chef de projet. Azure, Power BI, SQL, conformité réglementaire.</p>
        </div>
      </section>

      {/* ── Certifications ── */}
      <section className="mob-section">
        <p className="mob-eyebrow">VIII · Formation continue</p>
        <h2>Certifications</h2>
        {[
          { label: "Claude Code 101",                           meta: "Anthropic · mai 2026" },
          { label: "Data Analysis · Programming for DS",        meta: "Liora — TechAway niv. 2 · juillet 2025" },
          { label: "Managing in the Era of Automation",         meta: "EU Business School · janvier 2025" },
          { label: "Gestion de projet — les bases de la réussite", meta: "UC Irvine · Coursera · décembre 2023" },
          { label: "PSC1 · Pix · EF B2 · Permis B",            meta: "Premiers secours · numérique · anglais · conduite" },
        ].map(({ label, meta }) => (
          <div key={label} className="mob-cert">
            <div className="mob-cert-label">{label}</div>
            <div className="mob-cert-meta">{meta}</div>
          </div>
        ))}
      </section>

      {/* ── Contact ── */}
      <section id="mob-contact" className="mob-section mob-contact-section">
        <p className="mob-eyebrow">IX · Suite</p>
        <h2>Écrivons<br/><em>la suite.</em></h2>
        <p className="mob-text">
          Ouvert aux opportunités de stage, projets et collaborations autour de
          l'ingénierie, du développement web, de la data et de la gestion de projet.
        </p>
        <div className="mob-actions">
          <a href="mailto:romain.plane@edu.ece.fr" className="mob-btn">✉ romain.plane@edu.ece.fr</a>
          <a href="https://linkedin.com/in/romain-plane" target="_blank" rel="noopener noreferrer" className="mob-btn ghost">in · LinkedIn</a>
          <a href="https://github.com/rom1pln" target="_blank" rel="noopener noreferrer" className="mob-btn ghost">⌥ · GitHub</a>
        </div>
        <div className="mob-signature">Romain Plane</div>
        <p className="mob-colophon">ECE Lyon · MMXXVI</p>
      </section>

    </div>
  );
}

/* ============ TWEAKS ============ */
window.TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "animations": true,
  "accent": "#2e6b54",
  "lampWarmth": 1.0,
  "vignette": true,
  "grain": true,
  "speed": 1.0
}/*EDITMODE-END*/;

function PortfolioTweaks({ t, setTweak }) {
  // Apply non-CSS-var tweaks
  useEffect(() => {
    const v = document.querySelector(".vignette");
    if (v) v.style.display = t.vignette ? "" : "none";
    const g = document.querySelector(".grain");
    if (g) g.style.display = t.grain ? "" : "none";
    const lp = document.querySelector(".lamp-pool");
    if (lp) lp.style.opacity = t.lampWarmth || 1;
  }, [t.vignette, t.grain, t.lampWarmth]);

  return (
    <TweaksPanel title="Tweaks">
      <TweakSection label="Animation">
        <TweakToggle label="Animations actives" value={t.animations} onChange={v => setTweak("animations", v)} />
        <TweakSlider label="Vitesse caméra" min={0.5} max={2} step={0.1} value={t.speed} onChange={v => setTweak("speed", v)} />
      </TweakSection>
      <TweakSection label="Atmosphère">
        <TweakSlider label="Chaleur de la lampe" min={0} max={1.5} step={0.05} value={t.lampWarmth} onChange={v => setTweak("lampWarmth", v)} />
        <TweakToggle label="Vignettage" value={t.vignette} onChange={v => setTweak("vignette", v)} />
        <TweakToggle label="Grain" value={t.grain} onChange={v => setTweak("grain", v)} />
      </TweakSection>
      <TweakSection label="Accent technique">
        <TweakColor label="Couleur accent" value={t.accent} options={["#2e6b54", "#4a8ef0", "#c9a45a", "#8a2a1a"]} onChange={v => setTweak("accent", v)} />
      </TweakSection>
    </TweaksPanel>
  );
}

/* Mount */
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
