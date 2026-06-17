import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

/** Un lien de la navigation principale (toolbar). */
interface NavLink {
  label: string;
  link: string;
  /** Correspondance exacte requise pour l'état actif (utile pour l'accueil). */
  exact?: boolean;
}

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatToolbarModule,
    MatIconModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'CraftCode';

  /** Sections principales atteignables depuis n'importe quelle page. */
  readonly navLinks: NavLink[] = [
    { label: 'Accueil', link: '/', exact: true },
    { label: 'Checklist Code Review', link: '/code-review' },
    { label: 'Bonnes pratiques', link: '/bonnes-pratiques' },
    { label: 'Principes SOLID', link: '/solid' },
    { label: 'Design Patterns', link: '/design-patterns' },
    { label: 'Claude Code', link: '/claude-code-setup' },
  ];
}
