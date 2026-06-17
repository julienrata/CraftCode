/**
 * Persistance d'un ensemble d'ids cochés dans le localStorage, partagée par les
 * outils à cases à cocher (checklist Code Review, phases de revue). La clé est
 * fournie par l'appelant (cf. convention `craftcode.<domaine>.<slug>.<quoi>`).
 */

/** Lit l'ensemble d'ids cochés. Tolère un JSON corrompu / un mode privé. */
export function loadCheckedSet(key: string): Set<string> {
  try {
    const raw = localStorage.getItem(key);
    return raw ? new Set<string>(JSON.parse(raw)) : new Set<string>();
  } catch {
    return new Set<string>();
  }
}

/** Persiste l'ensemble d'ids cochés (sérialise le `Set` en tableau). */
export function persistCheckedSet(key: string, ids: Set<string>): void {
  localStorage.setItem(key, JSON.stringify(Array.from(ids)));
}
