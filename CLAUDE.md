# CraftCode

Frontend Angular (standalone components + signals) dans `frontend/` · backend Node/Express + Mongoose dans `backend/`.

**IMPORTANT : avant de travailler sur le code, lire les documents ci-dessous. La source de vérité reste le code existant.**

## Documentation projet

- @ARCHITECTURE.md — carte du projet, stack, flux de données, règle d'extensibilité.
- @ADD-A-TOOL.md — procédure pas-à-pas pour ajouter un outil pédagogique (front + back).
- @STATE-AND-DATA.md — où vit chaque donnée, patterns signals / route / localStorage / API.
- @CONTENT-STYLE.md — guide éditorial : ton « atelier », typographie FR, structure du contenu.
- @DESIGN-SYSTEM.md — tokens `--cc-*`, BEM, accessibilité (aucune valeur en dur).
- @NAMING-CONVENTIONS.md — conventions de nommage (Angular, Node, Git, TS/JS).
- @GIT-CONVENTIONS.md — Conventional Commits : types, scope, branches, PR.
- @COMMANDS.md — lancer, seed, tester, pièges connus.
- @DECISIONS.md — journal des décisions structurantes (le *pourquoi* et les options écartées, hors du diff).

## Style de travail (assistant)

Principes adaptés du comportement par défaut de Claude, retenus pour ce dépôt :

- **Sobriété de format** : répondre en prose, pas en listes à puces ni en gras systématique.
  Réserver puces, titres et tableaux aux cas où ils clarifient vraiment (procédure, comparaison).
- **Honnêteté des résultats** : rapporter fidèlement ce qui s'est passé. Si un test échoue,
  le dire avec sa sortie ; si une étape est sautée, le signaler. Ne jamais affirmer « c'est
  fait / corrigé » sans avoir lancé la vérification (`npm run check`). Cf. @COMMANDS.md.
- **Agir quand l'info suffit** : ne pas re-poser une décision déjà tranchée ni dérouler des
  options qu'on ne suivra pas ; recommander plutôt que de survoler. Poser une question seulement
  si elle change ce qu'on va faire.
- **Erreurs assumées sobrement** : reconnaître l'erreur, rester sur le problème, sans excuses
  excessives. Pousser un désaccord technique de façon constructive plutôt que d'acquiescer.
- **Transparence des commandes à valider** : avant toute commande soumise à validation
  (Bash en particulier), expliquer en une phrase ce qu'elle fait et pourquoi — surtout les
  pipes, redirections, flags non évidents et tout ce qui écrit/supprime. Ne jamais enchaîner
  une commande sans cette description : la validation doit être éclairée, pas réflexe.

## Décisions & traçabilité

Deux mécanismes aident le développeur à décider moins « à chaud » et à voir ce qui change :

- **Journal des décisions** (@DECISIONS.md) : à chaque décision structurante — architecture,
  nouvelle dépendance, schéma de base, convention transverse, renommage/suppression de
  fichier ou de route — ajouter une entrée datée (contexte, décision, options écartées,
  pourquoi). Le diff montre le *quoi* ; le journal garde le *pourquoi* et les alternatives.
  Pas pour les modifications de routine.
- **Résumé automatique des changements** : le hook `.claude/hooks/summarize-change.mjs`
  (PostToolUse) affiche après chaque `Edit`/`Write`/`MultiEdit` un résumé +/− du fichier
  touché. Visibilité sans dépendre de la vigilance de l'assistant — rien à faire.
