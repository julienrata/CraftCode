---
description: Amorce de contexte — restitue l'état du projet et l'intention présumée
---

Amorce de contexte en début de session. But : éviter de te faire ré-expliquer où
on en est. Tu **lis seulement** et tu restitues — tu ne modifies rien.

## 1. Lire l'état présent
- Le journal des décisions : `DECISIONS.md` (les dernières entrées surtout).
- L'état git : branche courante, `git status` (travail en cours non commité),
  `git log --oneline -5` (commits récents).
- Le cas échéant, les PR ouvertes (`gh pr list`) si pertinent.

## 2. Restituer (court)
En **trois lignes maximum**, sans détailler le diff :
- **Où on en est** : branche, ce qui est commité vs en cours, dernière décision.
- **Ce que je crois que tu veux faire** : l'intention probable de la session,
  déduite du travail en cours.
- **Point d'attention** s'il y en a un (travail non commité qui traîne, branche
  en retard sur la branche d'intégration, décision laissée ouverte).

## 3. Faire valider
Termine par une question fermée : « C'est bien ça, ou je me trompe ? » Attends la
correction du développeur avant d'entamer quoi que ce soit. Ne propose pas de
plan ici — `/sync` cadre le **présent**, pas la tâche à venir (ça, c'est `/brief`).

> Alternative : ce cadrage pourrait être automatisé via un hook `SessionStart`.
> On a préféré une commande explicite pour rester maître du moment et du coût.
