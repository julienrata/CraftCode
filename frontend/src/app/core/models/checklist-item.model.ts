/** Un item de la checklist code review, renvoyé par GET /api/code-review. */
export interface ChecklistItem {
  _id: string;
  category: string;
  label: string;
  description: string;
  order: number;
}

/** Items regroupés par catégorie, pour l'affichage. */
export interface ChecklistGroup {
  category: string;
  items: ChecklistItem[];
}
