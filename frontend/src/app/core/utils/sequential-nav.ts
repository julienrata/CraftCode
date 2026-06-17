/**
 * Résolution du slug voisin dans un parcours séquentiel (précédent / suivant),
 * partagée par les pages de détail (SOLID, Design Patterns, Claude Code, phases
 * de revue). L'ordre du parcours est porté par la liste de slugs fournie.
 */

/**
 * Renvoie le slug voisin de `current` dans `slugs` (`delta` -1 = précédent,
 * +1 = suivant), ou `undefined` si `current` est inconnu ou aux extrémités.
 */
export function neighborSlug(
  slugs: readonly string[],
  current: string,
  delta: number
): string | undefined {
  const index = slugs.indexOf(current);
  if (index === -1) return undefined;
  return slugs[index + delta];
}
