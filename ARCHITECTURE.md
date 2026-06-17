# Architecture — CraftCode

Boîte à outils pédagogique pour développeurs : un **registre d'outils** (Code Review,
SOLID, Design Patterns…) servi par une API, affiché par un front Angular.

## Stack

| Côté | Techno | Version |
|---|---|---|
| Frontend | Angular standalone + signals, Angular Material (M3) | 19.2 |
| Backend | Node + Express + Mongoose (CommonJS) | Express 4.21 / Mongoose 8.9 |
| Base | MongoDB | — |

## Arborescence

```
frontend/src/app/
├─ core/            # Cœur non-visuel, sans état d'UI
│  ├─ models/       # Interfaces TS (*.model.ts)
│  ├─ data/         # Contenu pédagogique statique (constantes SCREAMING_SNAKE)
│  └─ services/     # Accès API (*.service.ts)
├─ features/        # 1 page = 1 dossier (hub + détail)
│  ├─ home/  code-review/  best-practices/  phase-guide/
│  ├─ solid/  solid-detail/
│  └─ design-patterns/  design-pattern-detail/
├─ shared/          # Composants transverses (ex. breadcrumb)
├─ app.routes.ts    # Table de routes lazy
└─ app.component.ts # Shell : toolbar + navLinks

backend/
├─ app.js           # App Express configurée (/api + /health), exportée → testable
├─ server.js        # Bootstrap : connexion Mongo + écoute (importe app.js)
├─ config/db.js     # Connexion Mongo
├─ models/          # Schémas Mongoose (PascalCase singulier)
├─ controllers/     # Logique des endpoints (*Controller.js)
├─ routes/          # Définition des routes (*Routes.js), montées dans index.js
└─ seed/            # data.js (contenu) + seed.js (script idempotent)
```

## Flux de données

```
backend/seed/data.js ──seed──▶ MongoDB ──Mongoose──▶ GET /api/tools
        (contenu des outils)                              │
                                                          ▼
                                  ToolService (HttpClient) ──▶ HomeComponent (grille)
```

- Le **contenu pédagogique** (SOLID, patterns, pratiques) vit en **statique dans
  `core/data/*.ts`** côté front — il n'est PAS en base.
- La **base** ne stocke que le registre d'outils (`Tool`) et la checklist (`ChecklistItem`).
- L'**état utilisateur** (cases cochées) vit dans le **localStorage**, jamais en base
  (clé `craftcode.phase.<slug>.checked`).

## Règle d'or : extensibilité par addition

Le cœur est conçu pour qu'ajouter un outil **n'exige aucun refactor**. Voir les
commentaires de [app.routes.ts](frontend/src/app/app.routes.ts) et
[backend/routes/index.js](backend/routes/index.js) : on ajoute une feature + une route,
on monte le routeur, c'est tout. → procédure détaillée dans @ADD-A-TOOL.md.
