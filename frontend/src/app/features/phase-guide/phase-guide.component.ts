import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { CODE_REVIEW_SECTIONS } from '../../core/data/code-review-practices';
import { Section } from '../../core/models/code-review-practice.model';

/** Table de correspondance slug de phase → `numero` de section. */
const SLUG_TO_NUMERO: Record<string, number> = {
  'pendant-le-developpement': 1,
  'apres-le-developpement': 2,
  'avant-la-relecture': 3,
  'pendant-la-relecture': 4,
  'apres-la-relecture-relecteur': 6,
};

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

  /** Slug de phase lu dans l'URL (vide si absent). */
  private readonly slug = this.route.snapshot.paramMap.get('phase') ?? '';

  /** Section de la phase courante (undefined si slug inconnu → redirection). */
  readonly section = signal<Section | undefined>(this.resolveSection());

  /** Ensemble des ids de pratiques cochées (source de vérité de l'UI). */
  private readonly checkedIds = signal<Set<string>>(this.loadChecked());

  /** Nombre total de pratiques de la phase. */
  readonly total = computed(() => this.section()?.pratiques.length ?? 0);

  /** Nombre de pratiques cochées. */
  readonly checkedCount = computed(() => this.checkedIds().size);

  /** Progression en pourcentage (0–100). */
  readonly progress = computed(() => {
    const t = this.total();
    return t === 0 ? 0 : Math.round((this.checkedCount() / t) * 100);
  });

  constructor() {
    if (!this.section()) {
      this.router.navigate(['/bonnes-pratiques']);
    }
  }

  isChecked(id: string): boolean {
    return this.checkedIds().has(id);
  }

  /** Coche/décoche une pratique et persiste l'état. */
  toggle(id: string): void {
    const next = new Set(this.checkedIds());
    next.has(id) ? next.delete(id) : next.add(id);
    this.checkedIds.set(next);
    this.persist(next);
  }

  /** Décoche tout (réinitialise la phase). */
  reset(): void {
    const empty = new Set<string>();
    this.checkedIds.set(empty);
    this.persist(empty);
  }

  private resolveSection(): Section | undefined {
    const numero = SLUG_TO_NUMERO[this.slug];
    if (numero === undefined) return undefined;
    return CODE_REVIEW_SECTIONS.find((s) => s.numero === numero);
  }

  private storageKey(): string {
    return `craftcode.phase.${this.slug}.checked`;
  }

  private loadChecked(): Set<string> {
    try {
      const raw = localStorage.getItem(this.storageKey());
      return raw ? new Set<string>(JSON.parse(raw)) : new Set<string>();
    } catch {
      return new Set<string>();
    }
  }

  private persist(ids: Set<string>): void {
    localStorage.setItem(this.storageKey(), JSON.stringify(Array.from(ids)));
  }
}
