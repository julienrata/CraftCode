import { Component, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { SOLID_PRINCIPLES } from '../../core/data/solid-principles';
import { SolidPrinciple } from '../../core/models/solid-principle.model';
import {
  BreadcrumbComponent,
  BreadcrumbItem,
} from '../../shared/components/breadcrumb/breadcrumb.component';

/** Ordre du parcours — dérivé de l'unique source SOLID_PRINCIPLES. */
const PRINCIPLE_SLUGS = SOLID_PRINCIPLES.map((p) => p.slug);

/** Un principe voisin pour le parcours séquentiel (précédent/suivant). */
interface PrincipleLink {
  slug: string;
  nomFr: string;
}

/**
 * Page de détail d'un principe SOLID : définition, pourquoi, exemples de code
 * à éviter / à préférer, et comment le respecter.
 *
 * Le principe est résolu depuis le paramètre de route `:principe`. Un slug
 * inconnu redirige vers le hub `/solid`. Le suivi réactif du paramètre couvre
 * la navigation précédent/suivant entre routes sœurs (Angular réutilise alors
 * le composant) — même pattern que la page-support des phases de revue.
 */
@Component({
  selector: 'app-solid-detail',
  imports: [RouterLink, BreadcrumbComponent, MatCardModule, MatIconModule],
  templateUrl: './solid-detail.component.html',
  styleUrl: './solid-detail.component.scss',
})
export class SolidDetailComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  /** Slug courant, suivi de façon réactive (cf. constructeur). */
  private readonly slug = signal('');

  /** Principe courant (undefined si slug inconnu → redirection). */
  readonly principle = signal<SolidPrinciple | undefined>(undefined);

  /** Fil d'Ariane : Accueil › Principes SOLID › {nom du principe}. */
  readonly breadcrumb = computed<BreadcrumbItem[]>(() => [
    { label: 'Accueil', link: '/' },
    { label: 'Principes SOLID', link: '/solid' },
    { label: this.principle()?.nomFr ?? '' },
  ]);

  /** Principe précédent / suivant du parcours (undefined aux extrémités). */
  readonly prev = computed<PrincipleLink | undefined>(() => this.neighbor(-1));
  readonly next = computed<PrincipleLink | undefined>(() => this.neighbor(1));

  constructor() {
    this.route.paramMap.pipe(takeUntilDestroyed()).subscribe((params) => {
      const slug = params.get('principe') ?? '';
      const principle = SOLID_PRINCIPLES.find((p) => p.slug === slug);
      if (!principle) {
        this.router.navigate(['/solid']);
        return;
      }
      this.slug.set(slug);
      this.principle.set(principle);
    });
  }

  /** Principe voisin dans PRINCIPLE_SLUGS (delta -1 = précédent, +1 = suivant). */
  private neighbor(delta: number): PrincipleLink | undefined {
    const index = PRINCIPLE_SLUGS.indexOf(this.slug());
    if (index === -1) return undefined;
    const slug = PRINCIPLE_SLUGS[index + delta];
    if (!slug) return undefined;
    const nomFr = SOLID_PRINCIPLES.find((p) => p.slug === slug)?.nomFr ?? '';
    return { slug, nomFr };
  }
}
