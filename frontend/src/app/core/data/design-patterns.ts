import { DesignPattern } from '../models/design-pattern.model';

/**
 * Source unique du contenu pédagogique des Design Patterns du Gang of Four :
 * les 23 patrons, regroupés en trois familles (Créationnels, Structurels,
 * Comportementaux). Chaque patron porte un `slug` stable qui sert à la fois de
 * paramètre de route (page de détail `/design-patterns/:pattern`) et
 * d'identifiant pour le parcours précédent/suivant.
 *
 * Consommé par la page d'aperçu (design-patterns, hub) et par les pages de
 * détail (design-pattern-detail). Contenu pédagogique : intention, problème,
 * solution, exemple de code, cas d'usage et pièges/anti-patterns.
 */
export const DESIGN_PATTERNS: DesignPattern[] = [
  // ---------------------------------------------------------------------------
  // Créationnels — comment instancier les objets sans coupler le client au
  // type concret créé.
  // ---------------------------------------------------------------------------
  {
    slug: 'singleton',
    icon: 'looks_one',
    nom: 'Singleton',
    nomFr: 'Instance unique',
    categorie: 'Créationnel',
    intention:
      'Garantir qu’une classe n’a qu’une seule instance et fournir un point d’accès global à cette instance.',
    probleme:
      'Certaines ressources ne doivent exister qu’en un seul exemplaire (un pool de connexions, un cache, une configuration). Laisser le code en créer librement gaspille des ressources et provoque des états incohérents.',
    solution:
      'On rend le constructeur privé et on expose une méthode statique qui crée l’instance au premier appel puis renvoie toujours la même. L’unicité est ainsi garantie par la classe elle-même, pas par la discipline des appelants.',
    exemple: {
      legende: 'Une configuration applicative chargée une seule fois',
      code: `class Config {
  private static instance: Config;
  private readonly values = new Map<string, string>();

  private constructor() { /* chargement coûteux */ }

  static getInstance(): Config {
    if (!Config.instance) {
      Config.instance = new Config();
    }
    return Config.instance;
  }

  get(key: string): string | undefined {
    return this.values.get(key);
  }
}

// Toujours la même instance
const a = Config.getInstance();
const b = Config.getInstance();
console.log(a === b); // true`,
    },
    casUsage: [
      'Accès centralisé à une configuration ou à des variables d’environnement.',
      'Pool de connexions à une base de données ou client HTTP partagé.',
      'Service de journalisation (logger) unique pour toute l’application.',
    ],
    pieges: [
      'C’est un état global déguisé : il rend les tests difficiles et masque les dépendances.',
      'Préférer souvent l’injection de dépendances, qui offre l’unicité sans le couplage global.',
      'Attention à la concurrence : sans protection, deux threads peuvent créer deux instances.',
    ],
  },
  {
    slug: 'factory-method',
    icon: 'precision_manufacturing',
    nom: 'Factory Method',
    nomFr: 'Fabrique',
    categorie: 'Créationnel',
    intention:
      'Définir une interface pour créer un objet, mais laisser les sous-classes décider de la classe concrète à instancier.',
    probleme:
      'Quand le code instancie directement des classes concrètes (`new PdfExport()`), ajouter un nouveau type oblige à modifier tous les points de création. Le code devient rigide et parsemé de `if/else` sur le type.',
    solution:
      'On délègue la création à une méthode dédiée que les sous-classes redéfinissent. Le code client manipule le produit via son interface et ignore la classe concrète réellement créée.',
    exemple: {
      legende: 'Chaque créateur choisit le document concret à produire',
      code: `interface Document {
  render(): string;
}
class PdfDocument implements Document {
  render() { return 'PDF'; }
}
class HtmlDocument implements Document {
  render() { return 'HTML'; }
}

abstract class Exporter {
  abstract createDocument(): Document; // factory method

  export(): string {
    const doc = this.createDocument();
    return doc.render();
  }
}
class PdfExporter extends Exporter {
  createDocument() { return new PdfDocument(); }
}
class HtmlExporter extends Exporter {
  createDocument() { return new HtmlDocument(); }
}`,
    },
    casUsage: [
      'Frameworks qui laissent l’utilisateur fournir le type concret à instancier.',
      'Création d’objets dont le type dépend de la configuration ou du contexte.',
      'Découplage entre la logique métier et la construction des objets qu’elle utilise.',
    ],
    pieges: [
      'Introduit une hiérarchie de sous-classes parfois disproportionnée pour un besoin simple.',
      'À ne pas confondre avec l’Abstract Factory : ici on crée un seul produit, pas une famille.',
      'Si le choix se résume à un paramètre, une simple fonction fabrique peut suffire.',
    ],
  },
  {
    slug: 'abstract-factory',
    icon: 'factory',
    nom: 'Abstract Factory',
    nomFr: 'Fabrique abstraite',
    categorie: 'Créationnel',
    intention:
      'Fournir une interface pour créer des familles d’objets liés, sans préciser leurs classes concrètes.',
    probleme:
      'Une interface graphique doit produire des composants cohérents (bouton, case à cocher) selon un thème. Mélanger un bouton « clair » avec une case « sombre » casse la cohérence ; instancier chaque variante à la main disperse ce choix.',
    solution:
      'On définit une fabrique abstraite déclarant la création de chaque produit de la famille. Chaque fabrique concrète produit une variante cohérente. Le client choisit une fabrique et obtient des produits assortis.',
    exemple: {
      legende: 'Une fabrique par thème, des composants toujours assortis',
      code: `interface Button { paint(): string; }
interface Checkbox { paint(): string; }

interface UiFactory {
  createButton(): Button;
  createCheckbox(): Checkbox;
}

class DarkButton implements Button { paint() { return 'bouton sombre'; } }
class DarkCheckbox implements Checkbox { paint() { return 'case sombre'; } }

class DarkFactory implements UiFactory {
  createButton() { return new DarkButton(); }
  createCheckbox() { return new DarkCheckbox(); }
}

function buildForm(factory: UiFactory) {
  return [factory.createButton().paint(), factory.createCheckbox().paint()];
}`,
    },
    casUsage: [
      'Thèmes d’interface (clair/sombre) ou kits de composants par plateforme.',
      'Support de plusieurs SGBD : une famille d’objets d’accès par base.',
      'Produits devant impérativement être utilisés ensemble et rester cohérents.',
    ],
    pieges: [
      'Ajouter un nouveau type de produit oblige à modifier toutes les fabriques.',
      'Beaucoup d’interfaces et de classes : lourd si la famille ne compte qu’un produit.',
      'Souvent confondu avec Factory Method ; ici on crée une famille, pas un objet isolé.',
    ],
  },
  {
    slug: 'builder',
    icon: 'construction',
    nom: 'Builder',
    nomFr: 'Monteur',
    categorie: 'Créationnel',
    intention:
      'Séparer la construction d’un objet complexe de sa représentation, pour bâtir pas à pas des variantes différentes.',
    probleme:
      'Un constructeur à dix paramètres optionnels devient illisible (« télescoping constructor »). On ne sait plus quel argument est quoi, et la plupart des combinaisons n’ont pas de sens.',
    solution:
      'On extrait la construction dans un objet dédié exposant des méthodes lisibles, souvent chaînées. L’objet final n’est assemblé qu’à l’appel de `build()`, une fois toutes les options choisies.',
    exemple: {
      legende: 'Construction fluide et lisible, étape par étape',
      code: `class Query {
  constructor(
    readonly table: string,
    readonly where: string[],
    readonly limit?: number,
  ) {}
}

class QueryBuilder {
  private wheres: string[] = [];
  private max?: number;

  constructor(private table: string) {}

  where(clause: string): this { this.wheres.push(clause); return this; }
  limit(n: number): this { this.max = n; return this; }

  build(): Query {
    return new Query(this.table, this.wheres, this.max);
  }
}

const q = new QueryBuilder('users')
  .where('active = true')
  .limit(10)
  .build();`,
    },
    casUsage: [
      'Objets à nombreux paramètres optionnels (requêtes, configurations, DTO).',
      'Assemblage progressif d’une structure (document, formulaire, arbre).',
      'API « fluide » lisible où chaque étape de construction est explicite.',
    ],
    pieges: [
      'Sur-ingénierie pour un objet simple à deux ou trois champs.',
      'Le builder peut produire un objet incomplet si `build()` ne valide pas l’état.',
      'Duplication entre les champs du builder et ceux du produit à maintenir en phase.',
    ],
  },
  {
    slug: 'prototype',
    icon: 'content_copy',
    nom: 'Prototype',
    nomFr: 'Clonage',
    categorie: 'Créationnel',
    intention:
      'Créer de nouveaux objets en clonant une instance existante plutôt qu’en la reconstruisant de zéro.',
    probleme:
      'Construire un objet est parfois coûteux (calculs, requêtes) ou sa configuration exacte n’est connue qu’à l’exécution. Le recréer à l’identique via `new` duplique cette complexité partout.',
    solution:
      'L’objet sait se cloner lui-même via une méthode `clone()`. On part d’un exemplaire déjà configuré (le prototype) et on en produit des copies, indépendantes, sans connaître sa classe concrète.',
    exemple: {
      legende: 'Un objet pré-configuré que l’on duplique à volonté',
      code: `interface Cloneable<T> {
  clone(): T;
}

class Shape implements Cloneable<Shape> {
  constructor(
    public x: number,
    public y: number,
    public color: string,
  ) {}

  clone(): Shape {
    return new Shape(this.x, this.y, this.color);
  }
}

const template = new Shape(0, 0, 'rouge');
const copy = template.clone();
copy.x = 42; // indépendant du prototype`,
    },
    casUsage: [
      'Dupliquer des objets coûteux à initialiser (chargés depuis une base, calculés).',
      'Éditeurs graphiques : copier/coller des formes déjà paramétrées.',
      'Créer des variantes à partir d’un modèle de référence connu à l’exécution.',
    ],
    pieges: [
      'Le clonage superficiel partage les objets imbriqués : préférer une copie profonde au besoin.',
      'Les références circulaires compliquent l’implémentation du clone.',
      'En TypeScript, attention à `Object.assign` qui ne copie pas la chaîne de prototype.',
    ],
  },

  // ---------------------------------------------------------------------------
  // Structurels — comment composer classes et objets en structures plus
  // grandes tout en gardant le tout souple.
  // ---------------------------------------------------------------------------
  {
    slug: 'adapter',
    icon: 'power',
    nom: 'Adapter',
    nomFr: 'Adaptateur',
    categorie: 'Structurel',
    intention:
      'Convertir l’interface d’une classe en une autre interface attendue par le client, pour faire collaborer des incompatibles.',
    probleme:
      'On veut réutiliser une classe existante (ou une librairie tierce) dont l’interface ne correspond pas à celle qu’attend notre code. La réécrire est impossible ou risqué.',
    solution:
      'On insère un adaptateur qui implémente l’interface cible et traduit ses appels vers l’objet adapté. Le client parle l’interface qu’il connaît ; l’adaptateur fait le pont.',
    exemple: {
      legende: 'Un adaptateur entre une API tierce et notre interface',
      code: `// Notre interface cible
interface Logger {
  log(message: string): void;
}

// Librairie tierce, interface incompatible
class ThirdPartyLog {
  writeEntry(level: string, text: string) { /* ... */ }
}

// L'adaptateur traduit log() -> writeEntry()
class LogAdapter implements Logger {
  constructor(private adaptee: ThirdPartyLog) {}
  log(message: string) {
    this.adaptee.writeEntry('INFO', message);
  }
}

const logger: Logger = new LogAdapter(new ThirdPartyLog());`,
    },
    casUsage: [
      'Intégrer une librairie tierce sans propager son interface dans tout le code.',
      'Faire cohabiter du code legacy avec une nouvelle interface.',
      'Uniformiser plusieurs sources hétérogènes derrière un même contrat.',
    ],
    pieges: [
      'Multiplier les adaptateurs peut masquer un vrai problème de conception des interfaces.',
      'Un adaptateur qui fait trop de transformations devient une couche métier cachée.',
      'À distinguer du Decorator (qui ajoute) et du Proxy (qui contrôle l’accès).',
    ],
  },
  {
    slug: 'bridge',
    icon: 'compare_arrows',
    nom: 'Bridge',
    nomFr: 'Pont',
    categorie: 'Structurel',
    intention:
      'Découpler une abstraction de son implémentation afin que les deux puissent varier indépendamment.',
    probleme:
      'Croiser deux dimensions par héritage (formes × rendus, ou appareils × télécommandes) fait exploser le nombre de classes : `CercleSVG`, `CercleCanvas`, `CarréSVG`… Chaque nouvelle variante multiplie les combinaisons.',
    solution:
      'On sépare les deux dimensions en deux hiérarchies reliées par une composition. L’abstraction délègue le travail concret à une implémentation qu’elle référence, au lieu d’en hériter.',
    exemple: {
      legende: 'La forme délègue le dessin à un moteur de rendu',
      code: `interface Renderer {
  drawCircle(r: number): string;
}
class SvgRenderer implements Renderer {
  drawCircle(r: number) { return \`<circle r="\${r}"/>\`; }
}
class CanvasRenderer implements Renderer {
  drawCircle(r: number) { return \`canvas:arc(\${r})\`; }
}

abstract class Shape {
  constructor(protected renderer: Renderer) {}
  abstract draw(): string;
}
class Circle extends Shape {
  constructor(renderer: Renderer, private radius: number) {
    super(renderer);
  }
  draw() { return this.renderer.drawCircle(this.radius); }
}`,
    },
    casUsage: [
      'Séparer une logique métier des détails de plateforme (rendu, OS, pilote).',
      'Éviter l’explosion combinatoire entre deux axes de variation indépendants.',
      'Changer d’implémentation à l’exécution (basculer de moteur de rendu).',
    ],
    pieges: [
      'Sur-ingénierie si une seule des deux dimensions varie réellement.',
      'Souvent confondu avec l’Adapter : le Bridge se conçoit en amont, l’Adapter répare après coup.',
      'L’indirection supplémentaire complique la lecture pour un gain parfois théorique.',
    ],
  },
  {
    slug: 'composite',
    icon: 'account_tree',
    nom: 'Composite',
    nomFr: 'Arbre composite',
    categorie: 'Structurel',
    intention:
      'Composer des objets en arborescences puis traiter objets simples et composés de façon uniforme.',
    probleme:
      'Une structure arborescente (fichiers/dossiers, menus, organigramme) force le client à distinguer sans cesse les feuilles des nœuds, avec des `if` partout pour savoir comment parcourir.',
    solution:
      'Feuilles et conteneurs partagent une même interface. Un conteneur délègue l’opération à ses enfants. Le client appelle la même méthode sur n’importe quel élément, sans connaître sa nature.',
    exemple: {
      legende: 'Fichiers et dossiers exposent la même interface',
      code: `interface FileNode {
  size(): number;
}

class File implements FileNode {
  constructor(private bytes: number) {}
  size() { return this.bytes; }
}

class Directory implements FileNode {
  private children: FileNode[] = [];
  add(node: FileNode) { this.children.push(node); }
  size() {
    return this.children.reduce((sum, c) => sum + c.size(), 0);
  }
}

const root = new Directory();
root.add(new File(100));
root.add(new File(250));
root.size(); // 350`,
    },
    casUsage: [
      'Systèmes de fichiers, menus imbriqués, arbres du DOM.',
      'Hiérarchies d’organisation (équipes, départements) où l’on agrège récursivement.',
      'Graphes de scène et regroupements d’éléments graphiques.',
    ],
    pieges: [
      'Une interface trop large force les feuilles à implémenter des méthodes de conteneur (ex. `add`).',
      'Le typage peut souffrir : difficile de restreindre les enfants à certains types.',
      'Les arbres très profonds posent des questions de performance et de récursion.',
    ],
  },
  {
    slug: 'decorator',
    icon: 'layers',
    nom: 'Decorator',
    nomFr: 'Décorateur',
    categorie: 'Structurel',
    intention:
      'Ajouter dynamiquement des responsabilités à un objet en l’enveloppant, sans modifier sa classe.',
    probleme:
      'Multiplier les sous-classes pour chaque combinaison d’options (café + lait + sucre + chantilly) est ingérable. L’héritage fige les combinaisons à la compilation.',
    solution:
      'Un décorateur implémente la même interface que l’objet décoré, le contient, et enrichit son comportement avant ou après avoir délégué. On empile les décorateurs librement, à l’exécution.',
    exemple: {
      legende: 'Des décorateurs empilés enrichissent un café',
      code: `interface Coffee {
  cost(): number;
}
class Espresso implements Coffee {
  cost() { return 2; }
}

abstract class CoffeeDecorator implements Coffee {
  constructor(protected inner: Coffee) {}
  abstract cost(): number;
}
class Milk extends CoffeeDecorator {
  cost() { return this.inner.cost() + 0.5; }
}
class Sugar extends CoffeeDecorator {
  cost() { return this.inner.cost() + 0.2; }
}

const order = new Sugar(new Milk(new Espresso()));
order.cost(); // 2.7`,
    },
    casUsage: [
      'Empiler des comportements optionnels (compression, chiffrement, mise en cache d’un flux).',
      'Middlewares HTTP qui enveloppent une requête/réponse.',
      'Ajouter des fonctionnalités à un composant tiers sans le modifier.',
    ],
    pieges: [
      'Une longue pile de décorateurs devient difficile à déboguer et à lire.',
      'L’ordre d’empilement change le résultat : il doit être maîtrisé.',
      'À distinguer de l’héritage et du Proxy, qui partagent une mécanique d’enveloppe similaire.',
    ],
  },
  {
    slug: 'facade',
    icon: 'storefront',
    nom: 'Facade',
    nomFr: 'Façade',
    categorie: 'Structurel',
    intention:
      'Fournir une interface unifiée et simple à un sous-système complexe.',
    probleme:
      'Pour accomplir une tâche, le client doit orchestrer plusieurs classes d’un sous-système, dans le bon ordre, en connaissant leurs détails. Ce couplage rend le code fragile et difficile à utiliser.',
    solution:
      'Une façade expose quelques méthodes de haut niveau qui orchestrent le sous-système en interne. Le client passe par la façade et ignore la complexité sous-jacente.',
    exemple: {
      legende: 'Une façade orchestre la conversion vidéo',
      code: `class VideoFile { constructor(public name: string) {} }
class Codec { /* ... */ }
class BitrateReader { static read(f: VideoFile, c: Codec) { /* ... */ } }
class AudioMixer { fix(data: unknown) { /* ... */ } }

// Façade : une seule méthode simple
class VideoConverter {
  convert(filename: string, format: string): VideoFile {
    const file = new VideoFile(filename);
    const codec = new Codec();
    const buffer = BitrateReader.read(file, codec);
    new AudioMixer().fix(buffer);
    return new VideoFile(\`\${filename}.\${format}\`);
  }
}

new VideoConverter().convert('clip', 'mp4');`,
    },
    casUsage: [
      'Simplifier l’usage d’une librairie complexe derrière une API métier.',
      'Offrir un point d’entrée unique à une couche (paiement, notifications).',
      'Réduire le couplage entre le code client et un sous-système qui évolue.',
    ],
    pieges: [
      'La façade peut enfler et devenir un « objet dieu » qui sait tout faire.',
      'Elle ne doit pas empêcher l’accès direct au sous-système quand c’est légitime.',
      'Cacher la complexité ne la supprime pas : le sous-système reste à maintenir.',
    ],
  },
  {
    slug: 'flyweight',
    icon: 'grain',
    nom: 'Flyweight',
    nomFr: 'Poids-mouche',
    categorie: 'Structurel',
    intention:
      'Partager efficacement un grand nombre d’objets en factorisant leur état commun.',
    probleme:
      'Afficher des millions d’objets quasi identiques (arbres d’une forêt, caractères d’un texte) sature la mémoire si chaque instance duplique les mêmes données (texture, police).',
    solution:
      'On sépare l’état intrinsèque (partagé, immuable) de l’état extrinsèque (propre à chaque usage, passé en argument). Les objets partagent une même instance d’état intrinsèque via une fabrique de cache.',
    exemple: {
      legende: 'Le type d’arbre est partagé, la position ne l’est pas',
      code: `// État intrinsèque, partagé
class TreeType {
  constructor(readonly name: string, readonly texture: string) {}
  draw(x: number, y: number) { /* dessine à (x, y) */ }
}

class TreeFactory {
  private static pool = new Map<string, TreeType>();
  static get(name: string, texture: string): TreeType {
    const key = name + texture;
    if (!this.pool.has(key)) {
      this.pool.set(key, new TreeType(name, texture));
    }
    return this.pool.get(key)!;
  }
}

// État extrinsèque (x, y) fourni à l'usage
TreeFactory.get('chêne', 'oak.png').draw(10, 20);`,
    },
    casUsage: [
      'Rendu de très nombreuses entités similaires (jeux, cartes, particules).',
      'Mise en cache de glyphes ou d’icônes réutilisés à l’identique.',
      'Toute situation où la mémoire est la contrainte dominante.',
    ],
    pieges: [
      'Optimisation prématurée : inutile tant que la mémoire n’est pas un problème mesuré.',
      'Le code se complexifie en séparant état partagé et état contextuel.',
      'On échange de la mémoire contre du temps CPU (recalcul de l’état extrinsèque).',
    ],
  },
  {
    slug: 'proxy',
    icon: 'shield',
    nom: 'Proxy',
    nomFr: 'Mandataire',
    categorie: 'Structurel',
    intention:
      'Fournir un substitut à un objet pour en contrôler l’accès.',
    probleme:
      'On veut intercaler une logique avant ou après l’accès à un objet — chargement différé, contrôle de droits, mise en cache, journalisation — sans changer ni le client ni l’objet réel.',
    solution:
      'Le proxy implémente la même interface que l’objet réel et le référence. Il exécute sa logique propre puis délègue (ou non) au vrai objet. Le client ne voit aucune différence.',
    exemple: {
      legende: 'Un proxy de cache devant un service coûteux',
      code: `interface ImageService {
  fetch(id: string): string;
}

class RemoteImageService implements ImageService {
  fetch(id: string) { return \`données distantes \${id}\`; }
}

class CachingProxy implements ImageService {
  private cache = new Map<string, string>();
  constructor(private real: ImageService) {}

  fetch(id: string): string {
    if (!this.cache.has(id)) {
      this.cache.set(id, this.real.fetch(id)); // appel réel différé
    }
    return this.cache.get(id)!;
  }
}`,
    },
    casUsage: [
      'Chargement différé (lazy loading) d’un objet lourd.',
      'Contrôle d’accès et vérification de droits avant délégation.',
      'Mise en cache, journalisation ou comptage des appels à un service.',
    ],
    pieges: [
      'Empiler plusieurs proxys ajoute de la latence et brouille le flux d’exécution.',
      'Un proxy distant masque la nature réseau de l’appel (latence, échecs).',
      'Très proche du Decorator ; la distinction tient à l’intention : contrôler vs enrichir.',
    ],
  },

  // ---------------------------------------------------------------------------
  // Comportementaux — comment répartir les responsabilités et organiser la
  // communication entre objets.
  // ---------------------------------------------------------------------------
  {
    slug: 'chain-of-responsibility',
    icon: 'linear_scale',
    nom: 'Chain of Responsibility',
    nomFr: 'Chaîne de responsabilité',
    categorie: 'Comportemental',
    intention:
      'Faire passer une requête le long d’une chaîne de gestionnaires, chacun décidant de la traiter ou de la transmettre.',
    probleme:
      'Un traitement enchaîne des étapes conditionnelles (authentification, validation, quota…). Tout coder dans une seule fonction crée un bloc de `if` imbriqués, rigide et impossible à réordonner.',
    solution:
      'Chaque étape devient un maillon qui traite la requête ou la passe au suivant. On compose et réordonne la chaîne librement, sans toucher aux maillons.',
    exemple: {
      legende: 'Des maillons qui traitent ou transmettent la requête',
      code: `abstract class Handler {
  private next?: Handler;
  setNext(h: Handler): Handler { this.next = h; return h; }

  handle(request: string): string {
    return this.next ? this.next.handle(request) : 'non traité';
  }
}

class AuthHandler extends Handler {
  handle(request: string): string {
    if (request === 'anonyme') return 'refusé : authentification';
    return super.handle(request);
  }
}
class QuotaHandler extends Handler {
  handle(request: string): string {
    return 'servi';
  }
}

const chain = new AuthHandler();
chain.setNext(new QuotaHandler());
chain.handle('user'); // 'servi'`,
    },
    casUsage: [
      'Pipelines de middlewares (HTTP, validation, journalisation).',
      'Gestion d’événements remontant une hiérarchie (bubbling DOM).',
      'Niveaux d’approbation ou d’escalade d’une demande.',
    ],
    pieges: [
      'Une requête peut traverser toute la chaîne sans être traitée : prévoir un cas par défaut.',
      'Le flux est moins évident à suivre qu’une suite d’appels explicites.',
      'Une chaîne mal ordonnée produit des bugs subtils et difficiles à tracer.',
    ],
  },
  {
    slug: 'command',
    icon: 'terminal',
    nom: 'Command',
    nomFr: 'Commande',
    categorie: 'Comportemental',
    intention:
      'Encapsuler une requête dans un objet, pour la paramétrer, la mettre en file, la journaliser ou l’annuler.',
    probleme:
      'Lier directement un bouton à une action fige le couple émetteur/traitement. On ne peut alors ni rejouer, ni annuler, ni mettre en file d’attente l’opération.',
    solution:
      'On réifie l’action en objet exposant `execute()` (et souvent `undo()`). L’émetteur déclenche la commande sans connaître son contenu ; on peut la stocker, l’empiler ou la rejouer.',
    exemple: {
      legende: 'Une commande encapsule une action réversible',
      code: `interface Command {
  execute(): void;
  undo(): void;
}

class Light {
  on() { /* ... */ }
  off() { /* ... */ }
}

class TurnOnCommand implements Command {
  constructor(private light: Light) {}
  execute() { this.light.on(); }
  undo() { this.light.off(); }
}

class Remote {
  private history: Command[] = [];
  run(cmd: Command) { cmd.execute(); this.history.push(cmd); }
  undoLast() { this.history.pop()?.undo(); }
}`,
    },
    casUsage: [
      'Annuler/refaire (undo/redo) dans un éditeur.',
      'Files de tâches, planification et exécution différée.',
      'Boutons, raccourcis et menus déclenchant une même action réifiée.',
    ],
    pieges: [
      'Multiplie les petites classes : excessif pour une action triviale.',
      'Implémenter `undo()` correctement (capturer l’état) est souvent délicat.',
      'La journalisation des commandes peut grossir indéfiniment sans purge.',
    ],
  },
  {
    slug: 'interpreter',
    icon: 'translate',
    nom: 'Interpreter',
    nomFr: 'Interpréteur',
    categorie: 'Comportemental',
    intention:
      'Définir une grammaire pour un langage simple et un interpréteur qui évalue ses expressions.',
    probleme:
      'On a besoin d’évaluer des expressions récurrentes dans un mini-langage (filtres, règles, formules). Les traiter par manipulation de chaînes est fragile et impossible à étendre proprement.',
    solution:
      'Chaque règle de grammaire devient une classe d’expression dotée d’une méthode `interpret()`. Les expressions composées contiennent des sous-expressions, et l’évaluation se fait par récursion sur l’arbre.',
    exemple: {
      legende: 'Chaque type d’expression sait s’évaluer',
      code: `interface Expr {
  interpret(ctx: Record<string, number>): number;
}

class Num implements Expr {
  constructor(private value: number) {}
  interpret() { return this.value; }
}
class Var implements Expr {
  constructor(private name: string) {}
  interpret(ctx: Record<string, number>) { return ctx[this.name]; }
}
class Add implements Expr {
  constructor(private a: Expr, private b: Expr) {}
  interpret(ctx: Record<string, number>) {
    return this.a.interpret(ctx) + this.b.interpret(ctx);
  }
}

// x + 2
new Add(new Var('x'), new Num(2)).interpret({ x: 40 }); // 42`,
    },
    casUsage: [
      'Mini-langages de règles, filtres ou expressions configurables.',
      'Évaluation de formules ou de requêtes simples saisies par l’utilisateur.',
      'Moteurs de templates et calculatrices.',
    ],
    pieges: [
      'Ne passe pas l’échelle : une grammaire riche explose en nombre de classes.',
      'Pour un vrai langage, un générateur d’analyseur (parser) est préférable.',
      'L’analyse (parsing) de la chaîne en arbre n’est pas couverte par le patron.',
    ],
  },
  {
    slug: 'iterator',
    icon: 'repeat',
    nom: 'Iterator',
    nomFr: 'Itérateur',
    categorie: 'Comportemental',
    intention:
      'Parcourir séquentiellement les éléments d’une collection sans exposer sa représentation interne.',
    probleme:
      'Exposer la structure interne d’une collection (tableau, arbre, liste) pour la parcourir couple le client à cette structure et empêche d’en changer.',
    solution:
      'On extrait la logique de parcours dans un itérateur qui expose « élément suivant » et « est-ce fini ». La collection peut changer de structure ; le client itère toujours de la même façon.',
    exemple: {
      legende: 'Un itérateur natif via le protocole Symbol.iterator',
      code: `class NumberRange implements Iterable<number> {
  constructor(private start: number, private end: number) {}

  [Symbol.iterator](): Iterator<number> {
    let current = this.start;
    const end = this.end;
    return {
      next(): IteratorResult<number> {
        return current <= end
          ? { value: current++, done: false }
          : { value: undefined, done: true };
      },
    };
  }
}

for (const n of new NumberRange(1, 3)) {
  console.log(n); // 1, 2, 3
}`,
    },
    casUsage: [
      'Parcours uniforme de collections de structures internes variées.',
      'Itération paresseuse sur des flux ou des séquences infinies (générateurs).',
      'Exposer plusieurs ordres de parcours (préfixe, infixe) pour un même arbre.',
    ],
    pieges: [
      'Réinventer un itérateur là où le langage en fournit déjà (Symbol.iterator, générateurs).',
      'Modifier la collection pendant l’itération provoque des comportements indéfinis.',
      'Un itérateur sur une structure simple ajoute une indirection peu utile.',
    ],
  },
  {
    slug: 'mediator',
    icon: 'hub',
    nom: 'Mediator',
    nomFr: 'Médiateur',
    categorie: 'Comportemental',
    intention:
      'Centraliser la communication entre objets dans un médiateur, pour réduire leurs dépendances mutuelles.',
    probleme:
      'Quand de nombreux objets se connaissent et s’appellent directement, le couplage devient un plat de spaghettis : chaque changement se propage et la réutilisation devient impossible.',
    solution:
      'Les objets ne communiquent plus qu’à travers un médiateur. Chacun ignore les autres et ne connaît que le médiateur, qui orchestre les interactions. Le couplage redevient en étoile.',
    exemple: {
      legende: 'Les champs d’un formulaire dialoguent via le médiateur',
      code: `interface Mediator {
  notify(sender: string, event: string): void;
}

class Dialog implements Mediator {
  isLoggedIn = false;

  notify(sender: string, event: string) {
    if (sender === 'login' && event === 'click') {
      this.isLoggedIn = true; // orchestre les autres composants
    }
  }
}

class Button {
  constructor(private id: string, private mediator: Mediator) {}
  click() { this.mediator.notify(this.id, 'click'); }
}

const dialog = new Dialog();
new Button('login', dialog).click();`,
    },
    casUsage: [
      'Coordination de composants d’interface (formulaires, boîtes de dialogue).',
      'Contrôleurs de trafic, salons de discussion routant les messages.',
      'Découpler des modules qui devraient sinon se référencer mutuellement.',
    ],
    pieges: [
      'Le médiateur peut devenir un « objet dieu » concentrant toute la logique.',
      'On déplace la complexité plutôt que de la supprimer.',
      'À distinguer de l’Observer : ici la communication est centralisée, pas diffusée.',
    ],
  },
  {
    slug: 'memento',
    icon: 'history',
    nom: 'Memento',
    nomFr: 'Mémento',
    categorie: 'Comportemental',
    intention:
      'Capturer et restaurer l’état interne d’un objet sans violer son encapsulation.',
    probleme:
      'Implémenter une fonction « annuler » exige de sauvegarder l’état d’un objet. Exposer ses champs internes pour cela briserait son encapsulation.',
    solution:
      'L’objet produit un mémento opaque contenant son état, et sait se restaurer à partir d’un mémento. Un gardien stocke ces mémentos sans en connaître le contenu.',
    exemple: {
      legende: 'Un éditeur sauvegarde et restaure son état',
      code: `class EditorMemento {
  constructor(readonly content: string) {}
}

class Editor {
  private content = '';
  type(text: string) { this.content += text; }
  save(): EditorMemento { return new EditorMemento(this.content); }
  restore(m: EditorMemento) { this.content = m.content; }
}

const editor = new Editor();
editor.type('Bonjour');
const saved = editor.save();
editor.type(' monde');
editor.restore(saved); // revient à 'Bonjour'`,
    },
    casUsage: [
      'Fonctions annuler/refaire et points de restauration.',
      'Sauvegardes de progression (jeux, formulaires longs).',
      'Transactions : revenir à un état stable en cas d’échec.',
    ],
    pieges: [
      'Stocker de nombreux mémentos volumineux consomme beaucoup de mémoire.',
      'Le gardien doit gérer le cycle de vie des mémentos (purge).',
      'En TypeScript, garantir l’opacité du mémento demande de la discipline.',
    ],
  },
  {
    slug: 'observer',
    icon: 'notifications',
    nom: 'Observer',
    nomFr: 'Observateur',
    categorie: 'Comportemental',
    intention:
      'Définir une dépendance un-à-plusieurs : quand un sujet change, tous ses observateurs sont notifiés automatiquement.',
    probleme:
      'Plusieurs objets doivent réagir à l’évolution d’un autre. Les faire interroger (polling) en boucle est coûteux ; les coupler en dur au sujet le rend rigide.',
    solution:
      'Le sujet tient une liste d’observateurs et les notifie à chaque changement. Les observateurs s’abonnent et se désabonnent librement, sans que le sujet connaisse leur type concret.',
    exemple: {
      legende: 'Un sujet notifie ses observateurs abonnés',
      code: `interface Observer {
  update(value: number): void;
}

class Subject {
  private observers: Observer[] = [];
  subscribe(o: Observer) { this.observers.push(o); }
  unsubscribe(o: Observer) {
    this.observers = this.observers.filter((x) => x !== o);
  }
  private value = 0;
  set(v: number) {
    this.value = v;
    this.observers.forEach((o) => o.update(v));
  }
}

const subject = new Subject();
subject.subscribe({ update: (v) => console.log('reçu', v) });
subject.set(42);`,
    },
    casUsage: [
      'Liaison de données réactive (UI qui suit un modèle).',
      'Systèmes d’événements, publication/abonnement.',
      'Fondement des flux réactifs (RxJS, signals).',
    ],
    pieges: [
      'Oublier de se désabonner provoque des fuites de mémoire.',
      'Des notifications en cascade peuvent déclencher des mises à jour imprévues.',
      'L’ordre de notification des observateurs ne doit pas être supposé fixe.',
    ],
  },
  {
    slug: 'state',
    icon: 'toggle_on',
    nom: 'State',
    nomFr: 'État',
    categorie: 'Comportemental',
    intention:
      'Permettre à un objet de changer de comportement quand son état interne change, comme s’il changeait de classe.',
    probleme:
      'Un objet au comportement dépendant de son état (commande : en attente, payée, expédiée) se remplit de `switch (state)` dupliqués dans chaque méthode, difficiles à maintenir.',
    solution:
      'Chaque état devient une classe encapsulant le comportement correspondant. L’objet contexte délègue à l’objet état courant et change simplement de référence pour transiter.',
    exemple: {
      legende: 'Le contexte délègue à l’objet état courant',
      code: `interface State {
  next(order: Order): void;
  label(): string;
}

class Pending implements State {
  next(order: Order) { order.setState(new Shipped()); }
  label() { return 'en attente'; }
}
class Shipped implements State {
  next() { /* état final */ }
  label() { return 'expédiée'; }
}

class Order {
  private state: State = new Pending();
  setState(s: State) { this.state = s; }
  advance() { this.state.next(this); }
  status() { return this.state.label(); }
}`,
    },
    casUsage: [
      'Machines à états : commandes, connexions, lecteurs multimédia.',
      'Remplacer de gros `switch` sur un champ « statut ».',
      'Workflows dont les transitions doivent rester explicites.',
    ],
    pieges: [
      'Surdimensionné pour deux états : un booléen suffit parfois.',
      'La logique de transition peut se disperser entre les classes d’état.',
      'Proche du Strategy : ici les états se connaissent et déclenchent les transitions.',
    ],
  },
  {
    slug: 'strategy',
    icon: 'alt_route',
    nom: 'Strategy',
    nomFr: 'Stratégie',
    categorie: 'Comportemental',
    intention:
      'Définir une famille d’algorithmes interchangeables et les rendre permutables à l’exécution.',
    probleme:
      'Coder plusieurs variantes d’un algorithme (tri, calcul de prix, compression) dans une classe via des `if` la rend lourde et impossible à étendre sans la modifier.',
    solution:
      'Chaque algorithme est extrait dans une classe implémentant une interface commune. Le contexte référence une stratégie et délègue ; on l’échange à l’exécution sans toucher au contexte.',
    exemple: {
      legende: 'Une stratégie de tarification injectée et permutable',
      code: `interface PricingStrategy {
  price(amount: number): number;
}

class Standard implements PricingStrategy {
  price(amount: number) { return amount; }
}
class Premium implements PricingStrategy {
  price(amount: number) { return amount * 0.8; }
}

class Cart {
  constructor(private strategy: PricingStrategy) {}
  setStrategy(s: PricingStrategy) { this.strategy = s; }
  total(amount: number) { return this.strategy.price(amount); }
}

const cart = new Cart(new Standard());
cart.setStrategy(new Premium());
cart.total(100); // 80`,
    },
    casUsage: [
      'Algorithmes interchangeables : tri, validation, calcul de prix, compression.',
      'Choisir un comportement selon la configuration ou le profil utilisateur.',
      'Isoler des variantes pour les tester indépendamment.',
    ],
    pieges: [
      'Une simple fonction passée en paramètre suffit souvent en JavaScript/TypeScript.',
      'Trop de stratégies minuscules ajoutent du bruit sans valeur.',
      'Proche du State : la Strategy ignore ses pairs, elle ne gère pas de transitions.',
    ],
  },
  {
    slug: 'template-method',
    icon: 'list_alt',
    nom: 'Template Method',
    nomFr: 'Patron de méthode',
    categorie: 'Comportemental',
    intention:
      'Définir le squelette d’un algorithme dans une méthode, en laissant les sous-classes redéfinir certaines étapes.',
    probleme:
      'Plusieurs traitements suivent la même trame (ouvrir, traiter, fermer) mais diffèrent par quelques étapes. Dupliquer toute la trame dans chaque variante crée de la redondance.',
    solution:
      'Une classe de base fige l’ordre des étapes dans une méthode « patron » et déclare les étapes variables comme abstraites. Les sous-classes ne redéfinissent que ce qui change.',
    exemple: {
      legende: 'La trame est figée, les étapes varient par sous-classe',
      code: `abstract class DataProcessor {
  // méthode patron : ordre figé
  process(): string {
    const raw = this.read();
    const result = this.transform(raw);
    return this.save(result);
  }

  protected abstract read(): string;
  protected abstract transform(data: string): string;
  protected save(data: string) { return \`sauvé: \${data}\`; }
}

class CsvProcessor extends DataProcessor {
  protected read() { return 'a,b,c'; }
  protected transform(d: string) { return d.toUpperCase(); }
}

new CsvProcessor().process();`,
    },
    casUsage: [
      'Frameworks définissant un flux où l’utilisateur greffe des étapes (hooks).',
      'Traitements partageant une trame avec quelques variations.',
      'Cycles de vie standardisés (init → run → cleanup).',
    ],
    pieges: [
      'L’héritage couple fortement la sous-classe à la classe de base.',
      'Trop d’étapes abstraites rendent les sous-classes lourdes à écrire.',
      'La composition (Strategy) offre souvent plus de souplesse que l’héritage.',
    ],
  },
  {
    slug: 'visitor',
    icon: 'travel_explore',
    nom: 'Visitor',
    nomFr: 'Visiteur',
    categorie: 'Comportemental',
    intention:
      'Ajouter de nouvelles opérations à une structure d’objets sans modifier les classes des éléments visités.',
    probleme:
      'Ajouter une opération (export, calcul, validation) à toute une hiérarchie de classes oblige à modifier chacune d’elles. Ces opérations transverses polluent les classes métier.',
    solution:
      'On regroupe l’opération dans un visiteur exposant une méthode par type d’élément. Chaque élément accepte un visiteur et lui délègue (`accept`). On ajoute une opération en créant un visiteur, sans toucher aux éléments.',
    exemple: {
      legende: 'Un visiteur ajoute une opération à la hiérarchie',
      code: `interface Visitor {
  visitCircle(c: Circle): number;
  visitSquare(s: Square): number;
}

interface Shape {
  accept(v: Visitor): number;
}
class Circle implements Shape {
  constructor(public r: number) {}
  accept(v: Visitor) { return v.visitCircle(this); }
}
class Square implements Shape {
  constructor(public side: number) {}
  accept(v: Visitor) { return v.visitSquare(this); }
}

class AreaVisitor implements Visitor {
  visitCircle(c: Circle) { return Math.PI * c.r ** 2; }
  visitSquare(s: Square) { return s.side ** 2; }
}`,
    },
    casUsage: [
      'Parcours et opérations sur des arbres syntaxiques (compilateurs, linters).',
      'Exports multiples (JSON, XML) d’une même structure d’objets.',
      'Opérations transverses sur une hiérarchie stable.',
    ],
    pieges: [
      'Ajouter un nouveau type d’élément oblige à modifier tous les visiteurs.',
      'Le visiteur peut briser l’encapsulation en exigeant un accès large aux éléments.',
      'Mécanique verbeuse (double dispatch) lourde si la hiérarchie évolue souvent.',
    ],
  },
];
