import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

/** Un maillon du parcours séquentiel (précédent ou suivant). */
export interface SequentialNavItem {
  slug: string;
  label: string;
  /** Libellé d'accessibilité complet (« Principe précédent : … »). */
  ariaLabel: string;
}

/**
 * Navigation « précédent / suivant » d'un parcours séquentiel, partagée par les
 * pages de détail (SOLID, Design Patterns, Claude Code, phases de revue). Pilotée
 * par `prev`/`next` (undefined aux extrémités) ; `routeBase` est le segment de
 * route commun (`/solid`…) auquel le `slug` du maillon est concaténé.
 */
@Component({
  selector: 'app-sequential-nav',
  imports: [RouterLink, MatIconModule],
  templateUrl: './sequential-nav.component.html',
  styleUrl: './sequential-nav.component.scss',
})
export class SequentialNavComponent {
  /** Segment de route commun, ex. `/solid` (concaténé au `slug`). */
  @Input({ required: true }) routeBase!: string;

  /** Libellé d'accessibilité de la balise `<nav>`. */
  @Input({ required: true }) navLabel!: string;

  /** Maillon précédent (undefined en début de parcours). */
  @Input() prev?: SequentialNavItem;

  /** Maillon suivant (undefined en fin de parcours). */
  @Input() next?: SequentialNavItem;
}
