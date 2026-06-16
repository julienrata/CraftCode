import { Component, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { CODE_REVIEW_SECTIONS } from '../../core/data/code-review-practices';
import { Section } from '../../core/models/code-review-practice.model';
import {
  BreadcrumbComponent,
  BreadcrumbItem,
} from '../../shared/components/breadcrumb/breadcrumb.component';

/** Table de correspondance slug de phase → `numero` de section. */
const SLUG_TO_NUMERO: Record<string, number> = {
  'pendant-le-developpement': 1,
  'apres-le-developpement': 2,
  'avant-la-relecture': 3,
  'pendant-la-relecture': 4,
  'apres-la-relecture-relecteur': 6,
};

/**
 * Ordre du parcours des phases-support — dérivé de l'unique source de vérité
 * SLUG_TO_NUMERO (ordre d'insertion). Sert au précédent/suivant : aucune
 * seconde liste à maintenir.
 */
const PHASE_SLUGS = Object.keys(SLUG_TO_NUMERO);

/** Une phase voisine pour le parcours séquentiel (précédent/suivant). */
interface PhaseLink {
  slug: string;
  titre: string;
}

/**
 * Page-support d'une phase de revue : lecture (titre + accroche + « pourquoi »)
 * ET case à cocher par pratique, avec progression sauvegardée par phase.
 *
 * La phase est résolue depuis le paramètre de route `:phase`. Un slug inconnu
 * redirige vers l'aperçu `/bonnes-pratiques`. La persistance se fait dans le
 * localStorage, une clé par phase (`craftcode.phase.<slug>.checked`).
 */
@Component({
  selector: 'app-phase-guide',
  imports: [
    RouterLink,
    BreadcrumbComponent,
    MatCheckboxModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatProgressBarModule,
  ],
  templateUrl: './phase-guide.component.html',
  styleUrl: './phase-guide.component.scss',
})
export class PhaseGuideComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  /** Slug de phase courant, suivi de façon réactive (cf. constructeur). */
  private readonly slug = signal('');

  /** Section de la phase courante (undefined si slug inconnu → redirection). */
  readonly section = signal<Section | undefined>(undefined);

  /** Ensemble des ids de pratiques cochées (source de vérité de l'UI). */
  private readonly checkedIds = signal<Set<string>>(new Set());

  /** Nombre total de pratiques de la phase. */
  readonly total = computed(() => this.section()?.pratiques.length ?? 0);

  /** Nombre de pratiques cochées. */
  readonly checkedCount = computed(() => this.checkedIds().size);

  /** Progression en pourcentage (0–100). */
  readonly progress = computed(() => {
    const t = this.total();
    return t === 0 ? 0 : Math.round((this.checkedCount() / t) * 100);
  });

  /** Fil d'Ariane : Accueil › Bonnes pratiques › {titre de la phase}. */
  readonly breadcrumb = computed<BreadcrumbItem[]>(() => [
    { label: 'Accueil', link: '/' },
    { label: 'Bonnes pratiques', link: '/bonnes-pratiques' },
    { label: this.section()?.titre ?? '' },
  ]);

  /** Phase précédente / suivante du parcours (undefined aux extrémités). */
  readonly prev = computed<PhaseLink | undefined>(() => this.neighbor(-1));
  readonly next = computed<PhaseLink | undefined>(() => this.neighbor(1));

  constructor() {
    // Réactif au paramètre `:phase` : couvre le chargement initial ET la
    // navigation précédent/suivant entre routes sœurs (Angular réutilise alors
    // le composant). Comportement préservé : redirection si slug inconnu,
    // clé localStorage par phase, persistance identique.
    this.route.paramMap.pipe(takeUntilDestroyed()).subscribe((params) => {
      const slug = params.get('phase') ?? '';
      const section = this.resolveSection(slug);
      if (!section) {
        this.router.navigate(['/bonnes-pratiques']);
        return;
      }
      this.slug.set(slug);
      this.section.set(section);
      this.checkedIds.set(this.loadChecked(slug));
    });
  }

  isChecked(id: string): boolean {
    return this.checkedIds().has(id);
  }

  /** Coche/décoche une pratique et persiste l'état. */
  toggle(id: string): void {
    const next = new Set(this.checkedIds());
    next.has(id) ? next.delete(id) : next.add(id);
    this.checkedIds.set(next);
    this.persist(this.slug(), next);
  }

  /** Décoche tout (réinitialise la phase). */
  reset(): void {
    const empty = new Set<string>();
    this.checkedIds.set(empty);
    this.persist(this.slug(), empty);
  }

  /** Phase voisine dans PHASE_SLUGS (delta -1 = précédent, +1 = suivant). */
  private neighbor(delta: number): PhaseLink | undefined {
    const index = PHASE_SLUGS.indexOf(this.slug());
    if (index === -1) return undefined;
    const slug = PHASE_SLUGS[index + delta];
    if (!slug) return undefined;
    const numero = SLUG_TO_NUMERO[slug];
    const titre =
      CODE_REVIEW_SECTIONS.find((s) => s.numero === numero)?.titre ?? '';
    return { slug, titre };
  }

  private resolveSection(slug: string): Section | undefined {
    const numero = SLUG_TO_NUMERO[slug];
    if (numero === undefined) return undefined;
    return CODE_REVIEW_SECTIONS.find((s) => s.numero === numero);
  }

  private storageKey(slug: string): string {
    return `craftcode.phase.${slug}.checked`;
  }

  private loadChecked(slug: string): Set<string> {
    try {
      const raw = localStorage.getItem(this.storageKey(slug));
      return raw ? new Set<string>(JSON.parse(raw)) : new Set<string>();
    } catch {
      return new Set<string>();
    }
  }

  private persist(slug: string, ids: Set<string>): void {
    localStorage.setItem(this.storageKey(slug), JSON.stringify(Array.from(ids)));
  }
}
