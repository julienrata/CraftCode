import { Component, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { DESIGN_PATTERNS } from '../../core/data/design-patterns';
import { DesignPattern } from '../../core/models/design-pattern.model';
import {
  BreadcrumbComponent,
  BreadcrumbItem,
} from '../../shared/components/breadcrumb/breadcrumb.component';
import {
  SequentialNavComponent,
  SequentialNavItem,
} from '../../shared/components/sequential-nav/sequential-nav.component';

/** Ordre du parcours — dérivé de l'unique source DESIGN_PATTERNS. */
const PATTERN_SLUGS = DESIGN_PATTERNS.map((p) => p.slug);

/**
 * Page de détail d'un design pattern : intention, problème, solution, exemple
 * de code, cas d'usage et pièges.
 *
 * Le patron est résolu depuis le paramètre de route `:pattern`. Un slug inconnu
 * redirige vers le hub `/design-patterns`. Le suivi réactif du paramètre couvre
 * la navigation précédent/suivant entre routes sœurs (Angular réutilise alors
 * le composant) — même pattern que la page de détail SOLID.
 */
@Component({
  selector: 'app-design-pattern-detail',
  imports: [
    BreadcrumbComponent,
    SequentialNavComponent,
    MatCardModule,
    MatIconModule,
  ],
  templateUrl: './design-pattern-detail.component.html',
  styleUrl: './design-pattern-detail.component.scss',
})
export class DesignPatternDetailComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  /** Slug courant, suivi de façon réactive (cf. constructeur). */
  private readonly slug = signal('');

  /** Patron courant (undefined si slug inconnu → redirection). */
  readonly pattern = signal<DesignPattern | undefined>(undefined);

  /** Fil d'Ariane : Accueil › Design Patterns › {nom du patron}. */
  readonly breadcrumb = computed<BreadcrumbItem[]>(() => [
    { label: 'Accueil', link: '/' },
    { label: 'Design Patterns', link: '/design-patterns' },
    { label: this.pattern()?.nom ?? '' },
  ]);

  /** Patron précédent / suivant du parcours (undefined aux extrémités). */
  readonly prev = computed<SequentialNavItem | undefined>(() =>
    this.neighbor(-1, 'précédent')
  );
  readonly next = computed<SequentialNavItem | undefined>(() =>
    this.neighbor(1, 'suivant')
  );

  constructor() {
    this.route.paramMap.pipe(takeUntilDestroyed()).subscribe((params) => {
      const slug = params.get('pattern') ?? '';
      const pattern = DESIGN_PATTERNS.find((p) => p.slug === slug);
      if (!pattern) {
        this.router.navigate(['/design-patterns']);
        return;
      }
      this.slug.set(slug);
      this.pattern.set(pattern);
    });
  }

  /** Patron voisin dans PATTERN_SLUGS (delta -1 = précédent, +1 = suivant). */
  private neighbor(delta: number, sens: string): SequentialNavItem | undefined {
    const index = PATTERN_SLUGS.indexOf(this.slug());
    if (index === -1) return undefined;
    const slug = PATTERN_SLUGS[index + delta];
    if (!slug) return undefined;
    const nom = DESIGN_PATTERNS.find((p) => p.slug === slug)?.nom ?? '';
    return { slug, label: nom, ariaLabel: `Patron ${sens} : ${nom}` };
  }
}
