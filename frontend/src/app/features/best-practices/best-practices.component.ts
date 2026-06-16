import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { CODE_REVIEW_SECTIONS } from '../../core/data/code-review-practices';
import { Section } from '../../core/models/code-review-practice.model';
import {
  BreadcrumbComponent,
  BreadcrumbItem,
} from '../../shared/components/breadcrumb/breadcrumb.component';

/**
 * Page pédagogique « Les bonnes pratiques de la Code Review ».
 *
 * Parcours narratif des 8 étapes d'une revue (avant / pendant / après),
 * dans l'ordre exact des dossiers source. Le contenu provient de la source
 * unique CODE_REVIEW_SECTIONS — c'est une page de lecture, pas un outil.
 */
@Component({
  selector: 'app-best-practices',
  imports: [
    RouterLink,
    BreadcrumbComponent,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './best-practices.component.html',
  styleUrl: './best-practices.component.scss',
})
export class BestPracticesComponent {
  /** Fil d'Ariane : Accueil › Bonnes pratiques (page courante). */
  readonly breadcrumb: BreadcrumbItem[] = [
    { label: 'Accueil', link: '/' },
    { label: 'Bonnes pratiques' },
  ];

  /** Les 8 sections, dans l'ordre des dossiers (0 → 7). */
  readonly sections: Section[] = CODE_REVIEW_SECTIONS;
}
