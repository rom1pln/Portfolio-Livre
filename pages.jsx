/* Page content for each spread of the book.
   Each PAGE_n is exported on window.
   Pages are facing pairs — odd = right-side, even = back-side of a leaf.
   But to keep it simple we render single pages and chunk them into leaves.
*/

const PAGE_LIST = [
  /* ===== 1 — Titre / portrait — first content page (right of first spread) ===== */
  {
    chapter: "I · Introduction",
    side: "right",
    render: () => (
      <>
        <div className="page-eyebrow">Chapitre I</div>
        <h1 className="page-title">Romain<br/>Plane.</h1>
        <div className="page-lede">
          Étudiant ingénieur à l'ECE Lyon — je construis mon parcours autour de trois axes&nbsp;:
          concevoir des solutions techniques, piloter des projets concrets, et structurer des organisations
          étudiantes à fort impact.
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "100px 1fr", gap: 12, marginTop: 8 }}>
          <div className="ph" data-label="Portrait" style={{ height: 130 }}></div>
          <div style={{ fontSize: 12.5, lineHeight: 1.55 }}>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 14, fontWeight: 600 }}>Mandats actuels</div>
            <div style={{ marginTop: 4, color: "#3d2a1f" }}>
              <div>· Référent Ambassadeur — ECE Lyon</div>
              <div>· Responsable Intervenants — JEECE</div>
              <div>· Auditeur-Conseil & Formateur — CNJE</div>
              <div>· Vice-Président & Trésorier — Corpo OMNES</div>
            </div>
          </div>
        </div>

        <div style={{ display: "flex", gap: 6, marginTop: 14, flexWrap: "wrap" }}>
          <a className="btn sm" href="#contact">✉ Email</a>
          <a className="btn sm ghost" href="#linkedin">in · LinkedIn</a>
          <a className="btn sm ghost" href="#github">⌥ GitHub</a>
          <a className="btn sm" href="#cv">↓ CV</a>
        </div>

        <div className="hand-note" style={{ position: "absolute", right: 26, top: 36, transform: "rotate(6deg)" }}>
          <span className="hand-arrow">↗</span> 2023 — 2029
        </div>

        <div className="pg-num">— I —</div>
      </>
    )
  },

  /* ===== 2 — Parcours ingénieur — left ===== */
  {
    chapter: "II · Parcours",
    side: "left",
    render: () => (
      <>
        <div className="page-eyebrow">Chapitre II</div>
        <h2 className="page-title">Mon parcours<br/><em>d'ingénieur.</em></h2>
        <div className="page-body">
          <p><strong>ECE Lyon</strong> — Diplôme d'ingénieur, 2023&nbsp;–&nbsp;2029.</p>
          <p>
            Cycle préparatoire intégré, puis cycle ingénieur. Apprentissage du <strong>C</strong>, <strong>Python</strong>,
            de l'électronique et de la conception de circuits, complété par des projets techniques transversaux —
            dont deux jeux vidéo (un en bibliothèque graphique C) et la conception de PCB.
          </p>
          <p>
            En parallèle, j'ai construit un fort intérêt pour le <strong>développement web</strong>, la <strong>data</strong>,
            la <strong>gestion de projet</strong> et la conception de <strong>systèmes numériques</strong>.
          </p>
          <p style={{ fontSize: 12, color: "#6a513a", marginTop: 6 }}>
            Avant l'ECE&nbsp;: Bac général — mention bien (Saint-Alyre, Clermont-Ferrand, 2023) ·
            Brevet — mention très bien (2020).
          </p>
        </div>

        <div className="divider">·</div>

        <div className="kf-grid">
          <div className="kf"><span className="kf-num">5 ans</span><span className="kf-lbl">Cursus ingénieur</span></div>
          <div className="kf"><span className="kf-num">5+</span><span className="kf-lbl">Langages</span></div>
        </div>

        <div className="pg-num">— II —</div>
      </>
    )
  },

  /* ===== 3 — Photo ECE — right (entrée scène miniature) ===== */
  {
    chapter: "II · ECE Lyon",
    side: "right",
    render: () => (
      <>
        <div className="page-eyebrow">Campus</div>
        <h3 className="page-title" style={{ fontSize: 24 }}>ECE Lyon</h3>
        <div className="ph" data-label="Vue du campus ECE Lyon"
             style={{ height: 200, marginTop: 4 }}>
        </div>
        <div className="hand-note" style={{ marginTop: 10 }}>
          La 1ʳᵉ année a tout déclenché&nbsp;: projets <span className="hand-arrow">↗</span> responsabilités.
        </div>

        <div className="page-body" style={{ marginTop: 10, fontSize: 12 }}>
          <p>
            <strong>Référent étudiant ambassadeur</strong> (CDD, sept. 2025 →) — formation des étudiants
            de 1ʳᵉ, 2ᵉ et 3ᵉ années au fonctionnement de l'école et à sa promotion.
          </p>
          <p style={{ fontSize: 11, color: "#6a513a" }}>
            Aussi&nbsp;: ambassadeur réseaux sociaux · oraux d'admission parallèle ·
            accompagnement d'étudiants en situation de handicap au Concours Avenir.
          </p>
        </div>

        <div style={{ marginTop: 8, display: "flex", gap: 6, flexWrap: "wrap" }}>
          <span className="chip">C</span><span className="chip">Python</span>
          <span className="chip">Électronique · PCB</span>
          <span className="chip accent">Projets transversaux</span>
        </div>

        <div className="pg-num">— III —</div>
      </>
    )
  },

  /* ===== 4 — Engagement & Leadership — left ===== */
  {
    chapter: "III · Engagement",
    side: "left",
    render: () => (
      <>
        <div className="page-eyebrow">Chapitre III</div>
        <h2 className="page-title">Structurer.<br/>Représenter.<br/><em>Fédérer.</em></h2>
        <div className="page-lede">
          Prendre des responsabilités de structuration et de représentation étudiante,
          avec une logique simple&nbsp;: créer des systèmes durables, lisibles et utiles.
        </div>
        <div className="page-body" style={{ marginTop: 4 }}>
          <p>
            <strong>Vice-Président & Trésorier</strong> de la Corpo OMNES Education Lyon —
            représentation de plus de <span className="bubble">6 000 étudiants</span> sur les campus lyonnais.
          </p>
        </div>
        <div className="pg-num">— IV —</div>
      </>
    )
  },

  /* ===== 5 — Timeline engagement — right ===== */
  {
    chapter: "III · Timeline",
    side: "right",
    render: () => (
      <>
        <div className="page-eyebrow">Mandats & coordination</div>
        <div className="tl">
          <div className="tl-item">
            <div style={{ fontFamily: "var(--font-display)", fontSize: 14, fontWeight: 600 }}>
              Corpo OMNES Education Lyon
            </div>
            <div className="muted" style={{ fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase" }}>
              Vice-Président · Trésorier
            </div>
            <div style={{ fontSize: 12.5, marginTop: 2 }}>
              Coordination ECE · ESCE · HEIP · INSEEC · Sup de Pub. 6 000+ étudiants.
            </div>
          </div>
          <div className="tl-item">
            <div style={{ fontFamily: "var(--font-display)", fontSize: 14, fontWeight: 600 }}>
              Inter-Association ECE Lyon
            </div>
            <div className="muted" style={{ fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase" }}>
              Fondateur · Président
            </div>
            <div style={{ fontSize: 12.5, marginTop: 2 }}>
              Coordination de 10+ associations · cadre fédératif & organisationnel.
            </div>
          </div>
          <div className="tl-item">
            <div style={{ fontFamily: "var(--font-display)", fontSize: 14, fontWeight: 600 }}>
              BDE Skyfall — ECE Lyon
            </div>
            <div className="muted" style={{ fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase" }}>
              Secrétaire général · Resp. Partenariats · Marketing
            </div>
            <div style={{ fontSize: 12.5, marginTop: 2 }}>
              <strong>50+ partenariats signés</strong> — <span className="bubble">+1 000%</span> vs. année précédente.
              Staff Séminaire d'intégration (800 1ʳᵉ années).
            </div>
          </div>
          <div className="tl-item">
            <div style={{ fontFamily: "var(--font-display)", fontSize: 14, fontWeight: 600 }}>
              Automobile Club ECE Lyon · Loop Hole
            </div>
            <div className="muted" style={{ fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase" }}>
              Président · Secrétaire général
            </div>
            <div style={{ fontSize: 12.5, marginTop: 2 }}>
              Direction d'équipes sportives en compétition, événementiel, direction artistique & merchandising.
            </div>
          </div>
          <div className="tl-item">
            <div style={{ fontFamily: "var(--font-display)", fontSize: 14, fontWeight: 600 }}>
              Référent Ambassadeur — ECE Lyon
            </div>
            <div style={{ fontSize: 12.5, marginTop: 2 }}>
              Représentation école · formation des étudiants au fonctionnement & à la promotion de l'ECE.
            </div>
          </div>
        </div>

        <div className="stamp" style={{ position: "absolute", right: 30, bottom: 70 }}>
          Approuvé
        </div>
        <div className="hand-note" style={{ position: "absolute", left: 56, bottom: 50, transform: "rotate(-3deg)" }}>
          <span className="hand-arrow">→</span> "Des systèmes lisibles & utiles."
        </div>
        <div className="pg-num">— V —</div>
      </>
    )
  },

  /* ===== 6 — JEECE — left ===== */
  {
    chapter: "IV · JEECE",
    side: "left",
    render: () => (
      <>
        <div className="page-eyebrow">Chapitre IV · Junior-Entreprise</div>
        <h2 className="page-title">JEECE — apprendre<br/>par le <em>projet réel.</em></h2>
        <div className="page-body">
          <p>
            <strong>Responsable des intervenants</strong> · membre du CA · <strong>Référent Campus Lyon</strong> ·
            <strong> Chef de projet</strong>.
          </p>
          <p style={{ fontSize: 12, color: "#6a513a", marginTop: 4 }}>
            Avant&nbsp;: <em>Chargé de mission Ressources Humaines</em> — pilotage du RFP, suivi & entretiens,
            outils internes (suivi des membres, anti-triche, correction automatique).
          </p>
        </div>

        <div className="kf-grid" style={{ marginTop: 10 }}>
          <div className="kf"><span className="kf-num">60</span><span className="kf-lbl">Intervenants actifs</span></div>
          <div className="kf"><span className="kf-num">100+</span><span className="kf-lbl">Candidats / an</span></div>
          <div className="kf"><span className="kf-num">24</span><span className="kf-lbl">Écoles accueillies</span></div>
          <div className="kf"><span className="kf-num">200</span><span className="kf-lbl">Étudiants au Congrès</span></div>
        </div>

        <div className="hand-note" style={{ marginTop: 12, transform: "rotate(-1deg)" }}>
          → automatisation du recrutement, du suivi et de la gestion documentaire.
        </div>
        <div className="pg-num">— VI —</div>
      </>
    )
  },

  /* ===== 7 — JEECE dossiers — right ===== */
  {
    chapter: "IV · Espace JE",
    side: "right",
    render: () => (
      <>
        <div className="page-eyebrow">Espace de travail JEECE</div>
        <div style={{ position: "relative", height: 200, marginTop: 6 }}>
          <div style={{ position: "absolute", left: 0, top: 0, width: 130, height: 170,
            background: "rgba(46,107,84,0.10)", border: "1px solid rgba(46,107,84,0.3)", transform: "rotate(-4deg)",
            padding: 8, fontSize: 10 }}>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 13 }}>Dossier client</div>
            <div className="muted" style={{ fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase" }}>Proposition · 2026</div>
            <div style={{ marginTop: 8, lineHeight: 1.4 }}>
              · Périmètre<br/>· Livrables<br/>· Calendrier<br/>· Coût<br/>· Conditions
            </div>
          </div>
          <div style={{ position: "absolute", left: 110, top: 28, width: 130, height: 160,
            background: "rgba(46,107,84,0.06)", border: "1px solid rgba(46,107,84,0.25)", transform: "rotate(5deg)",
            padding: 8, fontSize: 10 }}>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 13 }}>Pipeline RH</div>
            <div className="muted" style={{ fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase" }}>Recrutement</div>
            <div style={{ marginTop: 8, lineHeight: 1.4 }}>
              · 100 candidatures<br/>· 40 entretiens<br/>· 24 admis<br/>· Onboarding auto.
            </div>
          </div>
          <div style={{ position: "absolute", right: 0, top: 10, width: 110, height: 170,
            background: "rgba(120,80,40,0.10)", border: "1px solid rgba(58,42,31,0.35)", transform: "rotate(-2deg)",
            padding: 8, fontSize: 10 }}>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 13 }}>Congrès C.E. 2026</div>
            <div className="muted" style={{ fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase" }}>Printemps</div>
            <div style={{ marginTop: 8 }}>
              200 étudiants<br/>24 écoles<br/>Lyon
            </div>
          </div>
        </div>

        <div className="page-body" style={{ marginTop: 8 }}>
          <p>Chef de projet : propositions commerciales, rendez-vous clients, suivi opérationnel.</p>
        </div>
        <div className="pg-num">— VII —</div>
      </>
    )
  },

  /* ===== 8 — CNJE Audit — left ===== */
  {
    chapter: "V · CNJE",
    side: "left",
    render: () => (
      <>
        <div className="page-eyebrow">Chapitre V · Confédération Nationale</div>
        <h2 className="page-title">Conseiller<br/>et former,<br/><em>au niveau national.</em></h2>
        <div className="page-lede">
          À travers l'audit et la formation, j'accompagne des structures étudiantes dans leur
          professionnalisation, leur conformité et leur développement.
        </div>
        <div className="page-body" style={{ marginTop: 4 }}>
          <p><strong>Auditeur-Conseil Organisationnel Junior</strong> — CNJE.</p>
          <p><strong>Formateur RFP</strong> — Recrutement · Formation · Passation.</p>
        </div>
        <div className="kf-grid" style={{ marginTop: 14 }}>
          <div className="kf"><span className="kf-num">4,4%</span><span className="kf-lbl">Taux de sélection</span></div>
          <div className="kf"><span className="kf-num">1 j.</span><span className="kf-lbl">Durée d'un audit</span></div>
        </div>
        <div className="hand-note" style={{ marginTop: 12, transform: "rotate(-1deg)" }}>
          ↗ tests écrits + week-end de formation pour entrer dans le corps des auditeurs.
        </div>
        <div className="pg-num">— VIII —</div>
      </>
    )
  },

  /* ===== 9 — Audit report — right ===== */
  {
    chapter: "V · Rapport d'audit",
    side: "right",
    render: () => (
      <>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div className="page-eyebrow">Rapport d'audit — extrait</div>
          <div className="stamp" style={{ transform: "rotate(8deg)" }}>Validé</div>
        </div>

        <div style={{ marginTop: 8 }}>
          {[
            ["Stratégie & pilotage", "A"],
            ["Activité commerciale", "A−"],
            ["Ressources humaines", "B+"],
            ["Gestion associative", "A"],
            ["Cadre légal & livrables", "A"],
            ["Cohérence documentaire", "B+"],
            ["Déontologie", "A"],
          ].map(([k, g]) => (
            <div key={k} className="audit-row">
              <span className="check">☑</span>
              <span>{k}</span>
              <span className="grade">{g}</span>
            </div>
          ))}
        </div>

        <div className="hand-note" style={{ marginTop: 12, transform: "rotate(-1deg)" }}>
          Recommandations validées · transmission à l'équipe RFP. <span className="hand-arrow">✓</span>
        </div>
        <div className="pg-num">— IX —</div>
      </>
    )
  },

  /* ===== 16 — Compétences — left ===== */
  {
    chapter: "X · Compétences",
    side: "left",
    render: () => (
      <>
        <div className="page-eyebrow">Chapitre X · Boîte à outils</div>
        <h2 className="page-title">Compétences.</h2>

        <div className="mindmap">
          <div className="branch" style={{ top: 0, left: 0, width: 200 }}>
            <span className="h">Développement</span>
            HTML · CSS · JavaScript<br/>PHP · MySQL · Python · C<br/>jQuery · Node.js · Bootstrap
          </div>
          <div className="branch" style={{ top: 0, right: 0, width: 180, textAlign: "right" }}>
            <span className="h">Data & outils</span>
            SQL · Power BI · MS Azure<br/>Excel · Git · GitHub<br/>Markdown · Notion
          </div>
          <div className="branch" style={{ top: 150, left: 0, width: 200 }}>
            <span className="h">Gestion de projet</span>
            pilotage · coordination<br/>Lean · Agile · Scrum<br/>relation client · commercial
          </div>
          <div className="branch" style={{ top: 150, right: 0, width: 180, textAlign: "right" }}>
            <span className="h">Leadership</span>
            association · audit<br/>formation · recrutement<br/>événementiel · partenariats
          </div>
          <div className="branch" style={{ top: 300, left: "50%", transform: "translateX(-50%)", width: 220, textAlign: "center" }}>
            <span className="h">Langues</span>
            🇫🇷 Natif · 🇬🇧 Anglais B2 (EF) · 🇪🇸 Espagnol B1
          </div>

          {/* center node */}
          <div style={{ position: "absolute", top: 160, left: "50%", transform: "translate(-50%,-50%)",
            width: 80, height: 80, border: "1px solid var(--accent)", borderRadius: "50%",
            display: "flex", alignItems:"center", justifyContent:"center",
            fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: 16, color: "var(--accent)" }}>
            RP
          </div>
        </div>
        <div className="pg-num">— XVI —</div>
      </>
    )
  },

  /* ===== 17 — Certificats — right ===== */
  {
    chapter: "XI · Certifications",
    side: "right",
    render: () => (
      <>
        <div className="page-eyebrow">Chapitre XI</div>
        <h2 className="page-title" style={{ fontSize: 28 }}>Apprendre<br/>en <em>continu.</em></h2>

        <div className="cert">
          <div className="seal">A</div>
          <div className="label">Claude Code 101</div>
          <div className="meta">Anthropic · mai 2026</div>
        </div>
        <div className="cert">
          <div className="seal">L</div>
          <div className="label">Data Analysis · Programming for DS</div>
          <div className="meta">Liora — TechAway niv. 2 · juillet 2025</div>
        </div>
        <div className="cert">
          <div className="seal">E</div>
          <div className="label">Managing in the Era of Automation</div>
          <div className="meta">EU Business School · janvier 2025</div>
        </div>
        <div className="cert">
          <div className="seal">UC</div>
          <div className="label">Gestion de projet — les bases de la réussite</div>
          <div className="meta">UC Irvine · Coursera · décembre 2023</div>
        </div>
        <div className="cert">
          <div className="seal">S</div>
          <div className="label">Méthode Lean · Agile · Recrutement · Comptabilité</div>
          <div className="meta">Skillsoft — 9 modules</div>
        </div>
        <div className="cert">
          <div className="seal">+</div>
          <div className="label">PSC1 · Pix · EF B2 · Permis</div>
          <div className="meta">Premiers secours · numérique · anglais · conduite</div>
        </div>
        <div className="pg-num">— XVII —</div>
      </>
    )
  },

  /* ===== 18 — Contact final — left ===== */
  {
    chapter: "XII · Contact",
    side: "left",
    render: () => (
      <>
        <div className="page-eyebrow">Chapitre XII · Suite</div>
        <div className="contact-final">
          <h2 className="page-title">Écrivons<br/>la <em>suite.</em></h2>
          <div className="page-lede">
            Je suis ouvert aux opportunités de stage, projets, collaborations et échanges autour
            de l'ingénierie, du développement web, de la data, de la gestion de projet et de
            l'innovation étudiante.
          </div>
          <div className="cta-row">
            <a className="btn sm" href="mailto:romain.plane@edu.ece.fr">✉ Email</a>
            <a className="btn sm ghost" href="https://www.linkedin.com/in/romain-plane/">in · LinkedIn</a>
            <a className="btn sm ghost" href="https://github.com/rom1pln">⌥ GitHub</a>
            <a className="btn sm" href="#cv">↓ Télécharger CV</a>
          </div>
          <div className="signature" style={{ marginTop: 22 }}>Romain Plane</div>
          <div className="muted" style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", marginTop: 2 }}>
            — Fin du livre I —
          </div>
        </div>
        <div className="pg-num">— XVIII —</div>
      </>
    )
  },

  /* ===== 19 — Colophon — right ===== */
  {
    chapter: "Colophon",
    side: "right",
    render: () => (
      <>
        <div className="page-eyebrow">Colophon</div>
        <div style={{ fontFamily: "var(--font-display)", fontSize: 18, lineHeight: 1.5, color: "#3d2a1f", marginTop: 20 }}>
          Composé à <em>Lyon</em>,<br/>
          imprimé sur papier vergé,<br/>
          relié en cuir sombre,<br/>
          frappé d'un fer doré.
        </div>
        <div className="divider">⁂</div>
        <div className="muted" style={{ fontSize: 11, lineHeight: 1.5 }}>
          Typographie : Cormorant Garamond · Inter · Caveat.<br/>
          Mise en scène : un bureau, une lampe, un livre.<br/>
          Année : MMXXVI.
        </div>
        <div style={{ position:"absolute", bottom: 70, right: 36 }}>
          <div className="signature">— R. P.</div>
        </div>
        <div className="pg-num">FIN</div>
      </>
    )
  },
];

window.PAGE_LIST = PAGE_LIST;

const PROJECT_PAGES = [
  /* ===== Book 2 — Cover intro page ===== */
  {
    chapter: "Carnet · Préface",
    side: "left",
    render: () => (
      <>
        <div className="page-eyebrow">— Vol. II —</div>
        <h2 className="page-title">Le carnet<br/>de <em>projets.</em></h2>
        <div className="page-lede">
          De la billetterie à la salle d'examen — quelques projets racontés en détail&nbsp;:
          contexte, rôle, problématique, solution, technologies, impact.
        </div>
        <div className="page-body" style={{ marginTop: 14 }}>
          <p>
            Quatre études de cas&nbsp;: une plateforme web complète au service de 6 000 étudiants,
            un outil interne d'examen sécurisé, trois projets parallèles et une première
            immersion professionnelle.
          </p>
        </div>
        <div className="signature" style={{ position:"absolute", bottom: 60, left: 56 }}>R. P.</div>
        <div className="pg-num">— I —</div>
      </>
    )
  },

  /* ===== 10 — Plateforme Corpo — left (project intro) ===== */
  {
    chapter: "VI · Projet principal",
    side: "left",
    render: () => (
      <>
        <div className="page-eyebrow">Chapitre VI · Projet phare</div>
        <h2 className="page-title">Plateforme Corpo<br/><em>OMNES Lyon.</em></h2>
        <div className="page-lede">
          Centraliser la vie étudiante de <strong>5 écoles</strong> et <strong>2 campus</strong>.
          Plus de 6 000 étudiants concernés.
        </div>
        <div className="page-body">
          <p>
            Conception et développement d'une plateforme web complète — janvier&nbsp;→ mai 2026 —
            pensée pour simplifier la gestion administrative, améliorer l'expérience étudiante
            et offrir un outil centralisé, moderne et scalable.
          </p>
        </div>

        <div style={{ marginTop: 10, display: "flex", gap: 4, flexWrap: "wrap" }}>
          {["HTML","CSS","JavaScript","PHP","MySQL","Stripe","SumUp","QR Code","ICS","Apple Wallet","Google Wallet"].map(t => (
            <span key={t} className="chip">{t}</span>
          ))}
        </div>
        <div className="pg-num">— X —</div>
      </>
    )
  },

  /* ===== 11 — Dashboard mockup — right ===== */
  {
    chapter: "VI · Aperçu produit",
    side: "right",
    render: () => (
      <>
        <div className="page-eyebrow">Mini-dashboard administrateur</div>
        <div className="mini-dash">
          <div className="header">
            <div className="title">CORPO · BACK-OFFICE</div>
            <div style={{ opacity: 0.6 }}>v1.0 · mai 2026</div>
          </div>
          <div className="grid">
            <div className="card"><span className="v">2 471</span><span className="l">Billets vendus</span></div>
            <div className="card"><span className="v">€48k</span><span className="l">CA évén.</span></div>
            <div className="card"><span className="v">38</span><span className="l">Assos</span></div>
          </div>
          <div className="bars">
            {[14,28,22,40,34,52,46,60,72,58,68,84,76,92].map((h,i) => (
              <span key={i} style={{ height: h + "%" }}></span>
            ))}
          </div>
          <div style={{ display: "flex", marginTop: 10, gap: 8, alignItems: "flex-end" }}>
            <div className="qr"></div>
            <div style={{ fontSize: 11, lineHeight: 1.4 }}>
              <div style={{ color: "var(--gold)" }}>BILLET #4421</div>
              <div>Soirée Inter-Asso · 12.06.26</div>
              <div>Place Tony Garnier — Lyon</div>
              <div style={{ marginTop: 4, opacity: 0.7 }}>Paiement Stripe · Wallet ✓</div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: 10, fontSize: 12.5, lineHeight: 1.5 }}>
          Billetterie · paiement Stripe / SumUp · QR + wallet · annuaire associations ·
          boutique e-commerce · interface FR/EN · back-office complet.
        </div>

        <div style={{ display: "flex", gap: 4, marginTop: 10, flexWrap: "wrap" }}>
          <button className="btn sm">↗ Démo</button>
          <button className="btn sm ghost">Étude de cas</button>
          <button className="btn sm ghost">⌥ Code</button>
        </div>
        <div className="pg-num">— XI —</div>
      </>
    )
  },

  /* ===== 12 — Examen anti-triche — left ===== */
  {
    chapter: "VII · Examen sécurisé",
    side: "left",
    render: () => (
      <>
        <div className="page-eyebrow">Chapitre VII · Projet technique</div>
        <h2 className="page-title">Plateforme d'examen<br/><em>anti-triche.</em></h2>
        <div className="page-body">
          <p>
            Plateforme adaptée au contexte JE pour sécuriser les examens lors du recrutement
            ou d'épreuves obligatoires — fiabiliser la sélection, encadrer les conditions.
          </p>
        </div>

        <div style={{ marginTop: 10 }}>
          {[
            "Empêcher la sortie de la fenêtre d'examen",
            "Limiter l'usage d'outils d'IA",
            "Contrôler le temps réglementaire",
            "Encadrer les conditions d'épreuve",
            "Fiabiliser les processus de sélection",
          ].map(line => (
            <div key={line} style={{ display:"flex", gap:8, alignItems:"flex-start", fontSize: 12.5, padding:"3px 0" }}>
              <span style={{ color: "var(--accent)", fontFamily: "var(--font-mono)", marginTop: 1 }}>▸</span>
              <span>{line}</span>
            </div>
          ))}
        </div>
        <div className="pg-num">— XII —</div>
      </>
    )
  },

  /* ===== 13 — Exam UI — right ===== */
  {
    chapter: "VII · Salle d'examen",
    side: "right",
    render: () => (
      <>
        <div className="page-eyebrow">Interface de surveillance</div>
        <div className="exam-ui">
          <div className="row"><span className="lbl">Session</span><span>JEECE · RECRUT-26</span></div>
          <div className="row"><span className="lbl">Candidat</span><span>#C-0184</span></div>
          <div className="row"><span className="lbl">Module</span><span>Étude de cas — RFP</span></div>
          <div style={{ borderTop: "1px solid rgba(217,227,243,0.15)", margin: "6px 0" }}></div>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding: "6px 0" }}>
            <span className="timer">42 : 17</span>
            <span className="lock">⚑ FENÊTRE VERROUILLÉE</span>
          </div>
          <div className="row"><span className="lbl">Tabs out</span><span className="lock">0</span></div>
          <div className="row"><span className="lbl">Copier/coller</span><span className="lock">bloqué</span></div>
          <div className="row"><span className="lbl">Détection IA</span><span className="warn">surveillance</span></div>
          <div className="row"><span className="lbl">Plein écran</span><span className="lock">actif</span></div>
        </div>

        <div className="hand-note" style={{ marginTop: 10, transform: "rotate(-1deg)" }}>
          → outil interne JEECE — adopté pour les recrutements 2026.
        </div>
        <div style={{ display: "flex", gap: 4, marginTop: 10, flexWrap: "wrap" }}>
          <button className="btn sm">Voir le projet</button>
          <button className="btn sm ghost">Détails techniques</button>
        </div>
        <div className="pg-num">— XIII —</div>
      </>
    )
  },

  /* ===== 14 — Autres projets — left ===== */
  {
    chapter: "VIII · Autres projets",
    side: "left",
    project: "intro",
    render: () => (
      <>
        <div className="page-eyebrow">Chapitre VIII · Projets</div>
        <h2 className="page-title">Autres projets<br/>au <em>fil du carnet.</em></h2>
        <div style={{ display: "grid", gap: 8, marginTop: 8 }}>
          <div className="proj-card" data-proj="homenes">
            <h5>Homenes <span className="bubble" style={{ marginLeft: 6 }}>Mise en relation</span></h5>
            <p>Site web pour aider les nouveaux étudiants à trouver un appartement.</p>
          </div>
          <div className="proj-card" data-proj="digiwake">
            <h5>Digiwake <span className="bubble" style={{ marginLeft: 6 }}>ECE — 1ʳᵉ A.</span></h5>
            <p>Projet de première année du cycle ingénieur, ECE Lyon.</p>
          </div>
          <div className="proj-card" data-proj="congres">
            <h5>Congrès Régional C.-E. <span className="bubble" style={{ marginLeft: 6 }}>Événementiel</span></h5>
            <p>Organisation associée à JEECE — 200 étudiants · 24 écoles.</p>
          </div>
        </div>
        <div className="hand-note" style={{ marginTop: 10, fontSize: 14 }}>
          ↗ cliquer une carte pour ouvrir la fiche complète.
        </div>
        <div className="pg-num">— XIV —</div>
      </>
    )
  },

  /* ===== 15 — CGI — right ===== */
  {
    chapter: "IX · CGI",
    side: "right",
    render: () => (
      <>
        <div className="page-eyebrow">Chapitre IX · Expérience pro</div>
        <h3 className="page-title" style={{ fontSize: 24 }}>
          CGI <span style={{ fontFamily: "var(--font-display)", fontStyle: "italic", color: "var(--accent)", fontWeight: 400, fontSize: 18 }}>— conseil, data, projet.</span>
        </h3>
        <div className="muted" style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase" }}>
          Stage · janvier — février 2025
        </div>
        <div className="page-body" style={{ marginTop: 10 }}>
          <p>
            Accompagnement d'un <strong>directeur conseil & chef de projet</strong> : gestion opérationnelle,
            organisation d'équipes, phases de test, processus de validation, suivi financier.
          </p>
          <p>
            Initiation à <strong>Microsoft Azure</strong>, analyse de données avec <strong>Power BI</strong> et
            <strong> SQL</strong>, modules e-learning sur la conformité réglementaire.
          </p>
        </div>

        <div style={{ marginTop: 10, fontFamily: "var(--font-mono)", fontSize: 11, color: "#3d2a1f" }}>
          <div style={{ display: "flex", gap: 8 }}>
            <div style={{ flex: 1 }}>
              <div style={{ letterSpacing: "0.18em", textTransform: "uppercase", color:"var(--accent)" }}>// pipeline</div>
              <div style={{ borderLeft: "1px dashed #3d2a1f", paddingLeft: 6, marginTop: 4 }}>
                cadrage → spec → dev → test → validation → livraison
              </div>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ letterSpacing: "0.18em", textTransform: "uppercase", color:"var(--accent)" }}>// stack</div>
              <div style={{ borderLeft: "1px dashed #3d2a1f", paddingLeft: 6, marginTop: 4 }}>
                Azure · Power BI · SQL · Office 365
              </div>
            </div>
          </div>
        </div>
        <div className="pg-num">— XV —</div>
      </>
    )
  },

  /* ===== Book 2 — Closing page ===== */
  {
    chapter: "Carnet · Fin",
    side: "right",
    render: () => (
      <>
        <div className="page-eyebrow">— Fin du vol. II —</div>
        <div style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: 19, color: "#3d2a1f", marginTop: 30, lineHeight: 1.5 }}>
          "Chaque projet<br/>est un brouillon<br/>du suivant."
        </div>
        <div className="divider">⁂</div>
        <div className="page-body" style={{ marginTop: 8 }}>
          <p>D'autres projets sont en chantier. Le carnet continue de s'écrire.</p>
        </div>
        <div className="signature" style={{ marginTop: 30 }}>Romain Plane</div>
        <div className="pg-num">— FIN —</div>
      </>
    )
  },
];

window.PROJECT_PAGES = PROJECT_PAGES;

