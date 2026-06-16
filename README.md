# CraftCode — Boîte à outils du développeur

Application web (stack MEAN) regroupant des outils pédagogiques pour développeurs.
Cette première version livre l'ossature complète + le premier outil : une **checklist
interactive de code review**.

Les futurs outils (Principes SOLID, Design Patterns GoF) apparaissent en cartes
« Bientôt disponible » et s'ajouteront sans refactor du cœur (un feature module Angular
+ une route API suffisent).

## Stack

- **MongoDB** (via Mongoose) — registre des outils + items de checklist
- **Express.js** — API REST sous `/api`
- **Angular 19** (standalone components, routing) + **Angular Material**
- **Node.js**

## Architecture

```
CraftCode/
├── backend/                  # API Express + MongoDB
│   ├── config/db.js          # Connexion MongoDB
│   ├── models/               # Schémas Mongoose (Tool, ChecklistItem)
│   ├── controllers/          # Logique des endpoints
│   ├── routes/               # Définition des routes (montées sous /api)
│   ├── seed/                 # Données + script de peuplement
│   └── server.js             # Point d'entrée
└── frontend/                 # Application Angular
    └── src/app/
        ├── core/             # Services + modèles (logique partagée)
        ├── shared/           # Composants réutilisables (tool-card)
        └── features/         # Une feature par page/outil (home, code-review)
```

## Prérequis

- Node.js 18+ et npm
- MongoDB en local (ou une URI Atlas)

## Démarrage

### 1. MongoDB

Assure-toi qu'une instance MongoDB tourne en local :

```bash
# macOS (Homebrew)
brew services start mongodb-community
```

### 2. Backend

```bash
cd backend
npm install
cp .env.example .env        # ajuste MONGO_URI / PORT si besoin
npm run seed                # peuple la base (outils + checklist)
npm run dev                 # démarre l'API sur http://localhost:3000
```

Endpoints disponibles :

- `GET /api/tools` — liste des outils du site
- `GET /api/code-review` — items de la checklist code review
- `GET /health` — sonde de santé

### 3. Frontend

Dans un second terminal :

```bash
cd frontend
npm install
npm start                   # démarre Angular sur http://localhost:4200
```

Ouvre **http://localhost:4200** :

- `/` — page d'accueil avec les cartes d'outils
- `/code-review` — la checklist interactive (état coché conservé en localStorage)

## Variables d'environnement (backend)

| Variable    | Description                       | Exemple                                    |
|-------------|-----------------------------------|--------------------------------------------|
| `MONGO_URI` | URI de connexion MongoDB          | `mongodb://127.0.0.1:27017/craftcode`      |
| `PORT`      | Port d'écoute de l'API            | `3000`                                     |

> Ne jamais committer de vraie valeur : seul `.env.example` est versionné.

## Ajouter un nouvel outil

1. **Backend** : ajouter un model si besoin, un controller + un fichier de routes,
   puis le monter dans `backend/routes/index.js`. Ajouter l'outil dans `backend/seed/data.js`.
2. **Frontend** : créer un dossier sous `src/app/features/<outil>/`, ajouter une route
   dans `src/app/app.routes.ts`. La page d'accueil affichera la carte automatiquement
   (registre servi par l'API).
