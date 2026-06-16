# État & données — CraftCode

Où vit chaque donnée, et avec quels patterns. Respecter cette répartition évite de mettre
un état au mauvais endroit.

## Les trois lieux de la donnée

| Donnée | Lieu | Pourquoi |
|---|---|---|
| **Contenu pédagogique** (SOLID, patterns, pratiques) | Statique dans `core/data/*.ts` | Versionné, typé, pas besoin de base |
| **Registre d'outils** (`Tool`) + checklist (`ChecklistItem`) | MongoDB via l'API | Données « de catalogue », servies à l'accueil |
| **État utilisateur** (cases cochées) | `localStorage` du navigateur | Personnel, éphémère — **jamais en base** |

> Règle : le contenu enseigné ne passe **pas** par l'API. Seul le catalogue d'outils le
> fait. Cf. @ARCHITECTURE.md.

## Pattern signals

Convention vue dans [phase-guide.component.ts](frontend/src/app/features/phase-guide/phase-guide.component.ts) :

- **Signal d'état exposé au template** : `readonly`.
  `readonly section = signal<Section | undefined>(undefined);`
- **Signal interne** : `private readonly`.
  `private readonly checkedIds = signal<Set<string>>(new Set());`
- **Valeur dérivée** : `computed()`, jamais un getter manuel.
  `readonly progress = computed(() => …);`
- **Mutation immuable** d'un signal de collection (nouvelle référence, pas de mutation
  en place) :
  ```ts
  const next = new Set(this.checkedIds());
  if (next.has(id)) next.delete(id);
  else next.add(id);
  this.checkedIds.set(next);
  ```

## Param de route réactif

Pour une page de détail (`/x/:slug`), résoudre l'entrée de façon **réactive** — couvre
le chargement initial ET la navigation entre routes sœurs (Angular réutilise le composant) :

```ts
this.route.paramMap.pipe(takeUntilDestroyed()).subscribe((params) => {
  const slug = params.get('phase') ?? '';
  const entry = this.resolve(slug);
  if (!entry) { this.router.navigate(['/parent']); return; } // slug inconnu → repli
  this.slug.set(slug);
  this.entry.set(entry);
});
```

- `inject(ActivatedRoute)` / `inject(Router)` en champ `private`.
- `takeUntilDestroyed()` pour la désinscription (pas de fuite).
- Slug inconnu ⇒ redirection vers le hub parent, jamais d'écran cassé.

## localStorage

- **Clé namespacée par points** : `craftcode.<domaine>.<slug>.<quoi>`.
  ✅ `craftcode.phase.${slug}.checked`
- **Toujours encadrer la lecture d'un `try/catch`** (JSON corrompu, mode privé) et
  renvoyer une valeur vide par défaut :
  ```ts
  try {
    const raw = localStorage.getItem(key);
    return raw ? new Set<string>(JSON.parse(raw)) : new Set<string>();
  } catch { return new Set<string>(); }
  ```
- Sérialiser un `Set` via `Array.from(set)`.

## Accès API

- Un **service par ressource**, `@Injectable({ providedIn: 'root' })`, `HttpClient`
  injecté en champ `private`, URL dérivée de l'environnement :
  `private readonly baseUrl = ${environment.apiBaseUrl}/tools;`
- Le service renvoie un `Observable<T[]>` typé par le modèle ; pas de logique d'UI dedans.
  Cf. [tool.service.ts](frontend/src/app/core/services/tool.service.ts).
