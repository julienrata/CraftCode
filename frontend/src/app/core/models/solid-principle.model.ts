/** Un bloc de code illustratif (affiché tel quel, jamais exécuté). */
export interface SolidCodeExample {
  /** Légende du bloc (ex. « Version non conforme au SRP »). */
  legende: string;
  /** Le code — TypeScript / pseudo-code illustratif. */
  code: string;
}

/** Un des cinq principes SOLID de la conception orientée objet. */
export interface SolidPrinciple {
  /** Lettre de l'acronyme (S, O, L, I, D). */
  lettre: string;
  /** Slug court pour la route de détail et l'ancre (ex. `srp`). */
  slug: string;
  icon: string;
  /** Nom complet en anglais (ex. « Single Responsibility Principle »). */
  nomEn: string;
  /** Nom complet en français (ex. « Responsabilité unique »). */
  nomFr: string;
  /** Définition courte (carte d'aperçu + en-tête de la page de détail). */
  definition: string;
  /** Le problème que le principe résout (carte d'aperçu). */
  probleme: string;
  /** Pourquoi ce principe compte — points développés (page de détail). */
  pourquoi: string[];
  /** Exemple de code à éviter (viole le principe). */
  exempleAvant: SolidCodeExample;
  /** Exemple de code à préférer (respecte le principe). */
  exempleApres: SolidCodeExample;
  /** Techniques / bonnes pratiques pour respecter le principe. */
  commentRespecter: string[];
}
