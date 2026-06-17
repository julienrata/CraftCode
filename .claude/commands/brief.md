---
description: Cadre une tâche et impose des check-ins visibles
argument-hint: <description de la tâche>
---

Tâche brute du développeur : $ARGUMENTS

Tu travailles en trois phases. Ne saute aucune phase.

## Phase 1 — Cadrage (AVANT tout code)
Affiche, puis ARRÊTE-TOI :
- **Intention** : reformule en 1-2 phrases ce que tu as compris.
- **Périmètre** : liste les fichiers/dossiers que tu vas modifier ET ceux que tu
  ne toucheras pas. Aucun chemin = tu demandes lesquels.
- **Critères d'acceptation** : binaires. « Fait quand : … ».
- **Ambiguïtés** : au plus 3 questions. Sinon, déclare l'hypothèse retenue.
- **STOP.** Attends mon « go » explicite avant d'écrire la moindre ligne.

## Phase 2 — Exécution (seulement après « go »)
- Après CHAQUE étape, affiche une ligne d'état :
  `✅ [fait] · 📂 [fichiers touchés] · ➡️ [prochaine étape]`
- Avant toute décision structurante — architecture, nouvelle dépendance, schéma
  de base, suppression/renommage de fichier — **STOP** : présente 2 options
  maximum avec ta recommandation, et attends mon choix.
- Ne fais QUE ce qui est demandé. Aucun refactor, fichier, abstraction ou
  fonctionnalité en plus du périmètre de la phase 1.
- Si tu dois sortir du périmètre annoncé, signale-le explicitement et demande
  avant de continuer.

## Phase 3 — Clôture
- **Résumé** : ce qui a changé, ce qui reste, et la commande exacte de
  vérification.
- N'affirme « fait / corrigé » qu'après avoir lancé `npm run check` (front et/ou
  back selon la zone touchée) et collé sa sortie. Si un test échoue, dis-le.
