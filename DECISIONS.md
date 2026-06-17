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
