---
description: Scaffolder un nouvel outil pédagogique (front + back) selon ADD-A-TOOL.md
argument-hint: <slug> "<Nom affiché>"
---

Tu vas ajouter un nouvel outil pédagogique au projet CraftCode en suivant
**exactement** la procédure de @ADD-A-TOOL.md. Respecte @NAMING-CONVENTIONS.md,
@DESIGN-SYSTEM.md, @CONTENT-STYLE.md et @STATE-AND-DATA.md.

Arguments fournis : `$ARGUMENTS`
(format attendu : `slug "Nom affiché"` ; si le slug ou le nom manque, demande-le
avant de commencer.)

Déroule les étapes dans cet ordre, sans en sauter :

1. **Modèle** — `frontend/src/app/core/models/<slug>.model.ts` : interface `PascalCase`,
   champs techniques en anglais, contenu en français.
2. **Données** — `frontend/src/app/core/data/<slug>.ts` : constante `SCREAMING_SNAKE_CASE`
   typée par le modèle, chaque entrée avec un `slug` stable. Contenu rédigé selon le ton
   « atelier » (@CONTENT-STYLE.md).
3. **Hub** — `frontend/src/app/features/<slug>/<slug>.component.{ts,html,scss}` :
   `selector: 'app-<slug>'`, grille de cartes, breadcrumb. SCSS via tokens `--cc-*` uniquement.
4. **Détail** (si le contenu s'y prête) — `features/<slug>-detail/` avec route paramétrée
   `<slug>/:param`, résolution réactive du param et redirection si inconnu.
5. **Routes** — ajoute les routes lazy dans `frontend/src/app/app.routes.ts`
   (garde `{ path: '**' }` en dernier).
6. **Navigation** — ajoute une entrée `navLinks` dans `frontend/src/app/app.component.ts`.
7. **Seed** — ajoute l'entrée dans le tableau `tools` de `backend/seed/data.js`
   (incrémente `order`, slug kebab-case, `available: true`).

Puis **vérifie** :
- `cd frontend && npm run lint` → vert
- `cd backend && npm test` → vert (les invariants du seed doivent passer)
- `cd frontend && npm run build` → build OK

Termine par un résumé des fichiers créés/modifiés. Ne committe rien sans demande explicite.
