<!--
  CLAUDE.md — mémoire de projet pour Claude Code.

  Claude Code lit ce fichier au démarrage. C'est le MINIMUM VITAL : garde-le
  court et factuel. Remplace tous les <…> par tes valeurs, supprime ce que tu
  n'utilises pas. Les guides détaillés vivent dans des fichiers séparés que l'on
  « @importe » ci-dessous — ainsi ce fichier reste lisible.
-->

# <Nom du projet>

<Une ou deux phrases : ce que fait le projet, et où vit quoi.>
Ex. : Frontend dans `web/` · backend dans `api/` · base PostgreSQL.

## Documentation projet

<!-- Une ligne « @chemin.md » charge le fichier dans le contexte au démarrage.
     N'ajoute que ce qui existe réellement. -->

- @ARCHITECTURE.md — carte du projet, stack, flux de données.
- @COMMANDS.md — comment lancer, tester, vérifier.
- @CONVENTIONS.md — nommage, style, conventions de commit.
- @DECISIONS.md — journal des décisions structurantes (le *pourquoi*, hors du diff).

## Style de travail (assistant)

- **Sobriété** : répondre en prose, réserver les listes aux procédures et comparaisons.
- **Honnêteté des résultats** : ne jamais affirmer « c'est fait » sans avoir lancé
  la vérification (voir @COMMANDS.md) ; si un test échoue, le dire avec sa sortie.
- **Agir quand l'info suffit** : recommander plutôt que survoler ; ne poser une
  question que si elle change ce qu'on va faire.
- **Source de vérité = le code existant** : suivre les patterns déjà en place plutôt
  qu'en inventer de nouveaux.

## Décisions & traçabilité

- **Journal des décisions** (@DECISIONS.md) : à chaque décision structurante —
  architecture, nouvelle dépendance, schéma, convention transverse, renommage ou
  suppression — ajouter une entrée datée (contexte, décision, options écartées,
  pourquoi). Pas pour les modifications de routine.
- **Hooks** : un hook PostToolUse formate chaque fichier édité et résume le
  changement ; un hook Stop (`verify-gate.mjs`) bloque la clôture tant que du
  code édité n'a pas été vérifié par la commande de check (voir `.claude/hooks/`,
  à adapter à ton projet). Rien à faire — c'est automatique.
