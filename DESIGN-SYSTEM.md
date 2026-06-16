# Design system — CraftCode

Thème « atelier / artisan du code » (établi, cuivre, papier). **Source unique de
vérité** : [frontend/src/styles.scss](frontend/src/styles.scss) — tokens `--cc-*` sur
`:root`, remappés vers les jetons Material M3 `--mat-sys-*`.

> **Règle absolue : aucune valeur en dur.** Toute couleur, espacement, rayon, ombre ou
> taille passe par un token `--cc-*`. ❌ `padding: 24px` / `color: #B45309` —
> ✅ `padding: var(--cc-space-5)` / `color: var(--cc-primary)`.

## Tokens

### Couleurs de marque
| Token | Rôle |
|---|---|
| `--cc-bg` `--cc-surface` `--cc-surface-2` | Fonds (papier) |
| `--cc-border` | Bordures |
| `--cc-ink` `--cc-ink-soft` | Texte principal / atténué |
| `--cc-primary` `--cc-primary-hover` `--cc-on-primary` | Cuivre (action principale) |
| `--cc-accent` | Patine (actions secondaires) |
| `--cc-success` `--cc-warn` | États |
| `--cc-primary-tint` `--cc-accent-tint` | Teintes douces (conteneurs) |

### Badges de rôle (texte + teinte, **jamais la couleur seule** → accessibilité)
`--cc-role-{equipe,auteur,relecteur,mixte}` + leur variante `…-tint`.

### Typographie
`--cc-font` · tailles `--cc-fs-{h1,h2,h3,body,small}` · interlignes `--cc-lh-{body,tight}`
· `--cc-measure` (largeur de lecture max, 70ch).

### Espacement (base 4px)
`--cc-space-1` (4px) → `--cc-space-8` (64px).

### Rayons / ombres / mouvement / layout
`--cc-radius-{sm,md,lg}` · `--cc-shadow-{1,2}` · `--cc-transition` (160ms) · `--cc-toolbar-h`.

## Conventions SCSS

- **Classes en BEM** : `bloc__element--modificateur`.
  ✅ `.principle-card__title`, `.badge--equipe` · ❌ `.principleCardTitle`.
- **Bloc racine** = nom de feature complet : `.solid-header`, pas d'abréviation.
- **Composant scopé** via `:host { display: block; max-width: 960px; margin: 0 auto; … }`.
- **Material** : ne pas surcharger les composants à la main — ils héritent de la marque
  via le remapping `--mat-sys-* → --cc-*` dans `styles.scss`.

## Accessibilité (déjà en place, à préserver)

- `:focus-visible` global : `outline: 2px solid var(--cc-primary)` — ne jamais retirer un
  outline sans remplacement.
- Lien d'évitement `.skip-link` visible au focus clavier.
- `@media (prefers-reduced-motion: reduce)` : animations/transitions neutralisées.
- Information jamais portée par la couleur seule (cf. badges de rôle).

## Icônes

Material Icons (nom textuel). Le champ `icon` des modèles/seed contient ce nom.
✅ `icon: 'architecture'` · ✅ `<mat-icon>menu_book</mat-icon>`.
