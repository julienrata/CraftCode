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

## 2026-06-18 — Ajout de l'outil pédagogique « Clean Code »

- **Contexte** : enrichir le catalogue d'un outil sur les chapitres-clés de
  *Clean Code* (Robert C. Martin), sur le même modèle que SOLID (hub + détail),
  sans refactor du cœur.
- **Décision** : suivre ADD-A-TOOL.md à la lettre en calquant SOLID. Nouveau
  modèle `CleanCodePrinciple` (champs techniques anglais `slug`/`icon`, contenu
  FR), constante statique `CLEAN_CODE_PRINCIPLES` (8 chapitres : noms, fonctions,
  commentaires, mise en forme, gestion des erreurs, limites, classes, tests),
  hub `/clean-code` (grille de cartes) + détail `/clean-code/:chapitre`
  (résolution réactive du param, repli vers le hub si slug inconnu, réutilise
  `SequentialNavComponent` et `neighborSlug`). Routes lazy, entrée `navLinks`
  après SOLID, entrée seed `Tool` `order: 6`. Contenu pédagogique **statique
  côté front** ; seul le registre `Tool` passe par l'API (cf. STATE-AND-DATA.md).
- **Options écartées** : (1) réutiliser tel quel le modèle `SolidPrinciple`
  (rejeté — le champ `lettre` est propre à l'acronyme SOLID ; on le remplace par
  `numero` de chapitre, tout en gardant `nomEn`/`nomFr` qui restent pertinents) ;
  (2) un composant de détail générique partagé SOLID ↔ Clean Code (rejeté — même
  raison que la factorisation des détails du 2026-06-17 : abstraction « au cas
  où », templates de contenu trop proches mais pas identiques) ; (3) servir le
  contenu via l'API/seed (rejeté — le contenu enseigné reste statique).
- **Pourquoi** : extensibilité par addition, cohérence visuelle (DA festive,
  tokens `--cc-*`, mixins `shared/styles/detail`) et structurelle avec les outils
  existants, sans dépendance ni refactor.
- **Trace** : branche `feat/clean-code` — `npm run check` vert (front : lint +
  build ; back : lint + 9 tests). Re-seed (`npm run seed`) non lancé (écrit en
  base) — à exécuter au déploiement.

## 2026-06-17 — Toolbar (shell) alignée sur la DA festive

- **Contexte** : la toolbar gardait l'esthétique « atelier » sobre (fond
  `--cc-surface` plat, filet `--cc-border`, texte sombre) et détonnait avec le
  reste du front déjà migré vers la DA festive (héros et cartes à dégradé).
- **Décision** : restyler le shell sans toucher au routing ni à `navLinks`.
  Barre en `--cc-gradient-festive` + `--cc-shadow-2`, texte clair
  (`--cc-on-primary`) ; icône de marque dans une pastille
  (`brand__badge`, `--cc-radius-pill`, teinte `--cc-primary-tint`) ; liens de
  nav en **pilules** (`--cc-radius-pill`) avec survol clair rebondi
  (`--cc-transition-bounce`) ; **lien actif** = pilule pleine claire à texte
  framboise (contraste fort, indice non chromatique via le fond), en plus de
  `aria-current`. Seul changement de markup : un `<span class="brand__badge">`
  autour de l'icône. `min-height` tactile tokenisé (`44px` → `var(--cc-space-7)`,
  48px ≥ 44px).
