import { Section } from '../models/code-review-practice.model';

/**
 * Source unique du contenu pédagogique des revues de code : les 8 sections,
 * dans l'ordre des dossiers (0 → 7). Chaque pratique porte un `id` stable
 * `${numero}-${index}` réutilisé pour la persistance des cases cochées.
 *
 * Ce tableau est consommé par la page d'aperçu (best-practices) et par les
 * pages-support par phase (phase-guide). Ne pas reformuler les pratiques.
 */
export const CODE_REVIEW_SECTIONS: Section[] = [
  {
    numero: 0,
    titre: "Les fondations d'équipe",
    role: 'Équipe',
    roleKey: 'equipe',
    icon: 'groups',
    pratiques: [
      {
        id: '0-0',
        icon: 'forum',
        titre: 'Communication et collaboration',
        accroche:
          'Transformer la revue en discussion constructive où chacun partage, plutôt qu’en simple liste d’erreurs à corriger.',
        pourquoi:
          'Un climat positif renforce les relations et la qualité du code de toute l’équipe.',
      },
      {
        id: '0-1',
        icon: 'diversity_3',
        titre: 'Compréhension commune',
        accroche:
          'Aligner toute l’équipe sur les objectifs et la valeur des revues, dans une culture d’apprentissage partagée.',
        pourquoi:
          'L’alignement nourrit l’engagement et garantit que les revues servent vraiment la qualité.',
      },
      {
        id: '0-2',
        icon: 'feedback',
        titre: 'Demander des retours tôt et souvent',
        accroche:
          'Solliciter des avis dès le développement, sans attendre la revue formelle, pour détecter les problèmes en amont.',
        pourquoi:
          'On repère les écarts plus tôt et on installe une culture d’apprentissage continu.',
      },
      {
        id: '0-3',
        icon: 'description',
        titre: 'Documenter le processus de revue',
        accroche:
          'Centraliser dans une doc le processus, les rôles, les responsabilités et les critères de succès.',
        pourquoi:
          'La cohérence et des attentes claires accélèrent les cycles et évitent l’ambiguïté.',
      },
      {
        id: '0-4',
        icon: 'timer',
        titre: 'Définir des délais clairs de retour',
        accroche:
          'Fixer des délais raisonnables (24–48 h) tout en tenant compte de la complexité et de la charge.',
        pourquoi:
          'On préserve l’élan du développement et on évite les revues qui traînent.',
      },
      {
        id: '0-5',
        icon: 'flag',
        titre: 'Définition de Fini',
        accroche:
          'Définir et communiquer ensemble des critères d’achèvement clairs et précis pour chaque tâche.',
        pourquoi:
          'Tout le monde évalue le code selon les mêmes objectifs, sans interprétations divergentes.',
      },
      {
        id: '0-6',
        icon: 'hub',
        titre: 'Encourager la connaissance transversale',
        accroche:
          'Inciter chacun à relire du code hors de sa spécialité pour une vue d’ensemble du système.',
        pourquoi:
          'On élève la qualité, on partage le savoir et on réduit la dépendance aux personnes clés.',
      },
      {
        id: '0-7',
        icon: 'waving_hand',
        titre: 'Encourager la participation',
        accroche:
          'Créer un cadre inclusif où chacun, quel que soit son niveau, se sent légitime pour relire.',
        pourquoi:
          'La diversité des regards renforce les compétences et la cohésion de l’équipe.',
      },
      {
        id: '0-8',
        icon: 'priority_high',
        titre: 'Faire des revues une priorité',
        accroche:
          'Réserver des créneaux réguliers et découper les revues en tâches gérables.',
        pourquoi:
          'La qualité et le partage de connaissances restent au cœur de la culture d’équipe.',
      },
      {
        id: '0-9',
        icon: 'insights',
        titre: 'Identifier les tendances et problèmes',
        accroche:
          'Organiser des sessions récurrentes pour discuter des problèmes qui reviennent.',
        pourquoi:
          'L’équipe apprend de l’expérience collective et s’améliore en continu.',
      },
      {
        id: '0-10',
        icon: 'school',
        titre: 'Partage des connaissances',
        accroche:
          'Faire de la revue une occasion d’échanger bonnes pratiques et patterns.',
        pourquoi:
          'La revue devient un moment de mentorat qui fait grandir toute l’équipe.',
      },
      {
        id: '0-11',
        icon: 'style',
        titre: 'Préférences du guide de style',
        accroche:
          'Adopter un guide de style accessible et l’appliquer automatiquement via les linters.',
        pourquoi:
          'Moins de débats stylistiques, plus de lisibilité et d’intégration facile des nouveaux.',
      },
      {
        id: '0-12',
        icon: 'emoji_events',
        titre: 'Reconnaissance et récompenses',
        accroche:
          'Reconnaître celles et ceux qui fournissent régulièrement des retours de qualité.',
        pourquoi:
          'La reconnaissance motive et maintient des standards élevés dans les revues.',
      },
      {
        id: '0-13',
        icon: 'handshake',
        titre: 'Résolution des conflits',
        accroche:
          'Trancher les désaccords sur des preuves, avec des conventions claires et, au besoin, un médiateur.',
        pourquoi:
          'L’équipe gère ses divergences sans freiner l’avancée du projet.',
      },
      {
        id: '0-14',
        icon: 'monitoring',
        titre: 'Surveiller et améliorer les revues',
        accroche:
          'Suivre l’efficacité via des métriques et des retours pour faire évoluer les lignes directrices.',
        pourquoi:
          'Le processus reste pertinent et continue de servir la qualité et la collaboration.',
      },
      {
        id: '0-15',
        icon: 'smart_toy',
        titre: "Utiliser l'automatisation",
        accroche:
          'Brancher linters et analyseurs statiques adaptés à la stack, intégrés à la CI.',
        pourquoi:
          'Les défauts évidents sont détectés tôt : la revue se concentre sur le qualitatif.',
      },
    ],
  },
  {
    numero: 1,
    titre: 'Pendant le développement',
    role: 'Auteur',
    roleKey: 'auteur',
    icon: 'code',
    pratiques: [
      {
        id: '1-0',
        icon: 'call_split',
        titre: 'Diviser les tâches',
        accroche:
          'Découper un gros changement en plusieurs petites pull requests faciles à comprendre et à tester.',
        pourquoi:
          'Les petites PR accélèrent le cycle et élèvent la qualité globale du code.',
      },
      {
        id: '1-1',
        icon: 'menu_book',
        titre: 'Documentation',
        accroche:
          'Faire suivre la documentation à chaque modification du code.',
        pourquoi:
          'Une doc à jour est cruciale pour évaluer les changements et leur impact.',
      },
      {
        id: '1-2',
        icon: 'account_tree',
        titre: 'Impact des modifications',
        accroche:
          'Mesurer comment un changement local peut affecter d’autres composants du système.',
        pourquoi:
          'Anticiper les effets de bord protège la stabilité et la maintenabilité.',
      },
      {
        id: '1-3',
        icon: 'edit_document',
        titre: 'Mettre à jour la documentation',
        accroche:
          'Réviser la doc à chaque changement pour éviter les infos obsolètes ou contradictoires.',
        pourquoi:
          'La cohérence code ↔ doc est essentielle à la bonne compréhension du logiciel.',
      },
      {
        id: '1-4',
        icon: 'sticky_note_2',
        titre: 'Noter les questions pour la relecture',
        accroche:
          'Consigner les points à aborder pour préparer une discussion de revue efficace.',
        pourquoi:
          'Des notes structurées facilitent la collaboration et rendent la revue plus productive.',
      },
      {
        id: '1-5',
        icon: 'rule',
        titre: 'Rester cohérent',
        accroche:
          'Faire en sorte que le code s’intègre au reste du projet et reste simple à comprendre.',
        pourquoi:
          'La cohérence assure la fiabilité et la maintenabilité à long terme.',
      },
      {
        id: '1-6',
        icon: 'checklist',
        titre: 'Suivre les lignes directrices',
        accroche:
          'Appliquer les conventions de nommage, styles et standards définis par l’équipe.',
        pourquoi:
          'Des normes communes rendent le code uniforme et réduisent les malentendus en revue.',
      },
      {
        id: '1-7',
        icon: 'science',
        titre: 'Écrire des tests automatisés',
        accroche:
          'Exercer le code par des tests qui détectent les problèmes avant la production.',
        pourquoi:
          'On approuve les changements en confiance et on préserve l’intégrité du logiciel.',
      },
      {
        id: '1-8',
        icon: 'bug_report',
        titre: 'Écrire un test échouant pour une correction de bug',
        accroche:
          'Avant de corriger, écrire un test qui reproduit le bug et échoue.',
        pourquoi:
          'On prouve que la correction règle bien le problème et on prévient les régressions.',
      },
    ],
  },
  {
    numero: 2,
    titre: 'Après le développement',
    role: 'Auteur',
    roleKey: 'auteur',
    icon: 'fact_check',
    pratiques: [
      {
        id: '2-0',
        icon: 'inventory',
        titre: 'Assurer la complétude des modifications',
        accroche:
          'Soumettre des changements bien préparés et testés, sans morceaux manquants.',
        pourquoi:
          'Un code complet facilite le travail du relecteur et accélère l’approbation.',
      },
      {
        id: '2-1',
        icon: 'preview',
        titre: 'Auto-relecture',
        accroche:
          'Relire soi-même son code avant de le soumettre pour attraper les problèmes évidents.',
        pourquoi:
          'C’est du professionnalisme : on respecte le temps des relecteurs.',
      },
      {
        id: '2-2',
        icon: 'self_improvement',
        titre: 'Esprit ouvert en tant qu’auteur',
        accroche:
          'Accueillir les critiques et apprendre des perspectives différentes.',
        pourquoi:
          'Cette ouverture nourrit l’apprentissage continu et de meilleures solutions.',
      },
      {
        id: '2-3',
        icon: 'security',
        titre: 'Problèmes potentiels',
        accroche:
          'Repérer en amont les enjeux de performance, de sécurité et de scalabilité.',
        pourquoi:
          'On évite goulots d’étranglement et vulnérabilités, pour un code qui tient la charge.',
      },
      {
        id: '2-4',
        icon: 'gavel',
        titre: 'Respect des normes de codage',
        accroche:
          'Vérifier la conformité aux standards, à l’architecture et aux conventions de nommage.',
        pourquoi:
          'Une base homogène facilite la collaboration et la maintenabilité.',
      },
      {
        id: '2-5',
        icon: 'terminal',
        titre: 'Testé dans un environnement de développement',
        accroche:
          'S’assurer que les changements ont tourné dans un environnement réel avant la fusion.',
        pourquoi:
          'Les tests préalables réduisent le risque de défauts non détectés.',
      },
      {
        id: '2-6',
        icon: 'merge_type',
        titre: 'À propos des Pull Requests',
        accroche:
          'Fournir titre clair, description détaillée, captures et liens utiles.',
        pourquoi:
          'Le relecteur comprend vite l’objectif et le contexte : moins de confusions.',
      },
    ],
  },
  {
    numero: 3,
    titre: 'Avant la relecture',
    role: 'Relecteur',
    roleKey: 'relecteur',
    icon: 'visibility',
    pratiques: [
      {
        id: '3-0',
        icon: 'handshake',
        titre: 'Collaborer avec l’auteur',
        accroche:
          'Travailler avec l’auteur plutôt que pointer des erreurs : communication ouverte et solutions.',
        pourquoi:
          'Un climat collaboratif améliore le code et le moral de l’équipe.',
      },
      {
        id: '3-1',
        icon: 'architecture',
        titre: 'Comprendre l’architecture de la base de code',
        accroche:
          'Se familiariser avec la structure, les patterns et les composants clés du projet.',
        pourquoi:
          'On repère alors les problèmes pertinents et on donne des retours utiles.',
      },
      {
        id: '3-2',
        icon: 'assignment',
        titre: 'Comprendre les exigences et le contexte',
        accroche:
          'Saisir pourquoi le changement est fait et comment il s’intègre au système.',
        pourquoi:
          'On peut juger si le code répond vraiment aux objectifs visés.',
      },
      {
        id: '3-3',
        icon: 'tune',
        titre: 'Déterminer le niveau de relecture nécessaire',
        accroche:
          'Adapter la profondeur de relecture à l’ampleur, aux risques et à l’expérience de l’auteur.',
        pourquoi:
          'On utilise le temps efficacement sans sacrifier la qualité.',
      },
      {
        id: '3-4',
        icon: 'report_problem',
        titre: 'Identifier les risques ou problèmes potentiels',
        accroche:
          'Anticiper les impacts système et les risques de sécurité en comparant à l’existant.',
        pourquoi:
          'Détecter les risques tôt évite des problèmes coûteux après déploiement.',
      },
      {
        id: '3-5',
        icon: 'checklist',
        titre: 'Préparer une liste',
        accroche:
          'Bâtir une liste de contrôle issue des exigences et des user stories.',
        pourquoi:
          'Une checklist évite les oublis et rend la relecture systématique.',
      },
      {
        id: '3-6',
        icon: 'verified',
        titre: 'Qualité du code',
        accroche:
          'Évaluer lisibilité, absence de duplication, complexité et capacité à évoluer (DRY).',
        pourquoi:
          'Un code clair se modifie et s’adapte à moindre coût sur la durée.',
      },
      {
        id: '3-7',
        icon: 'psychology',
        titre: 'Relecteur ouvert d’esprit',
        accroche:
          'Aborder chaque revue avec respect, en se concentrant sur le code, pas la personne.',
        pourquoi:
          'Une attitude ouverte crée un cadre positif où l’équipe apprend ensemble.',
      },
      {
        id: '3-8',
        icon: 'design_services',
        titre: 'Revoir la documentation et les spécifications',
        accroche:
          'Vérifier que l’implémentation respecte les specs et que la doc est à jour.',
        pourquoi:
          'La conformité à la conception garantit la clarté et facilite la maintenance.',
      },
    ],
  },
  {
    numero: 4,
    titre: 'Pendant la relecture',
    role: 'Relecteur',
    roleKey: 'relecteur',
    icon: 'rate_review',
    pratiques: [
      {
        id: '4-0',
        icon: 'trending_up',
        titre: 'Chercher l’amélioration continue plutôt que la perfection',
        accroche:
          'Viser le progrès, pas la perfection : tout code peut s’améliorer.',
        pourquoi:
          'On installe une culture où chacun est à l’aise avec les retours et motivé à progresser.',
      },
      {
        id: '4-1',
        icon: 'low_priority',
        titre: 'Commentaires « Nitpick »',
        accroche:
          'Préfixer par « Nit » les suggestions mineures pour distinguer l’essentiel de l’optionnel.',
        pourquoi:
          'L’auteur priorise mieux et comprend l’importance relative de chaque remarque.',
      },
      {
        id: '4-2',
        icon: 'balance',
        titre: 'Considérations à court et à long terme',
        accroche:
          'Peser le bénéfice immédiat et les enjeux durables (maintenabilité, scalabilité, archi).',
        pourquoi:
          'Les retours servent à la fois la qualité présente et la viabilité future.',
      },
      {
        id: '4-3',
        icon: 'rule',
        titre: 'Directives et bonnes pratiques du projet',
        accroche:
          'Vérifier le respect des guidelines, patterns et principes (SOLID, DRY).',
        pourquoi: 'On préserve la cohérence et on facilite la collaboration.',
      },
      {
        id: '4-4',
        icon: 'chat',
        titre: 'Fournir des retours clairs',
        accroche:
          'Des critiques précises, référencées dans le code, avec solutions concrètes et ton positif.',
        pourquoi:
          'L’auteur comprend l’enjeu et applique les améliorations efficacement.',
      },
      {
        id: '4-5',
        icon: 'menu_book',
        titre: 'La documentation est à jour',
        accroche:
          'Vérifier que la doc et les commentaires reflètent bien les changements.',
        pourquoi: 'On garde une ressource fiable pour les futurs développeurs.',
      },
      {
        id: '4-6',
        icon: 'format_paint',
        titre: 'Le style d’équipe est suivi',
        accroche:
          'Faire prévaloir le guide de style collectif sur les préférences personnelles.',
        pourquoi:
          'Une base uniforme et professionnelle facilite collaboration et maintenance.',
      },
      {
        id: '4-7',
        icon: 'sort',
        titre: 'Prioriser les retours',
        accroche:
          'Classer les remarques par impact (conception, performance, sécurité d’abord).',
        pourquoi:
          'On optimise le temps de l’auteur et la valeur des retours pour le produit.',
      },
      {
        id: '4-8',
        icon: 'shield',
        titre: 'Problèmes potentiels',
        accroche:
          'Traquer vulnérabilités, ralentissements et limites de scalabilité, solutions à l’appui.',
        pourquoi: 'Le produit final reste robuste, sûr et efficace sous charge.',
      },
      {
        id: '4-9',
        icon: 'science',
        titre: 'Relecture des tests',
        accroche:
          'Vérifier que les tests couvrent fonctionnalités, cas limites et scénarios d’erreur.',
        pourquoi:
          'On garantit la fiabilité en anticipant les comportements imprévus.',
      },
      {
        id: '4-10',
        icon: 'co_present',
        titre: 'Relecture en programmation en binôme',
        accroche:
          'Deux développeurs sur le même code : l’un écrit, l’autre relit en continu.',
        pourquoi:
          'Les problèmes sont détectés en temps réel et le savoir se partage.',
      },
      {
        id: '4-11',
        icon: 'thumb_up',
        titre: 'Retours positifs et critiques constructives',
        accroche:
          'Souligner les réussites tout en formulant les critiques comme des occasions de progrès.',
        pourquoi:
          'Cet équilibre maintient le moral et encourage l’amélioration continue.',
      },
      {
        id: '4-12',
        icon: 'sentiment_satisfied',
        titre: 'Soyez professionnel',
        accroche:
          'Commenter le code, pas la personne, dans un langage neutre et ouvert au dialogue.',
        pourquoi:
          'On crée une dynamique respectueuse qui renforce la confiance.',
      },
    ],
  },
  {
    numero: 5,
    titre: 'Après la relecture — côté auteur',
    role: 'Auteur',
    roleKey: 'auteur',
    icon: 'published_with_changes',
    pratiques: [
      {
        id: '5-0',
        icon: 'published_with_changes',
        titre: 'Implémenter ou expliquer',
        accroche:
          'Intégrer les suggestions, ou justifier techniquement ses choix quand on s’en écarte.',
        pourquoi:
          'On rend la revue constructive et bénéfique pour toute l’équipe.',
      },
      {
        id: '5-1',
        icon: 'edit_note',
        titre: 'Mettre à jour la documentation et les commentaires',
        accroche:
          'Après chaque changement, synchroniser doc et commentaires associés.',
        pourquoi:
          'On préserve la clarté et la maintenabilité pour les futurs développeurs.',
      },
      {
        id: '5-2',
        icon: 'groups',
        titre: 'Obtenir les retours des membres de l’équipe',
        accroche:
          'Solliciter les experts et ouvrir la discussion pour lever les incertitudes.',
        pourquoi:
          'On enrichit la qualité par des perspectives variées et on partage le savoir.',
      },
      {
        id: '5-3',
        icon: 'loop',
        titre: 'Soumettre du code pour une seconde relecture',
        accroche:
          'Après corrections, resoumettre avec un résumé des changements et des tests qui passent.',
        pourquoi:
          'On fluidifie la validation finale et on élève la qualité du code livré.',
      },
      {
        id: '5-4',
        icon: 'task_alt',
        titre: 'Traiter les retours reçus',
        accroche:
          'Répondre à chaque retour — appliquer ou justifier — via une liste de contrôle.',
        pourquoi:
          'Une couverture complète des retours renforce la confiance dans l’équipe.',
      },
      {
        id: '5-5',
        icon: 'check_circle',
        titre: 'Vérifier que tous les tests réussissent',
        accroche:
          'Relancer toute la suite après chaque modification, idéalement en intégration continue.',
        pourquoi:
          'On détecte vite les régressions et on préserve la stabilité du projet.',
      },
    ],
  },
  {
    numero: 6,
    titre: 'Après la relecture — côté relecteur',
    role: 'Relecteur',
    roleKey: 'relecteur',
    icon: 'difference',
    pratiques: [
      {
        id: '6-0',
        icon: 'difference',
        titre: 'Relecture du code mis à jour',
        accroche:
          'Vérifier que les suggestions ont été implémentées correctement, sans effets de bord.',
        pourquoi:
          'On confirme la qualité et que la collaboration a porté ses fruits.',
      },
      {
        id: '6-1',
        icon: 'question_answer',
        titre: 'Répondre aux préoccupations de l’auteur',
        accroche:
          'Rester disponible pour clarifier les retours et répondre aux questions.',
        pourquoi:
          'L’échange ouvert prévient les malentendus et encourage l’adoption des retours.',
      },
      {
        id: '6-2',
        icon: 'bolt',
        titre: 'Résoudre les conflits rapidement',
        accroche:
          'Traiter vite et constructivement les désaccords pour éviter que la PR ne stagne.',
        pourquoi:
          'Un rythme de développement fluide et un climat de travail sain sont préservés.',
      },
      {
        id: '6-3',
        icon: 'fact_check',
        titre: 'Vérifier que tous les changements ont été pris en compte',
        accroche:
          'S’assurer, liste à l’appui, que chaque retour a bien été adressé.',
        pourquoi:
          'Aucun point n’est oublié et le code final répond à tous les critères.',
      },
      {
        id: '6-4',
        icon: 'check_circle',
        titre: 'Vérifier que tous les tests réussissent',
        accroche:
          'Confirmer que la suite complète passe après chaque modification.',
        pourquoi: 'On attrape les régressions avant la fusion du code.',
      },
      {
        id: '6-5',
        icon: 'psychology',
        titre: 'Être ouvert aux retours',
        accroche:
          'Ajuster ses commentaires si l’auteur apporte des arguments valides.',
        pourquoi:
          'Une posture humble enrichit l’apprentissage et renforce la confiance.',
      },
    ],
  },
  {
    numero: 7,
    titre: 'Après l’approbation',
    role: 'Auteur + Relecteur',
    roleKey: 'mixte',
    icon: 'rocket_launch',
    pratiques: [
      {
        id: '7-0',
        icon: 'celebration',
        titre: 'Célébrer l’achèvement réussi',
        accroche:
          'Marquer les changements approuvés pour renforcer le moral et l’esprit collaboratif.',
        pourquoi:
          'Reconnaître le travail accompli motive et nourrit l’amélioration continue.',
      },
      {
        id: '7-1',
        icon: 'merge',
        titre: 'Fusionner les changements approuvés',
        accroche:
          'Intégrer les modifications validées en suivant des pratiques strictes de test et de stabilité.',
        pourquoi: 'Une fusion disciplinée évite conflits et builds défaillants.',
      },
      {
        id: '7-2',
        icon: 'monitoring',
        titre: 'Surveiller la performance',
        accroche: 'Observer performance et fonctionnement après intégration.',
        pourquoi:
          'Une surveillance active détecte vite régressions et dégradations.',
      },
      {
        id: '7-3',
        icon: 'cloud_done',
        titre: 'Vérifier le changement en production',
        accroche:
          'Tester le déploiement avec les vrais utilisateurs et les vraies données.',
        pourquoi:
          'On gagne la confiance que tout fonctionne comme prévu en conditions réelles.',
      },
    ],
  },
];
