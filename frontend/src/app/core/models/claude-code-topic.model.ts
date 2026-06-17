/** Un bloc de code illustratif (affiché tel quel, jamais exécuté). */
export interface ClaudeCodeExample {
  /** Légende du bloc (ex. « Squelette minimal d'un CLAUDE.md »). */
  legende: string;
  /** Le code / la configuration — extrait illustratif, commenté. */
  code: string;
}

/**
 * Un sujet de mise en place de Claude Code dans un projet (fichiers markdown,
 * hooks, slash-commands & skills, settings.json & serveurs MCP).
 */
export interface ClaudeCodeTopic {
  /** Slug court pour la route de détail (ex. `hooks`). Stable : sert d'URL. */
  slug: string;
  icon: string;
  /** Titre du sujet (carte d'aperçu + en-tête de la page de détail). */
  titre: string;
  /** Accroche courte (une phrase) affichée sur la carte d'aperçu. */
  accroche: string;
  /** Définition / cadrage du sujet (en-tête de la page de détail). */
  definition: string;
  /** Pourquoi ce sujet compte — points développés (page de détail). */
  pourquoi: string[];
  /** Exemples concrets et commentés (fichiers, config, hooks…). */
  exemples: ClaudeCodeExample[];
  /** Conseils pratiques pour le mettre en place (impératif, tutoiement). */
  commentFaire: string[];
}
