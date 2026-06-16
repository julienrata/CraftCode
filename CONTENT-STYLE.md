# Guide éditorial — CraftCode

La substance de CraftCode, c'est du **contenu pédagogique en français**. Ce guide fixe
le ton et la structure pour que tout nouveau contenu reste homogène. Source de vérité :
[code-review-practices.ts](frontend/src/app/core/data/code-review-practices.ts) et
[solid-principles.ts](frontend/src/app/core/data/solid-principles.ts).

## Voix « atelier / artisan du code »

- **Registre** : exigeant mais bienveillant. La revue de code « élève le code et l'équipe »,
  ce n'est jamais une « liste d'erreurs à corriger ».
- **Tutoiement du lecteur dans les conseils impératifs** :
  ✅ « Si une classe a plusieurs raisons de changer, **découpe-la**. »
  ✅ « **Méfie-toi** des classes trop grandes. »
  ❌ « L'utilisateur devra découper sa classe. » (3ᵉ personne distante)
- **Orienté valeur, pas réprimande** :
  ✅ « Transformer la revue en discussion constructive où chacun partage. »
  ❌ « Ne pas faire de revue bâclée. »
- **Concis** : une accroche = une phrase. Le `pourquoi` = une phrase qui justifie le gain
  (lisibilité, testabilité, confiance d'équipe…).

## Typographie française (obligatoire)

| Élément | ✅ | ❌ |
|---|---|---|
| Apostrophe | `qu'une`, `d'équipe` (typographique `'` U+2019) | `qu'une` (droite `'`) |
| Guillemets | « Responsabilité unique » (chevrons + espaces) | "Responsabilité unique" |
| Tiret d'incise | « — avant, pendant et après — » (cadratin) | « - avant - » |

> Aligne-toi sur le texte existant : le code utilise déjà `'` et `«　»`. Ne mélange pas
> les deux styles dans une même entrée.

## Structure d'une entrée de contenu

**Pratique de revue** (`Practice`) — titre court + accroche + pourquoi :
```ts
{ id: '0-0', icon: 'forum', titre: 'Communication et collaboration',
  accroche: 'Transformer la revue en discussion constructive où chacun partage…',
  pourquoi: 'Un climat positif renforce les relations et la qualité du code…' }
```

**Principe / patron** — progression pédagogique fixe :
`definition` (1 phrase) → `probleme` (ce que ça résout) → `pourquoi` (liste de gains) →
`exempleAvant` / `exempleApres` → `commentRespecter` (conseils impératifs, tutoiement).

### Exemples de code (champ `code`)
- **Avant / Après** avec `legende` explicite qui qualifie le verdict :
  ✅ `'Non conforme — UserManager cumule quatre responsabilités'`
  ✅ `'Conforme — responsabilités séparées, UserManager orchestre'`
- Illustratif, jamais exécuté : commentaires `/* créer */` plutôt qu'une implémentation
  complète. Court, lisible, centré sur le point enseigné.

## Règles de fond

- **Un `slug` est stable** : il sert d'URL et d'ancre. Ne jamais le renommer après coup
  (casse les liens et le localStorage). Cf. @ADD-A-TOOL.md.
- **Ne pas reformuler le contenu existant** sans raison : les `id`/`slug` y sont accrochés
  (avertissement explicite en tête de `code-review-practices.ts`).
- Champs **techniques en anglais** (`slug`, `icon`, `id`), champs **de contenu en français**
  (`titre`, `accroche`, `definition`…). Cf. @NAMING-CONVENTIONS.md.
- Icônes = noms Material textuels (`forum`, `architecture`). Cf. @DESIGN-SYSTEM.md.
