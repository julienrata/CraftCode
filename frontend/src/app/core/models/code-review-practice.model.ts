/** Une pratique de revue de code : titre court, accroche, et « pourquoi ». */
export interface Practice {
  /** Identifiant stable `${numero}-${index}` (ex. `3-0`), sert à la persistance. */
  id: string;
  icon: string;
  titre: string;
  accroche: string;
  pourquoi: string;
}

/** Rôle concerné par une section — sert au libellé et à la couleur du badge. */
export type RoleKey = 'equipe' | 'auteur' | 'relecteur' | 'mixte';

/** Une étape du parcours de revue : un dossier source = une section. */
export interface Section {
  numero: number;
  titre: string;
  role: string;
  roleKey: RoleKey;
  icon: string;
  pratiques: Practice[];
}
