import { Component, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { CLEAN_CODE_PRINCIPLES } from '../../core/data/clean-code-principles';
import { CleanCodePrinciple } from '../../core/models/clean-code-principle.model';
import {
  BreadcrumbComponent,
  BreadcrumbItem,
} from '../../shared/components/breadcrumb/breadcrumb.component';
import {
  SequentialNavComponent,
  SequentialNavItem,
} from '../../shared/components/sequential-nav/sequential-nav.component';
import { neighborSlug } from '../../core/utils/sequential-nav';

/** Ordre du parcours — dérivé de l'unique source CLEAN_CODE_PRINCIPLES. */
const PRINCIPLE_SLUGS = CLEAN_CODE_PRINCIPLES.map((p) => p.slug);

/**
 * Page de détail d'un chapitre Clean Code : définition, pourquoi, exemples de
 * code à éviter / à préférer, et comment le respecter.
 *
 * Le chapitre est résolu depuis le paramètre de route `:chapitre`. Un slug
 * inconnu redirige vers le hub `/clean-code`. Le suivi réactif du paramètre
 * couvre la navigation précédent/suivant entre routes sœurs (Angular réutilise
 * alors le composant) — même pattern que la page de détail SOLID.
 */
@Component({
  selector: 'app-clean-code-detail',
  imports: [
    BreadcrumbComponent,
    SequentialNavComponent,
    MatCardModule,
    MatIconModule,
  ],
  templateUrl: './clean-code-detail.component.html',
  styleUrl: './clean-code-detail.component.scss',
})
export class CleanCodeDetailComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  /** Slug courant, suivi de façon réactive (cf. constructeur). */
  private readonly slug = signal('');

  /** Chapitre courant (undefined si slug inconnu → redirection). */
  readonly principle = signal<CleanCodePrinciple | undefined>(undefined);

  /** Fil d'Ariane : Accueil › Clean Code › {nom du chapitre}. */
  readonly breadcrumb = computed<BreadcrumbItem[]>(() => [
    { label: 'Accueil', link: '/' },
    { label: 'Clean Code', link: '/clean-code' },
    { label: this.principle()?.nomFr ?? '' },
  ]);

  /** Chapitre précédent / suivant du parcours (undefined aux extrémités). */
  readonly prev = computed<SequentialNavItem | undefined>(() =>
    this.neighbor(-1, 'précédent')
  );
  readonly next = computed<SequentialNavItem | undefined>(() =>
    this.neighbor(1, 'suivant')
  );

  constructor() {
    this.route.paramMap.pipe(takeUntilDestroyed()).subscribe((params) => {
      const slug = params.get('chapitre') ?? '';
      const principle = CLEAN_CODE_PRINCIPLES.find((p) => p.slug === slug);
      if (!principle) {
        this.router.navigate(['/clean-code']);
        return;
      }
      this.slug.set(slug);
      this.principle.set(principle);
    });
  }

  /** Chapitre voisin dans PRINCIPLE_SLUGS (delta -1 = précédent, +1 = suivant). */
  private neighbor(delta: number, sens: string): SequentialNavItem | undefined {
    const slug = neighborSlug(PRINCIPLE_SLUGS, this.slug(), delta);
    if (!slug) return undefined;
    const nomFr =
      CLEAN_CODE_PRINCIPLES.find((p) => p.slug === slug)?.nomFr ?? '';
    return { slug, label: nomFr, ariaLabel: `Chapitre ${sens} : ${nomFr}` };
  }
}
