# Journal des décisions — CraftCode

Trace versionnée des **décisions structurantes** prises au fil du projet : choix
d'architecture, de dépendance, de schéma, de convention, renommage ou suppression.
But : garder un historique relisible (quoi, pourquoi, quelles options écartées) pour
décider moins « à chaud » et comprendre après coup pourquoi le code est ce qu'il est.

> Ce fichier complète l'historique git (le *quoi* du diff) en gardant le *pourquoi* et
> les **alternatives non retenues**, que le diff ne montre jamais.

## Quand ajouter une entrée

À chaque décision qui engage la suite : architecture, nouvelle dépendance, schéma de
base, convention transverse, renommage/suppression de fichier ou de route. Pas pour les
modifications de routine (le hook de résolution affiche déjà chaque édition).

## Format d'une entrée

```
## AAAA-MM-JJ — Titre court de la décision

- **Contexte** : le problème ou le besoin (1-2 phrases).
- **Décision** : ce qui est retenu.
- **Options écartées** : les alternatives sérieuses et pourquoi on les laisse.
- **Pourquoi** : le gain visé.
- **Trace** : branche / commit / PR si pertinent.
```

Entrées **antéchronologiques** (la plus récente en haut). La date au format `AAAA-MM-JJ`.

---

## 2026-06-17 — Pivot de la direction artistique vers une DA festive et animée

- **Contexte** : la DA « atelier / artisan » (papier, cuivre, teal, sobre,
  quasi sans animation) devait laisser place à une ambiance joviale, festive,
  plus moderne et vivante, sur tout le front.
- **Décision** : refonte des tokens `--cc-*` dans `styles.scss` (palette
  framboise `#D81B60` / violet `#7C3AED` / mandarine, dégradés `--cc-gradient-*`,
  rayons plus généreux + `--cc-radius-pill`, ombres expressives teintées +
  `--cc-shadow-glow`, tokens de mouvement `--cc-dur-*` / `--cc-ease-*` /
  `--cc-transition-*` / `--cc-stagger`, keyframes globales `cc-rise`/`cc-pop`).
  Animations CSS pures : entrée de page sur chaque feature, micro-interactions
  rebondies au survol, et apparition en cascade des grilles via une **utilitaire
  globale `.cc-stagger`** (classe posée sur le conteneur, anime les enfants
  directs).
- **Options écartées** : (1) dupliquer la cascade par composant via `@for`
  (rejeté — faisait dépasser le budget SCSS de `phase-guide` ET inopérant sur
  les hubs en `<ul>/<li>`, la carte n'étant pas enfant direct de la grille) ;
  (2) une librairie d'animation tierce (rejeté — aucune dépendance nouvelle,
  CSS/Angular suffit) ; (3) texte de héros en dégradé `background-clip` (rejeté —
  risque de contraste, on garde un texte plein).
- **Pourquoi** : moderniser l'app sans casser l'architecture par tokens ni
  l'accessibilité — `prefers-reduced-motion` neutralise toutes les nouvelles
  animations, contrastes vérifiés AA, `:focus-visible` et indices non chromatiques
  préservés. La centralisation de la cascade évite la duplication et les budgets.
- **Trace** : branche `feat/festive-design-system` (session du 2026-06-17).

## 2026-06-17 — Commandes /retro (feedback persisté) et /sync (amorce de contexte)

- **Contexte** : deux frictions récurrentes dans la collaboration dev ↔ Claude —
  les corrections de méthode se perdent d'une session à l'autre (à répéter), et
  chaque début de session impose de ré-expliquer où en est le projet.
- **Décision** : deux slash-commands sur le modèle de `/brief`. (1) `/retro` :
  en fin de session, formaliser ce qui a marché/coincé en 1–3 entrées `feedback`
  de la mémoire fichier (`MEMORY.md` + `memory/`), avec validation et anti-doublon.
  (2) `/sync` : en début de session, lire `DECISIONS.md` + l'état git + le WIP et
  restituer en ≤ 3 lignes l'état présent et l'intention présumée, à valider, sans
  rien modifier. Versions génériques ajoutées au `claude-code-starter-kit/`.
- **Options écartées** : pour `/retro`, un `FEEDBACK.md` versionné dans le dépôt
  (rejeté — le feedback de collaboration relève de la mémoire, pas du code, et la
  mémoire existe déjà pour ça). Pour `/sync`, un hook `SessionStart` automatique
  (rejeté pour l'instant — coûteux/bruyant à chaque démarrage ; une commande
  explicite garde la main sur le moment et le coût).
