# Portfolio — Romain Plane

> Un portfolio pensé comme un livre : on tourne les pages en scrollant.

**Live →** [portfolio-livre.vercel.app](https://portfolio-livre.vercel.app)

---

## Concept

Deux tomes s'ouvrent au fil du scroll :

- **Tome I** — parcours, engagements, compétences, certifications
- **Tome II** — études de cas : Plateforme Corpo OMNES Lyon, examen anti-triche JEECE, et autres projets

La caméra se déplace sur un bureau virtuel, zoome sur le CV, ouvre les couvertures, tourne les pages, puis passe à l'étagère pour attraper le second volume.

## Stack

Site statique — aucun build, aucun bundler.

| Couche | Choix |
|---|---|
| UI | React 18 (UMD CDN) + Babel Standalone |
| Style | CSS custom (variables, transforms 3D, scroll-driven) |
| Typo | Cormorant Garamond · Inter · Caveat · JetBrains Mono |
| Hébergement | Vercel |

## Structure

```
index.html        — point d'entrée, imports CDN
styles.css        — tout le design : scène, livres, pages, UI
app.jsx           — scène de bureau, livres, navigation, directeur d'animation
pages.jsx         — contenu des pages (Tome I + Tome II)
tweaks-panel.jsx  — panneau de réglages live (animations, grain, accent…)
```

## Lancer en local

Aucune installation requise. Il suffit d'un serveur HTTP local pour que les `<script type="text/babel">` soient servis correctement :

```bash
# Python
python -m http.server 8080

# Node
npx serve .
```

Puis ouvrir `http://localhost:8080`.

## Contact

Romain Plane — [romain.plane@edu.ece.fr](mailto:romain.plane@edu.ece.fr) · [LinkedIn](https://linkedin.com/in/romain-plane) · [GitHub](https://github.com/rom1pln)
