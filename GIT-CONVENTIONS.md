# Conventions Git — CraftCode

Le dépôt suit la spécification **[Conventional Commits](https://www.conventionalcommits.org/fr/)**.
Un historique normalisé reste lisible, se filtre par `type` et permet de générer un
changelog. Ce document est la source de vérité des messages de commit et du nommage des
branches ; il prolonge la section 3 de @NAMING-CONVENTIONS.md.

## Format d'un message

```
type(scope): description

[corps optionnel]

[pied de page optionnel]
```

- **`type`** : obligatoire, en minuscules (voir tableau ci-dessous).
- **`scope`** : optionnel, entre parenthèses, en minuscules (`ui`, `front`, `back`, `seed`,
  `solid`, `phase-guide`…). Désigne la zone touchée.
- **`description`** : obligatoire, **en français**, à l'impératif présent, **sans
  majuscule initiale ni point final**. Une ligne, concise (≤ 72 caractères visés).

| Forme | ✅ Exemple réel du dépôt |
|---|---|
| `type: description` | `feat: ajout best practices && amélioration front` |
| `type(scope): description` | `feat(ui): design system marque « atelier » + pages bonnes pratiques` |
| `type: description` (docs) | `docs: documentation projet pour guider Claude Code` |
| `init` (commit initial) | `init: CraftCode project` |

> Typographie française dans les descriptions : aligne-toi sur @CONTENT-STYLE.md
> (apostrophe `'`, guillemets « … »). Ex. `feat(ui): design system marque « atelier »`.

## Types autorisés

| Type | Quand l'utiliser | Exemple |
|---|---|---|
| `feat` | Nouvelle fonctionnalité (front ou back) | `feat: ajout des pages SOLID et Design Patterns (GoF)` |
| `fix` | Correction de bug | `fix(phase-guide): corrige la persistance localStorage` |
| `docs` | Documentation seule (`*.md`, commentaires) | `docs: documentation projet pour guider Claude Code` |
| `style` | Mise en forme sans impact logique (Prettier, indentation) | `style(front): applique Prettier sur les composants` |
| `refactor` | Réécriture sans changement de comportement | `refactor: extrait BreadcrumbComponent` |
| `perf` | Amélioration de performance | `perf(front): lazy-load les pages de détail` |
| `test` | Ajout ou correction de tests | `test(back): ajoute la suite Vitest du seed` |
| `build` | Build, dépendances, `package.json` | `build(front): ajoute ESLint et la config` |
| `ci` | Intégration continue, workflows | `ci: ajoute le pipeline de build` |
| `chore` | Tâches diverses sans code applicatif (`.editorconfig`, config) | `chore: ajoute .prettierrc et .editorconfig` |
| `revert` | Annulation d'un commit précédent | `revert: feat(ui): design system marque « atelier »` |

> `init` est réservé au **premier commit** du dépôt (`init: CraftCode project`). Pour la
> suite, on utilise les types Conventional Commits ci-dessus.

### Changement cassant (breaking change)

- Suffixe `!` après le type/scope **et/ou** pied de page `BREAKING CHANGE:`.
  ```
  feat(back)!: renomme l'endpoint /api/tools en /api/catalog

  BREAKING CHANGE: le front doit consommer /api/catalog. Cf. STATE-AND-DATA.md.
  ```

## Corps & pied de page (optionnels)

- **Corps** : explique le *pourquoi* (pas le *comment*, lisible dans le diff). Phrases
  complètes, en français. Séparé de la description par une ligne vide.
- **Pied de page** : références d'issues (`Closes #12`), `BREAKING CHANGE:`, co-auteurs.

## Branches

`type/description-kebab-case` — `type` reprend les types de commit, description en
`kebab-case` (anglais technique ou français de contenu, cf. règle des slugs dans
@NAMING-CONVENTIONS.md).

| ✅ Exemple | ❌ Contre-exemple |
|---|---|
| `feature/best-practices` | `bestPractices` |
| `fix/seed-idempotence` | `julien-branch` |
| `docs/git-conventions` | `new-stuff` |

> `feature/` est la forme longue tolérée pour `feat`. `main` est la branche d'intégration
> (cf. en-tête de session : *Main branch : main*).

## Pull requests

- Titre de PR = même format qu'un commit (`type(scope): description`).
- Une PR = une intention claire. Squash recommandé si l'historique de branche est bruité,
  en conservant un message final conforme.

## Anti-exemples

| ❌ | Pourquoi c'est rejeté | ✅ Correction |
|---|---|---|
| `Added best practices` | Pas de type, anglais, majuscule | `feat: ajout des bonnes pratiques` |
| `FEAT: design system` | Type en capitales | `feat: design system` |
| `feat: Ajout du menu.` | Majuscule + point final | `feat: ajout du menu` |
| `update` | Pas de type, vague | `chore: met à jour les dépendances` |
| `wip` | Non descriptif | (à squasher avant merge) |