- **Options écartées** : (1) garder le fond clair en ne colorant que les liens
  (rejeté — l'écart « atelier » venait surtout du fond plat) ; (2) ajouter un
  garde `prefers-reduced-motion` local (rejeté — le bloc global de `styles.scss`
  neutralise déjà toutes les transitions avec `!important`, doublon inutile) ;
  (3) souligner le lien actif comme avant (`inset box-shadow`) plutôt qu'une
  pilule pleine (rejeté — moins lisible et moins festif sur le dégradé).
- **Pourquoi** : cohérence visuelle du shell avec les pages migrées, sans
  refactor ni dépendance, accessibilité préservée (focus-visible, aria-current,
  contraste AA texte clair sur dégradé, reduced-motion via le global).
- **Trace** : `npm run check` vert (lint + build).

## 2026-06-17 — Mixins SCSS partagés (`shared/styles/`) pour le CSS dupliqué

- **Contexte** : du SCSS strictement identique était recopié entre features —
  blocs des pages de détail (`.code`, socle `.example`, section de contenu,
  liste), badge de rôle et carte `.practice` (aperçu des bonnes pratiques ↔
  page-support des phases). Refactor à rendu constant, sans toucher au markup
  ni aux tokens.
- **Décision** : introduire un premier système de **partiels SCSS de mixins**
  sous `frontend/src/app/shared/styles/` (`_detail.scss`, `_badge.scss`,
  `_practice-card.scss`), importés par `@use '../../shared/styles/x' as *` dans
  chaque composant et appelés via `@include`. Le mixin est inclus **sous le bloc
  BEM local** (préfixe propre à la feature conservé) ; les variantes spécifiques
  (`--avoid/--prefer`, bord coloré, `--done`) restent locales. Le mixin se
  ré-expanse dans le scope de chaque composant → CSS émis et rendu identiques.
- **Options écartées** : (1) des **classes utilitaires globales** dans
  `styles.scss` (façon `.cc-stagger`) — rejeté : changerait la portée
  (global vs styles scopés par attribut) et imposerait des ajouts de classes
  dans les templates ; le mixin garde le scoping et un CSS byte-identique ;
  (2) configurer `stylePreprocessorOptions.includePaths` dans `angular.json`
  pour raccourcir les imports — rejeté : modifier la config de build pendant un
  refactor pur, pour un gain cosmétique sur des chemins relatifs courts
  (`../../shared/styles/…`).
- **Point d'attention** : une déclaration placée **après** une règle imbriquée
  issue d'un mixin déclenche la dépréciation Sass *mixed-declarations* ; placer
  la déclaration **avant** le `@include` (cf. `.example` de design-pattern-detail).
- **Report** : l'item « chrome des hubs » (`.hero`, header, grille — items D-G
  de l'audit, partie F) est **différé** : il porte sur les mêmes fichiers qu'une
  feature « confettis » en cours (non commitée) et le `.hero` n'y est plus
  identique d'un hub à l'autre. À reprendre sur un arbre propre une fois les
  confettis intégrés.
- **Trace** : branche `refactor/extract-shared-frontend` — commits `c63baba`
  (détail), `141e93c` (badge), `9d954cb` (carte pratique).

## 2026-06-17 — Factorisation des pages de détail (nav séquentielle + utils)

- **Contexte** : les 4 pages de détail (SOLID, Design Patterns, Claude Code,
  phases de revue) dupliquaient à l'identique le bloc de navigation
  précédent/suivant (template + ~70 lignes de SCSS chacune) et l'arithmétique
  de résolution du voisin ; la persistance localStorage d'un `Set` coché était
  répétée entre la checklist Code Review et les phases de revue. Refactor à
  comportement constant, sans changement d'UI, de route, de slug ni de clé.
- **Décision** : trois extractions ciblées. (A) un composant présentationnel
  partagé `shared/components/sequential-nav` (`SequentialNavComponent`, piloté
  par `prev`/`next`/`routeBase`/`navLabel`, item `{slug,label,ariaLabel}`) ;
  (B) `core/utils/checklist-storage.ts` (`loadCheckedSet`/`persistCheckedSet`,
  clé fournie par l'appelant) ; (C) `core/utils/sequential-nav.ts`
  (`neighborSlug`). Création du dossier `core/utils/` pour les fonctions pures.
- **Options écartées** : (1) un composant de détail générique unique (rejeté —
  les templates de contenu divergent trop, ç'aurait été une abstraction « au cas
  où ») ; (2) une classe de base abstraite pour la logique TS commune des détails
  (rejeté — `inject()` + signals en classe de base peu idiomatiques ici, gain
  faible vs. l'util pur) ; (3) factoriser aussi le « chrome » SCSS des hubs
  (`.hero`, header, grilles) et les badges de rôle (différé — partage de SCSS
  scopé via global/mixins plus exposé aux régressions visuelles, à traiter
  séparément avec vérification de rendu).
- **Pourquoi** : supprimer ~390 lignes dupliquées (nav) + la logique localStorage
  et d'index répétée, sans refactor du cœur ni dépendance nouvelle ; le rendu et
  l'accessibilité (aria-labels, cible tactile, `:focus-visible`) restent
  identiques. `npm run check` (lint + build) vert après chaque extraction.
- **Trace** : branche `refactor/extract-shared-frontend` — commits `b68e7da`
  (A), `98ee1df` (B), `f05eb67` (C).

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
