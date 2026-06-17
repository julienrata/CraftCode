import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { SOLID_PRINCIPLES } from '../../core/data/solid-principles';
import { SolidPrinciple } from '../../core/models/solid-principle.model';
import {
  BreadcrumbComponent,
  BreadcrumbItem,
} from '../../shared/components/breadcrumb/breadcrumb.component';
import { ConfettiComponent } from '../../shared/components/confetti/confetti.component';

/**
 * Page pédagogique « Principes SOLID ».
 *
 * Hub des 5 principes (S-O-L-I-D) : une carte par principe, cliquable vers sa
 * page de détail (`/solid/:principe`). Le contenu provient de la source unique
 * SOLID_PRINCIPLES.
 */
@Component({
  selector: 'app-solid',
  imports: [
    RouterLink,
    BreadcrumbComponent,
    ConfettiComponent,
    MatCardModule,
    MatIconModule,
  ],
  templateUrl: './solid.component.html',
  styleUrl: './solid.component.scss',
})
export class SolidComponent {
  /** Fil d'Ariane : Accueil › Principes SOLID (page courante). */
  readonly breadcrumb: BreadcrumbItem[] = [
    { label: 'Accueil', link: '/' },
    { label: 'Principes SOLID' },
  ];

  /** Les 5 principes, dans l'ordre de l'acronyme (S → O → L → I → D). */
  readonly principles: SolidPrinciple[] = SOLID_PRINCIPLES;
}
