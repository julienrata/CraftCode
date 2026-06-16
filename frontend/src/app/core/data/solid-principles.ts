import { SolidPrinciple } from '../models/solid-principle.model';

/**
 * Source unique du contenu pédagogique des principes SOLID : les 5 principes,
 * dans l'ordre de l'acronyme (S → O → L → I → D). Chaque principe porte un
 * `slug` stable qui sert à la fois de paramètre de route (page de détail
 * `/solid/:principe`) et d'identifiant pour le parcours précédent/suivant.
 *
 * Consommé par la page d'aperçu (solid, hub) et par les pages de détail
 * (solid-detail). Contenu pédagogique : définition, problème, pourquoi,
 * exemples de code à éviter / à préférer, et comment respecter le principe.
 */
export const SOLID_PRINCIPLES: SolidPrinciple[] = [
  {
    lettre: 'S',
    slug: 'srp',
    icon: 'center_focus_strong',
    nomEn: 'Single Responsibility Principle',
    nomFr: 'Responsabilité unique',
    definition:
      'Une classe (ou un module) ne doit avoir qu’une seule responsabilité, donc une seule raison de changer.',
    probleme:
      'Quand une classe cumule plusieurs responsabilités, une modification pour l’une risque de casser les autres. Le code devient difficile à comprendre, à tester et à faire évoluer.',
    pourquoi: [
      'Lisibilité : une classe focalisée sur une seule tâche est simple à comprendre.',
      'Testabilité : chaque responsabilité peut être testée de façon isolée.',
      'Maintenance : une modification d’une responsabilité n’impacte pas les autres.',
      'Réutilisabilité : une classe non liée à plusieurs rôles se réemploie ailleurs.',
    ],
    exempleAvant: {
      legende: 'Non conforme — UserManager cumule quatre responsabilités',
      code: `class UserManager {
  createUser(data) { /* créer */ }
  validateUser(data) { /* valider */ }
  saveToDatabase(user) { /* persister */ }
  sendWelcomeEmail(user) { /* notifier */ }
}`,
    },
    exempleApres: {
      legende: 'Conforme — responsabilités séparées, UserManager orchestre',
      code: `class UserValidator {
  validate(data) { /* valider */ }
}
class UserRepository {
  save(user) { /* persister */ }
}
class EmailService {
  sendWelcomeEmail(user) { /* notifier */ }
}

class UserManager {
  constructor(validator, repository, emailService) {
    this.validator = validator;
    this.repository = repository;
    this.emailService = emailService;
  }
  createUser(data) {
    if (!this.validator.validate(data)) throw new Error('Données invalides');
    const user = { ...data };
    this.repository.save(user);
    this.emailService.sendWelcomeEmail(user);
  }
}`,
    },
    commentRespecter: [
      'Si une classe a plusieurs raisons de changer, découpe-la en classes spécialisées.',
      'Méfie-toi des classes qui deviennent trop grandes ou trop complexes : c’est un signal.',
      'Sépare les règles métier, l’accès aux données et les effets de bord (mail, log…).',
      'Fais collaborer les classes par injection plutôt que de tout fusionner.',
    ],
  },
  {
    lettre: 'O',
    slug: 'ocp',
    icon: 'extension',
    nomEn: 'Open/Closed Principle',
    nomFr: 'Ouvert/Fermé',
    definition:
      'Une entité doit être ouverte à l’extension mais fermée à la modification : on ajoute des comportements sans réécrire le code existant.',
    probleme:
      'Si ajouter un cas oblige à rouvrir une fonction qui marche déjà, chaque évolution risque d’introduire une régression. Les `if/else` ou `switch` qui gonflent à chaque nouveau type en sont le symptôme.',
    pourquoi: [
      'Maintenance : étendre sans modifier réduit le risque de régression.',
      'Évolutivité : le système grandit naturellement, sans refonte à chaque ajout.',
      'DRY : on réutilise le code existant via des extensions plutôt que de le dupliquer.',
    ],
    exempleAvant: {
      legende: 'Non conforme — chaque nouveau type modifie la méthode',
      code: `class SalaryCalculator {
  calculateSalary(type: string): number {
    if (type === 'permanent') return 3000;
    else if (type === 'freelance') return 2000;
    else throw new Error("Type d'employé inconnu");
  }
}`,
    },
    exempleApres: {
      legende: 'Conforme — abstraction + polymorphisme, on ajoute des classes',
      code: `interface Employee {
  calculateSalary(): number;
}
class PermanentEmployee implements Employee {
  calculateSalary() { return 3000; }
}
class FreelanceEmployee implements Employee {
  calculateSalary() { return 2000; }
}
// Nouveau type = nouvelle classe, sans toucher l'existant
class InternEmployee implements Employee {
  calculateSalary() { return 1000; }
}

class SalaryCalculator {
  calculateSalary(employee: Employee): number {
    return employee.calculateSalary();
  }
}`,
    },
    commentRespecter: [
      'Abstrais ce qui varie : isole les comportements susceptibles d’évoluer derrière une interface.',
      'Privilégie la composition à l’héritage direct quand cela rend le système plus extensible.',
      'Appuie-toi sur des patterns comme Strategy, Decorator ou Factory.',
      'Ajoute de nouvelles classes plutôt que de modifier le code déjà testé.',
    ],
  },
  {
    lettre: 'L',
    slug: 'lsp',
    icon: 'swap_horiz',
    nomEn: 'Liskov Substitution Principle',
    nomFr: 'Substitution de Liskov',
    definition:
      'Un objet d’une sous-classe doit pouvoir remplacer un objet de sa classe mère sans altérer le comportement attendu du programme.',
    probleme:
      'Quand une sous-classe ne respecte pas le contrat de sa classe mère (elle lève une exception, change un type de retour…), le code qui manipule le type parent se met à échouer de façon imprévisible — et l’on viole souvent l’OCP pour le rattraper.',
    pourquoi: [
      'Fiabilité : on utilise les sous-classes sans casser le système.',
      'Maintenabilité : le code reste cohérent, sans comportement imprévisible.',
      'Extensibilité : on ajoute des sous-classes sans toucher au code existant.',
    ],
    exempleAvant: {
      legende: 'Non conforme — Pingouin rompt le contrat d’Oiseau',
      code: `class Oiseau {
  voler(): string { return 'Cet oiseau vole !'; }
}
class Pingouin extends Oiseau {
  voler(): string {
    // Casse l'attente : tous les Oiseau ne sont plus interchangeables
    throw new Error('Les pingouins ne volent pas !');
  }
}
faireVoler(new Pingouin()); // 💥 lève une erreur`,
    },
    exempleApres: {
      legende: 'Conforme — une interface de comportement, pas d’héritage forcé',
      code: `interface Oiseau {
  seDeplacer(): string;
}
class OiseauVolant implements Oiseau {
  seDeplacer() { return 'Cet oiseau vole !'; }
}
class OiseauNonVolant implements Oiseau {
  seDeplacer() { return 'Cet oiseau marche ou nage.'; }
}
// Chaque type respecte le contrat : substituables sans surprise
faireSeDeplacer(new OiseauVolant());
faireSeDeplacer(new OiseauNonVolant());`,
    },
    commentRespecter: [
      'Ne redéfinis pas une méthode héritée d’une façon qui change son contrat.',
      'Si tu as besoin d’un comportement vraiment différent, repense ta hiérarchie.',
      'Préfère des interfaces ou la composition à une classe parent unique trop large.',
      'Vérifie : la sous-classe est-elle utilisable partout où le parent est attendu ?',
    ],
  },
  {
    lettre: 'I',
    slug: 'isp',
    icon: 'call_split',
    nomEn: 'Interface Segregation Principle',
    nomFr: 'Ségrégation des interfaces',
    definition:
      'Mieux vaut plusieurs interfaces spécifiques qu’une seule interface générale : aucun client ne doit dépendre de méthodes qu’il n’utilise pas.',
    probleme:
      'Une interface trop large oblige ses implémentations à fournir des méthodes qui ne les concernent pas — souvent vides ou levant une exception. Les clients sont alors couplés à des comportements inutiles et fragiles.',
    pourquoi: [
      'Découplage : un client ne dépend que des méthodes dont il a réellement besoin.',
      'Robustesse : plus de méthodes vides ou qui lèvent « non supporté ».',
      'Clarté : des interfaces ciblées expriment des rôles précis et lisibles.',
    ],
    exempleAvant: {
      legende: 'Non conforme — une interface fourre-tout',
      code: `interface Machine {
  imprimer(doc): void;
  scanner(doc): void;
  faxer(doc): void;
}
// Une imprimante simple est forcée d'implémenter ce qu'elle ne fait pas
class ImprimanteSimple implements Machine {
  imprimer(doc) { /* ok */ }
  scanner(doc) { throw new Error('Non supporté'); }
  faxer(doc) { throw new Error('Non supporté'); }
}`,
    },
    exempleApres: {
      legende: 'Conforme — des interfaces ciblées, composées au besoin',
      code: `interface Imprimante { imprimer(doc): void; }
interface Scanner { scanner(doc): void; }
interface Fax { faxer(doc): void; }

// N'implémente que ce dont elle a besoin
class ImprimanteSimple implements Imprimante {
  imprimer(doc) { /* ok */ }
}
// Un multifonction compose les interfaces utiles
class Multifonction implements Imprimante, Scanner, Fax {
  imprimer(doc) { /* ... */ }
  scanner(doc) { /* ... */ }
  faxer(doc) { /* ... */ }
}`,
    },
    commentRespecter: [
      'Découpe une grosse interface en plusieurs interfaces de rôle cohérentes.',
      'Repère les implémentations remplies de méthodes vides : c’est un signal.',
      'Laisse une classe composer uniquement les interfaces qui la concernent.',
      'Conçois les interfaces du point de vue du client qui les consomme.',
    ],
  },
  {
    lettre: 'D',
    slug: 'dip',
    icon: 'account_tree',
    nomEn: 'Dependency Inversion Principle',
    nomFr: 'Inversion des dépendances',
    definition:
      'Les modules de haut niveau ne doivent pas dépendre des modules de bas niveau : les deux dépendent d’abstractions. Et les abstractions ne dépendent pas des détails.',
    probleme:
      'Quand une logique métier instancie directement une dépendance concrète (une base précise, un service de mail), elle y est soudée. Changer la technologie ou écrire un test impose alors de modifier le métier lui-même.',
    pourquoi: [
      'Modularité : le métier ne connaît qu’une abstraction, pas une technologie.',
      'Testabilité : on injecte un double en test sans toucher au métier.',
      'Flexibilité : changer d’implémentation ne casse pas le code de haut niveau.',
    ],
    exempleAvant: {
      legende: 'Non conforme — le métier est soudé à une base concrète',
      code: `class MySqlDatabase {
  save(data) { /* écrit dans MySQL */ }
}
class Commande {
  private db = new MySqlDatabase(); // dépendance concrète figée
  enregistrer(data) {
    this.db.save(data);
  }
}`,
    },
    exempleApres: {
      legende: 'Conforme — dépendance sur une abstraction, injectée',
      code: `// Le métier dépend d'une abstraction, pas d'un détail
interface Repository {
  save(data): void;
}
class MySqlRepository implements Repository {
  save(data) { /* écrit dans MySQL */ }
}
class Commande {
  constructor(private repo: Repository) {} // injection
  enregistrer(data) {
    this.repo.save(data);
  }
}
// Production : new Commande(new MySqlRepository())
// Test      : new Commande(new RepositoryEnMemoire())`,
    },
    commentRespecter: [
      'Fais dépendre le métier d’une interface, pas d’une classe concrète.',
      'Injecte les dépendances (constructeur) plutôt que de les instancier en dur.',
      'Place l’abstraction du côté de celui qui la consomme, pas de l’implémentation.',
      'En test, substitue un double (mémoire, mock) à l’implémentation réelle.',
    ],
  },
];
