# Conventions de nommage — CraftCode

> Conventions **inférées du code existant** (source de vérité). Chaque règle s'appuie
> sur un exemple réel du dépôt. Les écarts constatés sont signalés en _Note_.

---

## 1. Frontend Angular

Standalone components + signals. Arborescence : `core/` (models, data, services),
`features/` (une page = un dossier), `shared/` (composants transverses).

### Fichiers & dossiers

| Élément | Règle | ✅ Exemple réel | ❌ Contre-exemple |
|---|---|---|---|
| Dossier de feature | `kebab-case`, nom de la page | `features/design-pattern-detail/` | `features/DesignPatternDetail/` |
| Composant | `nom.component.{ts,html,scss}` | `solid-detail.component.ts` | `solidDetail.ts` |
| Modèle | `nom.model.ts` (`kebab-case`) | `solid-principle.model.ts` | `SolidPrinciple.ts` |
| Données statiques | `nom.ts` (`kebab-case`, pluriel) | `core/data/solid-principles.ts` | `core/data/solidData.ts` |
| Service | `nom.service.ts` | `core/services/tool.service.ts` | `core/services/Tools.ts` |

### Composants & sélecteurs

- **Classe** : `PascalCase` + suffixe `Component`. ✅ `SolidDetailComponent` · ❌ `SolidDetail`
- **Sélecteur** : préfixe `app-` + `kebab-case`. ✅ `selector: 'app-phase-guide'` · ❌ `selector: 'phaseGuide'`

### Services & injection

- Classe `PascalCase` + suffixe `Service`, `@Injectable({ providedIn: 'root' })`.
- Injection via `inject()` dans un champ `private`, URL de base en `readonly`.
  ✅ `private http = inject(HttpClient);` / `private readonly baseUrl = …` ([tool.service.ts](frontend/src/app/core/services/tool.service.ts))
  ❌ injection par constructeur `constructor(private http: HttpClient)`

### Signals

- `camelCase` ; signal d'état exposé en `readonly`, signal interne en `private readonly`.
  ✅ `readonly section = signal<Section | undefined>(undefined);`
  ✅ `private readonly checkedIds = signal<Set<string>>(new Set());`
- Valeur dérivée via `computed()`. ✅ `readonly progress = computed(() => …)` · ❌ getter manuel `get progress()`

### Routes

- Chemins en `kebab-case`, **lazy loading** systématique via `loadComponent`.
  ✅ `{ path: 'design-patterns', loadComponent: () => import(...).then(m => m.DesignPatternsComponent) }`
  ❌ `component: DesignPatternsComponent` (import direct, non lazy)
- Paire hub / détail : `xxx` puis `xxx/:param`. ✅ `solid` + `solid/:principe`
- Wildcard de repli en fin de table. ✅ `{ path: '**', redirectTo: '' }`

> **Note (incohérence) — langue des paramètres de route.** Mélange français / anglais :
> `:principe` (FR) vs `:phase` et `:pattern` (EN). Forme majoritaire : nom contextuel
> du domaine, sans règle stricte de langue.

### SCSS & tokens du design system

- **Classes en BEM** : `bloc__element--modificateur`.
  ✅ `.principle-card__title`, `.badge--equipe` · ❌ `.principleCardTitle`, `.badgeEquipe`
- **Tokens CSS** : tous préfixés `--cc-` (espacements, couleurs, rayons, ombres, typo).
  ✅ `var(--cc-space-5)`, `var(--cc-primary)`, `var(--cc-radius-md)`, `var(--cc-fs-h3)`, `var(--cc-lh-tight)`
  ❌ valeur en dur `padding: 24px;` ou `color: #b5651d;`
- Racine de composant scopée via `:host { display: block; … }`.

> **Note (incohérence) — préfixe de bloc racine.** `best-practices` abrège en `.bp-header`
> alors que `solid` garde le nom complet `.solid-header`. Forme majoritaire : nom de feature complet.

---

## 2. Backend Node

Express + Mongoose, CommonJS (`require` / `module.exports`). Dossiers en minuscules :
`controllers/`, `models/`, `routes/`, `config/`, `seed/`.

### Fichiers

| Élément | Règle | ✅ Exemple réel | ❌ Contre-exemple |
|---|---|---|---|
| Modèle | `PascalCase` singulier | `models/Tool.js`, `models/ChecklistItem.js` | `models/tools.js` |
| Contrôleur | `camelCase` + `Controller` | `controllers/toolController.js` | `controllers/ToolCtrl.js` |
| Routes | `camelCase` + `Routes` | `routes/toolRoutes.js` | `routes/tool-routes.js` |
| Config / util | minuscule courte | `config/db.js` | `config/Database.js` |

