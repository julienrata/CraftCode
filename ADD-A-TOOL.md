# Ajouter un outil — CraftCode

Chaque outil pédagogique (Code Review, SOLID, Design Patterns…) suit **la même
séquence**. La respecter garantit la cohérence et évite tout refactor du cœur.

Pattern type : un **hub** (`/x`, grille de cartes) + une page de **détail**
(`/x/:slug`). Source de vérité du contenu : un fichier statique dans `core/data/`.

## Séquence (frontend)

1. **Modèle** — `frontend/src/app/core/models/<x>.model.ts`
   Interface `PascalCase`, champs techniques en anglais (`slug`, `icon`), contenu en
   français (`titre`, `definition`…). Cf. [solid-principle.model.ts](frontend/src/app/core/models/solid-principle.model.ts).

2. **Données** — `frontend/src/app/core/data/<x>.ts`
   Constante `SCREAMING_SNAKE_CASE` typée par le modèle, chaque entrée porte un `slug`
   stable. Cf. [solid-principles.ts](frontend/src/app/core/data/solid-principles.ts) :
   `export const SOLID_PRINCIPLES: SolidPrinciple[] = [...]`.

3. **Composant hub** — `frontend/src/app/features/<x>/<x>.component.{ts,html,scss}`
   `selector: 'app-<x>'`, importe le `BreadcrumbComponent`, consomme la constante de data.

4. **Composant détail** (si applicable) — `features/<x>-detail/<x>-detail.component.*`
   Résout l'entrée via le param de route (`signal` + `ActivatedRoute.paramMap`),
   redirige vers le hub si le slug est inconnu. Cf. [phase-guide.component.ts](frontend/src/app/features/phase-guide/phase-guide.component.ts).

5. **Routes** — `frontend/src/app/app.routes.ts`
   Deux routes lazy : le hub puis le détail paramétré.
   ```ts
   { path: 'x', loadComponent: () => import('./features/x/x.component').then(m => m.XComponent) },
   { path: 'x/:slug', loadComponent: () => import('./features/x-detail/x-detail.component').then(m => m.XDetailComponent) },
   ```
   ⚠️ Garder `{ path: '**', redirectTo: '' }` en **dernier**.

6. **Navigation** — `frontend/src/app/app.component.ts`
   Ajouter une entrée dans `navLinks` : `{ label: 'Mon outil', link: '/x' }`.

## Séquence (backend)

7. **Seed** — `backend/seed/data.js`
   Ajouter une entrée au tableau `tools` (incrémenter `order`) :
   ```js
   { slug: 'x', name: 'Mon outil', description: '…', icon: 'material_icon', route: '/x', available: true, order: 5 }
   ```
   `slug` en `kebab-case` (anglais technique, français pour le contenu : `bonnes-pratiques`).

8. **Re-seed** — `cd backend && npm run seed`
   Script idempotent : il vide puis réinsère. Cf. @COMMANDS.md.

> Un outil pas encore prêt : `available: false` → carte « Bientôt disponible », pas de route.

## Conventions transverses

- Nommage : voir @NAMING-CONVENTIONS.md.
- UI / tokens : voir @DESIGN-SYSTEM.md.
- Une route ≠ un endpoint API : le contenu pédagogique reste **statique côté front**,
  seul le registre d'outils passe par l'API.
