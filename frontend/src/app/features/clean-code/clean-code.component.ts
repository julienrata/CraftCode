import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { CLEAN_CODE_PRINCIPLES } from '../../core/data/clean-code-principles';
import { CleanCodePrinciple } from '../../core/models/clean-code-principle.model';
import {
  BreadcrumbComponent,
  BreadcrumbItem,
} from '../../shared/components/breadcrumb/breadcrumb.component';
import { ConfettiComponent } from '../../shared/components/confetti/confetti.component';

/**
 * Page pédagogique « Clean Code ».
 *
 * Hub des huit chapitres-clés : une carte par chapitre, cliquable vers sa
 * page de détail (`/clean-code/:chapitre`). Le contenu provient de la source
 * unique CLEAN_CODE_PRINCIPLES.
 */
@Component({
  selector: 'app-clean-code',
  imports: [
    RouterLink,
    BreadcrumbComponent,
    ConfettiComponent,
    MatCardModule,
    MatIconModule,
  ],
  templateUrl: './clean-code.component.html',
  styleUrl: './clean-code.component.scss',
})
export class CleanCodeComponent {
  /** Fil d'Ariane : Accueil › Clean Code (page courante). */
  readonly breadcrumb: BreadcrumbItem[] = [
    { label: 'Accueil', link: '/' },
    { label: 'Clean Code' },
  ];

  /** Les huit chapitres, dans l'ordre du parcours. */
  readonly principles: CleanCodePrinciple[] = CLEAN_CODE_PRINCIPLES;
}
