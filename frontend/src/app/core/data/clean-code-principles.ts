import { CleanCodePrinciple } from '../models/clean-code-principle.model';

/**
 * Source unique du contenu pédagogique « Clean Code » : huit chapitres-clés
 * de l'ouvrage de Robert C. Martin, déclinés en principes pratiques, dans
 * l'ordre du parcours. Chaque chapitre porte un `slug` stable qui sert à la
 * fois de paramètre de route (page de détail `/clean-code/:chapitre`) et
 * d'identifiant pour le parcours précédent/suivant.
 *
 * Consommé par la page d'aperçu (clean-code, hub) et par les pages de détail
 * (clean-code-detail). Contenu pédagogique : définition, problème, pourquoi,
 * exemples de code à éviter / à préférer, et comment respecter le principe.
 */
export const CLEAN_CODE_PRINCIPLES: CleanCodePrinciple[] = [
  {
    numero: '1',
    slug: 'meaningful-names',
    icon: 'label',
    nomEn: 'Meaningful Names',
    nomFr: 'Noms significatifs',
    definition:
      'Un nom doit révéler l’intention : pourquoi cette chose existe, ce qu’elle fait et comment on l’utilise.',
    probleme:
      'Des noms vagues comme `d`, `tmp`, `data` ou `manager` obligent le lecteur à deviner. Le code se lit alors comme une énigme : il faut tout relire pour comprendre une seule ligne.',
    pourquoi: [
      'Lisibilité : un nom juste rend souvent le commentaire inutile.',
      'Maintenance : on retrouve et modifie le bon endroit sans relire toute la fonction.',
      'Communication : le code parle le langage du métier, pas celui de la machine.',
    ],
    exempleAvant: {
      legende: 'Non conforme — des noms qui cachent l’intention',
      code: `function getThem(list) {
  const l = [];
  for (const x of list) {
    if (x[0] === 4) l.push(x);
  }
  return l;
}`,
    },
    exempleApres: {
      legende: 'Conforme — les noms disent le quoi et le pourquoi',
      code: `const STATUS_FLAGGED = 4;

function getFlaggedCells(board) {
  return board.filter((cell) => cell.status === STATUS_FLAGGED);
}`,
    },
    commentRespecter: [
      'Choisis des noms prononçables et cherchables, quitte à les rallonger.',
      'Bannis les abréviations obscures et les noms fourre-tout (`data`, `info`, `manager`).',
      'Nomme dans le langage du domaine, pas dans celui de l’implémentation.',
      'Si un nom a besoin d’un commentaire pour s’expliquer, change le nom.',
    ],
  },
  {
    numero: '2',
    slug: 'functions',
    icon: 'functions',
    nomEn: 'Functions',
    nomFr: 'Fonctions',
    definition:
      'Une fonction doit être courte, faire une seule chose, et la faire à un seul niveau d’abstraction.',
    probleme:
      'Une fonction longue qui mêle l’orchestration et les détails, multiplie les arguments et les effets de bord, devient impossible à lire d’un coup d’œil — et tout aussi pénible à tester.',
    pourquoi: [
      'Lisibilité : une petite fonction se lit comme un paragraphe.',
      'Testabilité : une responsabilité unique se teste sans échafaudage.',
      'Réutilisation : extraire une fonction nomme un concept et le rend réemployable.',
    ],
    exempleAvant: {
      legende: 'Non conforme — la fonction fait tout, plusieurs niveaux mêlés',
      code: `function sendReport(users) {
  for (const u of users) {
    if (u.active && u.email) {
      const body = 'Bonjour ' + u.name + '...';
      smtp.connect();
      smtp.send(u.email, body);
      smtp.close();
    }
  }
}`,
    },
    exempleApres: {
      legende: 'Conforme — chaque fonction à un seul niveau, un seul rôle',
      code: `function sendReport(users) {
  users.filter(canReceiveReport).forEach(sendReportTo);
}

function canReceiveReport(user) {
  return user.active && Boolean(user.email);
}

function sendReportTo(user) {
  mailer.send(user.email, buildReportBody(user));
}`,
    },
    commentRespecter: [
      'Vise des fonctions courtes ; si tu hésites à extraire, extrais.',
      'Une fonction = une seule chose = un seul niveau d’abstraction.',
      'Limite les arguments (de zéro à trois) ; regroupe-les en objet au-delà.',
      'Évite les effets de bord cachés et les drapeaux booléens en paramètre.',
    ],
  },
  {
    numero: '3',
    slug: 'comments',
    icon: 'comment',
    nomEn: 'Comments',
    nomFr: 'Commentaires',
    definition:
      'Le bon commentaire explique un « pourquoi » que le code ne peut pas dire ; le meilleur est celui qu’on a rendu inutile.',
    probleme:
      'Un commentaire qui paraphrase le code finit par mentir en vieillissant, et compense souvent un code obscur au lieu de le clarifier. Le bruit cache alors le peu de signal qui comptait.',
    pourquoi: [
      'Vérité : un code clair ne ment pas, contrairement à un commentaire qui dérive.',
      'Intention : réserver le commentaire au « pourquoi » le rend précieux.',
      'Sobriété : moins de bruit, plus de signal.',
    ],
    exempleAvant: {
      legende: 'Non conforme — le commentaire répète le code',
      code: `// incrémente i de 1
i = i + 1;

// vérifie si l'utilisateur est majeur
if (user.age >= 18) { /* ... */ }`,
    },
    exempleApres: {
      legende:
        'Conforme — le code se passe de commentaire, le « pourquoi » reste',
      code: `i = i + 1;

if (isAdult(user)) { /* ... */ }

// Le fournisseur limite à 50 req/s : on temporise pour éviter le 429.
await sleep(RATE_LIMIT_DELAY_MS);`,
    },
    commentRespecter: [
      'Avant de commenter, demande-toi si un meilleur nom rendrait le commentaire inutile.',
      'Réserve les commentaires au « pourquoi » : décision, contrainte, piège.',
      'Supprime le code commenté : l’historique git le garde pour toi.',
      'Méfie-toi des commentaires qui vieillissent — un commentaire faux est pire qu’aucun.',
    ],
  },
  {
    numero: '4',
    slug: 'formatting',
    icon: 'format_align_left',
    nomEn: 'Formatting',
    nomFr: 'Mise en forme',
    definition:
      'La mise en forme est une communication : un code aéré et cohérent se lit avant même d’être compris.',
    probleme:
      'Une indentation erratique, des fichiers fourre-tout et des éléments liés éloignés exigent un effort de lecture constant — et chaque modification produit un diff bruyant.',
    pourquoi: [
      'Lisibilité : l’œil suit la structure quand l’espacement la révèle.',
      'Cohésion d’équipe : un style commun supprime les débats et les diffs cosmétiques.',
      'Proximité : ce qui se lit ensemble doit rester ensemble.',
    ],
    exempleAvant: {
      legende: 'Non conforme — densité et incohérence brouillent la lecture',
      code: `function price(items){let t=0;for(const i of items){t+=i.qty*i.price}
if(t>100){t=t*0.9}
return t}`,
    },
    exempleApres: {
      legende: 'Conforme — espacement régulier, intentions séparées',
      code: `const BULK_THRESHOLD = 100;
const BULK_DISCOUNT = 0.9;

function price(items) {
  const total = items.reduce((sum, i) => sum + i.qty * i.price, 0);

  return total > BULK_THRESHOLD ? total * BULK_DISCOUNT : total;
}`,
    },
    commentRespecter: [
      'Confie le style à un formateur automatique (Prettier) plutôt qu’à la discipline.',
      'Garde proches les choses liées ; sépare par une ligne vide les idées distinctes.',
      'Vise des fichiers courts, lus de haut en bas comme un article.',
      'Adopte le style de l’équipe, même si ce n’est pas ton préféré.',
    ],
  },
  {
    numero: '5',
    slug: 'error-handling',
    icon: 'error',
    nomEn: 'Error Handling',
    nomFr: 'Gestion des erreurs',
    definition:
      'Gérer les erreurs ne doit pas noyer la logique : préfère les exceptions aux codes de retour, et ne renvoie jamais `null` en douce.',
    probleme:
      'Des codes d’erreur vérifiés partout, un `null` qui se propage et des blocs `catch` vides finissent par noyer le chemin nominal sous la défense — et laissent passer des bugs en silence.',
    pourquoi: [
      'Lisibilité : séparer le chemin nominal du traitement d’erreur clarifie les deux.',
      'Robustesse : une exception non avalée remonte là où on peut la traiter.',
      'Sûreté : bannir `null` supprime une classe entière de bugs.',
    ],
    exempleAvant: {
      legende: 'Non conforme — codes de retour et null mêlés à la logique',
      code: `function totalDue(id) {
  const user = findUser(id);
  if (user === null) return -1;
  const cart = user.cart;
  if (cart === null) return -1;
  return cart.total;
}`,
    },
    exempleApres: {
      legende: 'Conforme — exceptions et valeurs sûres, logique dégagée',
      code: `function totalDue(id) {
  return findUser(id).cart.total; // panier garanti non null
}

function findUser(id) {
  const user = repo.byId(id);
  if (!user) throw new UserNotFoundError(id);
  return user;
}`,
    },
    commentRespecter: [
      'Préfère les exceptions aux codes de retour qui polluent chaque appelant.',
      'Ne renvoie ni n’accepte `null` : renvoie un objet vide, une valeur optionnelle, ou lève.',
      'N’avale jamais une exception dans un `catch` vide ; au minimum, journalise et relance.',
      'Donne du contexte à tes erreurs : quoi, où, avec quelle donnée.',
    ],
  },
  {
    numero: '6',
    slug: 'boundaries',
    icon: 'fence',
    nomEn: 'Boundaries',
    nomFr: 'Limites',
    definition:
      'Aux frontières avec du code tiers, isole la dépendance derrière une interface qui t’appartient.',
    probleme:
      'Appeler partout l’API d’une librairie externe soude ton code à un détail que tu ne contrôles pas : une montée de version casse tout, et tes tests dépendent du vrai service.',
    pourquoi: [
      'Découplage : le métier dépend de ton interface, pas de la librairie.',
      'Testabilité : tu remplaces la frontière par un double en test.',
      'Évolutivité : changer de fournisseur ne touche qu’un seul adaptateur.',
    ],
    exempleAvant: {
      legende: 'Non conforme — l’API tierce fuit dans tout le métier',
      code: `import Stripe from 'stripe';
const stripe = new Stripe(KEY);

async function checkout(order) {
  // chaque appel dépend de la forme exacte de l'API Stripe
  await stripe.charges.create({ amount: order.total, currency: 'eur' });
}`,
    },
    exempleApres: {
      legende: 'Conforme — une frontière qui t’appartient enveloppe le tiers',
      code: `interface PaymentGateway {
  charge(amountCents: number): Promise<void>;
}

class StripeGateway implements PaymentGateway {
  charge(amountCents: number) {
    return this.stripe.charges.create({ amount: amountCents, currency: 'eur' });
  }
}

async function checkout(order, gateway: PaymentGateway) {
  await gateway.charge(order.total);
}`,
    },
    commentRespecter: [
      'Enveloppe chaque dépendance externe derrière une interface que tu définis.',
      'Convertis les types du tiers en tes propres types dès la frontière.',
      'Écris des « tests d’apprentissage » pour comprendre et verrouiller le comportement du tiers.',
      'Garde le code tiers loin du cœur : un seul endroit à changer s’il évolue.',
    ],
  },
  {
    numero: '7',
    slug: 'classes',
    icon: 'category',
    nomEn: 'Classes',
    nomFr: 'Classes',
    definition:
      'Une classe doit être petite, cohésive, et n’avoir qu’une seule raison de changer.',
    probleme:
      'Une classe « dieu » accumule champs et méthodes sans lien : sa cohésion s’effondre, on ne sait plus ce qu’elle représente, et la moindre évolution la fait changer.',
    pourquoi: [
      'Lisibilité : une petite classe cohésive s’explique par son nom.',
      'Maintenance : une seule raison de changer limite l’onde de choc.',
      'Cohésion : des méthodes qui partagent les mêmes champs forment un vrai concept.',
    ],
    exempleAvant: {
      legende: 'Non conforme — une classe fourre-tout, faiblement cohésive',
      code: `class User {
  name; email; passwordHash;
  validateEmail() { /* ... */ }
  hashPassword() { /* ... */ }
  saveToDb() { /* ... */ }
  renderProfileHtml() { /* ... */ }
  sendNewsletter() { /* ... */ }
}`,
    },
    exempleApres: {
      legende: 'Conforme — des classes petites, chacune un seul rôle',
      code: `class User {
  constructor(public name: string, public email: Email) {}
}
class UserRepository { save(user: User) { /* ... */ } }
class ProfileView { render(user: User): string { /* ... */ } }
class Newsletter { sendTo(user: User) { /* ... */ } }`,
    },
    commentRespecter: [
      'Garde tes classes petites ; mesure-les en responsabilités, pas en lignes.',
      'Si un sous-groupe de méthodes n’utilise qu’un sous-groupe de champs, extrais une classe.',
      'Une classe = une seule raison de changer (le « S » de SOLID).',
      'Sépare ce qui varie pour des raisons différentes : métier, persistance, présentation.',
    ],
  },
  {
    numero: '8',
    slug: 'unit-tests',
    icon: 'science',
    nomEn: 'Unit Tests',
    nomFr: 'Tests unitaires',
    definition:
      'Un test doit être aussi propre que le code de production, et suivre les règles F.I.R.S.T.',
    probleme:
      'Des tests fragiles, lents, dépendants les uns des autres et qui vérifient dix choses à la fois finissent par perdre la confiance de l’équipe — qui cesse alors de les maintenir.',
    pourquoi: [
      'Confiance : une suite propre autorise le changement sans peur.',
      'Documentation : un test lisible montre comment utiliser le code.',
      'Conception : du code testable est du code faiblement couplé.',
    ],
    exempleAvant: {
      legende: 'Non conforme — un test qui vérifie tout, illisible',
      code: `test('user', () => {
  const u = create();
  u.name = 'A'; save(u); const r = load(u.id);
  expect(r.name).toBe('A'); expect(r.active).toBe(true);
  expect(db.count()).toBe(1); expect(mailer.sent).toBe(1);
});`,
    },
    exempleApres: {
      legende: 'Conforme — un concept par test, arrangé-agi-attendu',
      code: `test('recharge un utilisateur enregistré', () => {
  const user = aUser({ name: 'Ada' });          // Arrange
  repo.save(user);                              // Act
  expect(repo.byId(user.id).name).toBe('Ada');  // Assert
});

test('créer un utilisateur déclenche un mail de bienvenue', () => {
  service.create(aUser());
  expect(mailer.sentTo).toHaveLength(1);
});`,
    },
    commentRespecter: [
      'Traite tes tests comme du code de production : lisibles, nommés, refactorés.',
      'Un seul concept vérifié par test ; structure en Arrange-Act-Assert.',
      'Suis F.I.R.S.T. : Fast, Independent, Repeatable, Self-validating, Timely.',
      'Rends chaque test indépendant : aucun ordre, aucun état partagé.',
    ],
  },
];
