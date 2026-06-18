/** Un bloc de code illustratif (affiché tel quel, jamais exécuté). */
export interface CleanCodeExample {
  /** Légende du bloc (ex. « Version qui cache l'intention »). */
  legende: string;
  /** Le code — TypeScript / pseudo-code illustratif. */
  code: string;
}

/** Un chapitre de Clean Code (Robert C. Martin) décliné en principe pratique. */
export interface CleanCodePrinciple {
  /** Numéro de chapitre (ordre du parcours, ex. « 1 »). */
  numero: string;
  /** Slug court pour la route de détail et l'ancre (ex. `meaningful-names`). */
  slug: string;
  icon: string;
  /** Titre en anglais (ex. « Meaningful Names »). */
  nomEn: string;
  /** Titre en français (ex. « Noms significatifs »). */
  nomFr: string;
  /** Définition courte (carte d'aperçu + en-tête de la page de détail). */
  definition: string;
  /** Le problème que le principe résout (carte d'aperçu). */
  probleme: string;
  /** Pourquoi ce principe compte — points développés (page de détail). */
  pourquoi: string[];
  /** Exemple de code à éviter (ignore le principe). */
  exempleAvant: CleanCodeExample;
  /** Exemple de code à préférer (respecte le principe). */
  exempleApres: CleanCodeExample;
  /** Techniques / bonnes pratiques pour respecter le principe. */
  commentRespecter: string[];
}
