/**
 * Données de seed : registre des outils + items de la checklist code review.
 * Séparé du script de seed pour rester lisible et facile à étendre.
 */

const tools = [
  {
    slug: 'code-review',
    name: 'Checklist Code Review',
    description:
      'Une checklist interactive des bonnes pratiques à vérifier lors d’une revue de code.',
    icon: 'fact_check',
    route: '/code-review',
    available: true,
    order: 1,
  },
  {
    slug: 'bonnes-pratiques',
    name: 'Les bonnes pratiques de la Code Review',
    description:
      'Un parcours en 8 étapes — avant, pendant et après la revue — pour faire de chaque relecture un moment qui élève le code et l’équipe.',
    icon: 'menu_book',
    route: '/bonnes-pratiques',
    available: true,
    order: 2,
  },
  {
    slug: 'solid',
    name: 'Principes SOLID',
    description:
      'Comprendre et appliquer les cinq principes SOLID de la conception orientée objet.',
    icon: 'architecture',
    route: '/solid',
    available: true,
    order: 3,
  },
  {
    slug: 'design-patterns',
    name: 'Design Patterns (GoF)',
    description:
      'Explorer les patrons de conception du Gang of Four avec des exemples concrets.',
    icon: 'extension',
    route: '/design-patterns',
    available: true,
    order: 4,
  },
  {
    slug: 'claude-code-setup',
    name: 'Mettre en place Claude Code',
    description:
      'Les quatre briques pour installer Claude Code dans un projet : fichiers markdown, hooks, slash-commands & skills, settings.json & serveurs MCP.',
    icon: 'terminal',
    route: '/claude-code-setup',
    available: true,
    order: 5,
  },
];

const checklist = [
  // --- Lisibilité & Nommage ---
  {
    category: 'Lisibilité & Nommage',
    label: 'Les noms révèlent l’intention',
    description:
      'Variables, fonctions et classes sont nommées pour expliquer ce qu’elles font, sans abréviation obscure.',
    order: 1,
  },
  {
    category: 'Lisibilité & Nommage',
    label: 'Pas de code commenté laissé en place',
    description:
      'Le code mort ou commenté a été supprimé ; l’historique git suffit à le retrouver.',
    order: 2,
  },
  {
    category: 'Lisibilité & Nommage',
    label: 'Les commentaires expliquent le « pourquoi »',
    description:
      'Les commentaires justifient les choix non évidents plutôt que de paraphraser le code.',
    order: 3,
  },
  {
    category: 'Lisibilité & Nommage',
    label: 'Formatage cohérent',
    description:
      'Indentation, style et conventions sont homogènes avec le reste du projet (linter/formatter).',
    order: 4,
  },

  // --- Tests ---
  {
    category: 'Tests',
    label: 'Les nouveaux comportements sont testés',
    description:
      'Chaque nouvelle fonctionnalité ou correction est couverte par au moins un test.',
    order: 1,
  },
  {
    category: 'Tests',
    label: 'Les cas limites sont couverts',
    description:
      'Valeurs nulles, vides, négatives ou extrêmes sont testées, pas seulement le cas nominal.',
    order: 2,
  },
  {
    category: 'Tests',
    label: 'Les tests sont lisibles et isolés',
    description:
      'Chaque test vérifie une chose, sans dépendre de l’ordre d’exécution ni d’un état partagé.',
    order: 3,
  },

  // --- Sécurité ---
  {
    category: 'Sécurité',
    label: 'Aucun secret codé en dur',
    description:
      'Mots de passe, clés API et tokens passent par des variables d’environnement, jamais le code.',
    order: 1,
  },
  {
    category: 'Sécurité',
    label: 'Les entrées utilisateur sont validées',
    description:
      'Toute donnée externe est validée et assainie avant traitement (injection, XSS).',
    order: 2,
  },
  {
    category: 'Sécurité',
    label: 'Les erreurs ne fuitent pas d’infos sensibles',
    description:
      'Les messages d’erreur exposés ne révèlent ni stack trace ni détails internes au client.',
    order: 3,
  },
  {
    category: 'Sécurité',
    label: 'Les dépendances sont à jour et sûres',
    description:
      'Pas de dépendance vulnérable connue ; les versions sont épinglées de façon raisonnable.',
    order: 4,
  },

  // --- Performance ---
  {
    category: 'Performance',
    label: 'Pas de requête dans une boucle (N+1)',
    description:
      'Les accès base de données ou réseau sont regroupés plutôt que répétés dans une boucle.',
    order: 1,
  },
  {
    category: 'Performance',
    label: 'Pas de calcul inutile répété',
    description:
      'Les résultats coûteux et constants sont mémorisés ou sortis de la boucle.',
    order: 2,
  },
  {
    category: 'Performance',
    label: 'Les ressources sont libérées',
    description:
      'Connexions, fichiers et abonnements sont fermés/désabonnés pour éviter les fuites.',
    order: 3,
  },

  // --- Architecture & SOLID ---
  {
    category: 'Architecture & SOLID',
    label: 'Les fonctions font une seule chose',
    description:
      'Chaque fonction a une responsabilité unique et un niveau d’abstraction cohérent.',
    order: 1,
  },
  {
    category: 'Architecture & SOLID',
    label: 'Pas de duplication (DRY)',
    description:
      'La logique répétée est factorisée dans une fonction ou un module réutilisable.',
    order: 2,
  },
  {
    category: 'Architecture & SOLID',
    label: 'Faible couplage entre modules',
    description:
      'Les modules dépendent d’abstractions, pas d’implémentations concrètes (inversion de dépendance).',
    order: 3,
  },
  {
    category: 'Architecture & SOLID',
    label: 'Le code respecte les conventions du projet',
    description:
      'La structure des dossiers et les patterns suivent ceux déjà établis dans la base de code.',
    order: 4,
  },
];

module.exports = { tools, checklist };