### Modèles (Mongoose)

- `mongoose.model('Tool', toolSchema)` : nom `PascalCase` singulier, variable de schéma
  `camelCase` + `Schema`. ✅ `const toolSchema = new mongoose.Schema(…)` · ❌ `const ToolSchema`
- Champs de document en `camelCase`. ✅ `slug, name, description, icon, route, available, order`

### Seed data

- Tableaux nommés par leur contenu, en `camelCase`. ✅ `const tools = [...]`, `const checklist = [...]`
- Champs `camelCase` anglais. ✅ `{ slug, name, icon, route, available, order }` · ❌ `{ Slug, Nom }`
- Export groupé en fin de fichier. ✅ `module.exports = { tools, checklist };`

### Slugs

- `kebab-case`. **Anglais** pour le technique, **français** pour le contenu pédagogique.
  ✅ `code-review`, `solid`, `design-patterns` (technique) · ✅ `bonnes-pratiques` (contenu)
  ❌ `bonnesPratiques`, `BonnesPratiques`

### Endpoints API

- Montés sous `/api`, ressources en `kebab-case`, pluriel quand collection.
  ✅ `router.use('/tools', …)` → `GET /api/tools` · ✅ `/api/code-review` · ❌ `/api/getTools`
- Commentaire de contrat au-dessus du handler. ✅ `// GET /api/tools → liste des outils du site`

### Variables & fonctions

- `camelCase`, fonctions verbe d'action. ✅ `getTools`, `connectDB` · ❌ `Tools()`, `get_tools`
- Variables d'environnement en `SCREAMING_SNAKE_CASE`. ✅ `process.env.MONGO_URI`, `process.env.PORT`

---

## 3. Git & commits

### Branches

- `type/description-kebab-case`. ✅ `feature/best-practices` · ❌ `bestPractices`, `julien-branch`

### Messages de commit

- **Conventional Commits** : `type(scope): description`, scope **optionnel**, description en **français**.

| Forme | ✅ Exemple réel |
|---|---|
| `type: description` | `feat: ajout best practices && amélioration front` |
| `type(scope): description` | `feat(ui): design system marque « atelier » + pages bonnes pratiques` |
| `type: description` (initial) | `init: CraftCode project` |

- Types observés : `feat`, `init`. Scope vu : `(ui)`.
- ❌ Contre-exemples : `Added best practices` (pas de type), `FEAT: …` (type en capitales).

> **Note.** Historique court (3 commits) : `refactor:`, `fix:`, etc. ne sont pas encore
> attestés mais découlent de la convention Conventional Commits adoptée.

---

## 4. Général TS / JS

| Élément | Casing | ✅ Exemple réel | ❌ Contre-exemple |
|---|---|---|---|
| Variable / propriété | `camelCase` | `checkedIds`, `baseUrl`, `roleKey` | `checked_ids` |
| Fonction / méthode | `camelCase` (verbe) | `resolveSection`, `getTools` | `SectionResolve` |
| Interface | `PascalCase`, sans préfixe `I` | `SolidPrinciple`, `NavLink`, `Section` | `ISolidPrinciple` |
| Type / union | `PascalCase` | `RoleKey`, `DesignPatternCategory` | `roleKey` (type) |
| Constante de module | `SCREAMING_SNAKE_CASE` | `SOLID_PRINCIPLES`, `SLUG_TO_NUMERO`, `PHASE_SLUGS` | `solidPrinciples` |
| Clé `localStorage` | namespacée par points | `craftcode.phase.${slug}.checked` | `phaseChecked` |

- **Valeurs d'union** : `kebab-case`/mot simple en littéral. ✅ `type RoleKey = 'equipe' | 'auteur' | 'relecteur' | 'mixte'`
- **Enums** : aucun `enum` TS dans le code — les unions de littéraux sont préférées. → _convention : préférer les unions._

> **Note (incohérence) — langue des champs d'interface.** Champs techniques en anglais
> (`slug`, `icon`, `id`, `order`, `route`), champs de contenu en français
> (`lettre`, `nomFr`, `probleme`, `pourquoi`, `exempleAvant`, `titre`, `accroche`).
> Règle de fait : **technique = anglais, contenu métier = français.**
