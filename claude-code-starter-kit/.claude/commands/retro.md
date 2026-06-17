---
description: Capture en fin de session ce qui a marché ou coincé, en mémoire feedback
argument-hint: "[note libre facultative sur la session]"
---

Note libre du développeur : $ARGUMENTS

Boucle de feedback persistée. But : que les corrections et les façons de
travailler validées **survivent à la session** au lieu d'être à répéter. Tu écris
dans la mémoire fichier du projet (le mécanisme `MEMORY.md` + `memory/`), pas dans
le dépôt.

Procède en trois temps, et ARRÊTE-TOI après le 1ᵉʳ :

## 1. Proposer (puis STOP)
- Relis la session : qu'est-ce qui a bien fonctionné, qu'est-ce qui a frotté, et
  quelle correction ou préférence le développeur a exprimée ?
- Propose **1 à 3 entrées** `feedback` candidates, chacune résumée en une ligne.
  Pas plus : on garde le signal, pas le bruit.
- Pour chaque candidate, vérifie d'abord s'il existe déjà une entrée qui la
  couvre (lis `MEMORY.md`) — si oui, propose de **mettre à jour** plutôt que de
  dupliquer.
- **STOP.** Attends que le développeur valide, amende ou retire des entrées.

## 2. Écrire (après validation)
Pour chaque entrée validée, crée un fichier dans `memory/` au format mémoire :

```markdown
---
name: <slug-kebab-case>
description: <résumé en une ligne, sert au rappel>
metadata:
  type: feedback
---

<le fait : ce qui a marché / la correction.>
**Pourquoi :** <la raison, le gain.>
**Comment l'appliquer :** <règle actionnable la prochaine fois.>
```

- Lie les entrées connexes avec `[[autre-nom]]`.
- Ajoute le pointeur dans `MEMORY.md` : `- [Titre](fichier.md) — accroche.`

## 3. Clôturer
Récapitule en une ligne par entrée écrite (ou « rien à retenir » si la session
n'a rien produit de durable). N'invente pas de feedback pour remplir.
