# Commandes & vérification — CraftCode

Deux projets indépendants : `frontend/` (Angular) et `backend/` (Express). Chacun a son
`package.json` — lancer les commandes **depuis le bon dossier**.

## Prérequis

- Node + npm, MongoDB accessible localement.
- `cd backend && cp .env.example .env` puis adapter :
  | Variable | Défaut | Rôle |
  |---|---|---|
  | `MONGO_URI` | `mongodb://127.0.0.1:27017/craftcode` | Connexion MongoDB |
  | `PORT` | `3000` | Port d'écoute de l'API |

## Frontend (`cd frontend`)

| Commande | Effet |
|---|---|
| `npm start` (= `ng serve`) | Dev server → http://localhost:4200 |
| `npm run build` | Build de production |
| `npm test` | Tests unitaires (Karma + Jasmine) |

## Backend (`cd backend`)

| Commande | Effet |
|---|---|
| `npm run dev` | API en watch (`node --watch server.js`) |
| `npm start` | API en production |
| `npm run seed` | (Re)peuple MongoDB — **idempotent** (vide puis réinsère) |

> Lancer `npm run seed` après toute modification de [backend/seed/data.js](backend/seed/data.js)
> (ex. ajout d'un outil). Cf. @ADD-A-TOOL.md.

## Vérifier que ça tourne

```
GET http://localhost:3000/health      → { "status": "ok" }
GET http://localhost:3000/api/tools   → liste des outils (triée par order)
```

Le front consomme l'API via `ToolService` (base `environment.apiBaseUrl`).

## Pièges connus

- **`EADDRINUSE` sur le port 3000** : une instance de l'API tourne déjà. Arrêter le
  process existant (`lsof -i :3000`) ou changer `PORT` dans `.env` avant de relancer.
- **Pas de test backend** : aucun script `test` côté `backend/` — vérifier via
  `/health` + `/api/tools`.
- **Budgets SCSS Angular** : un stylesheet de composant trop volumineux fait échouer le
  build (déjà rencontré). Garder le SCSS sobre et factorisé via les tokens `--cc-*`.
