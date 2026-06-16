/** Un outil du registre, tel que renvoyé par GET /api/tools. */
export interface Tool {
  _id: string;
  slug: string;
  name: string;
  description: string;
  icon: string;
  route: string;
  available: boolean;
  order: number;
}
