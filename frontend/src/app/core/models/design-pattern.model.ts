/** Un bloc de code illustratif (affiché tel quel, jamais exécuté). */
export interface DesignPatternCodeExample {
  /** Légende du bloc (ex. « Une fabrique qui décide du type concret »). */
  legende: string;
  /** Le code — TypeScript illustratif. */
  code: string;
}

/** Les trois familles de patrons du Gang of Four. */
export type DesignPatternCategory =
  | 'Créationnel'
  | 'Structurel'
  | 'Comportemental';

/** Un des 23 patrons de conception du Gang of Four. */
export interface DesignPattern {
  /** Slug court pour la route de détail (ex. `singleton`). */
  slug: string;
  icon: string;
  /** Nom canonique (anglais) du patron (ex. « Singleton »). */
  nom: string;
  /** Glose française (ex. « Instance unique »). */
  nomFr: string;
  /** Famille du patron : créationnel, structurel ou comportemental. */
  categorie: DesignPatternCategory;
  /** Intention — ce que le patron cherche à accomplir (carte + en-tête). */
  intention: string;
  /** Le problème que le patron résout. */
  probleme: string;
  /** La solution proposée par le patron — comment il s'y prend. */
  solution: string;
  /** Exemple de mise en œuvre en TypeScript. */
  exemple: DesignPatternCodeExample;
  /** Cas d'usage concrets où le patron brille. */
  casUsage: string[];
  /** Pièges et anti-patterns à connaître avant de l'employer. */
  pieges: string[];
}