- **Pourquoi** : faire durer les corrections (moins de répétition) et supprimer le
  coût de ré-amorçage en début de session — compléments de `/brief` (cadre la
  tâche à venir) et du hook `verify-gate` (vérifie la clôture).
- **Trace** : branche `main` (session du 2026-06-17).

## 2026-06-17 — Porte de vérification (hook Stop) avant clôture

- **Contexte** : le principe « ne jamais affirmer 'c'est fait' sans avoir lancé
  `npm run check` » reposait uniquement sur la vigilance de l'assistant. Le hook
  `summarize-change.mjs` rend les changements visibles, mais rien ne garantit
  qu'ils ont été vérifiés.
- **Décision** : un hook `Stop` `verify-gate.mjs` qui, en fin de tour, repère
  dans le transcript les éditions de code (`frontend/`/`backend/`) postérieures au
  dernier `npm run check` et **bloque la clôture** (`decision: "block"`) tant
  qu'il en reste, en renvoyant la commande exacte à lancer. Garde anti-boucle via
  `stop_hook_active` ; toute erreur du hook ⇒ `exit 0` (ne bloque jamais le
  travail). Version générique ajoutée au `claude-code-starter-kit/`.
- **Options écartées** : un simple rappel non bloquant (rejeté — repose encore sur
  la vigilance, ce que l'idée vise à supprimer) ; détecter l'affirmation « c'est
  fait » en langage naturel (rejeté — non fiable, on gate sur un signal objectif :
  édition de code sans check postérieur).
- **Pourquoi** : faire respecter par l'outil la porte qualité (= la CI), pendant
  `Stop` du résumé `PostToolUse` — l'un montre, l'autre vérifie.
- **Trace** : branche `main` (session du 2026-06-17).

## 2026-06-17 — Outil « Mettre en place Claude Code » + kit de démarrage

- **Contexte** : besoin de documenter, dans l'app elle-même, comment installer
  Claude Code dans un projet (fichiers markdown, hooks, slash-commands & skills,
  settings.json & MCP), et de fournir un point de départ réutilisable hors de
  CraftCode.
- **Décision** : (1) un nouvel outil pédagogique `claude-code-setup` (hub +
  détail, 4 sujets) suivant ADD-A-TOOL.md à la lettre, contenu statique dans
  `core/data/` ; (2) un kit versionné `claude-code-starter-kit/` à la racine,
  généralisé depuis le setup réel de CraftCode (hooks, commandes `/brief` et
  `/add-module`, CLAUDE.md squelette, settings.json avec placeholder MCP par ENV).
- **Options écartées** : servir le contenu pédagogique via l'API/seed (rejeté —
  le contenu enseigné reste statique côté front, seul le registre Tool passe par
  la base, cf. STATE-AND-DATA.md) ; lier le kit aux chemins de CraftCode (rejeté
  au profit d'un kit autoportant et générique).
- **Pourquoi** : rendre la mise en place de Claude Code apprenable dans l'app et
  rejouable sur tout projet, sans secret ni dépendance au dépôt CraftCode.
- **Trace** : branche `main` (session du 2026-06-17).

## 2026-06-17 — Journal de décisions + résumé automatique des changements

- **Contexte** : les décisions prises en session avec Claude Code partaient trop vite,
  sans trace ni recul, et les modifications opérées par Claude n'étaient pas assez
  visibles pour être validées en connaissance de cause.
- **Décision** : (1) ce fichier `DECISIONS.md`, tenu par l'assistant, comme journal des
  décisions ; (2) un hook PostToolUse `summarize-change.mjs` qui affiche automatiquement
  un résumé (+/− lignes) après chaque `Edit`/`Write`/`MultiEdit`.
- **Options écartées** : un hook de log automatique des décisions (trop implicite, pas
  relu) ; s'appuyer uniquement sur claude-mem (dépend de l'outil mémoire, non versionné
  dans le dépôt). Pour le script : bash+git, écarté au profit de node `.mjs` pour rester
  aligné sur le hook existant `format-edited-file.mjs`.
- **Pourquoi** : décider moins à chaud, garder le *pourquoi* hors du diff, et voir chaque
  changement sans dépendre de la discipline de l'assistant.
- **Trace** : branche `chore/brief-command`.
