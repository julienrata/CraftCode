import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { CodeReviewService } from '../../core/services/code-review.service';
import {
  ChecklistItem,
  ChecklistGroup,
} from '../../core/models/checklist-item.model';
import {
  BreadcrumbComponent,
  BreadcrumbItem,
} from '../../shared/components/breadcrumb/breadcrumb.component';

/** Clé de persistance de l'état coché dans le localStorage. */
const STORAGE_KEY = 'craftcode.code-review.checked';

/**
 * Outil « Checklist Code Review » : items récupérés via l'API, regroupés par
 * catégorie, cochables. L'état coché est conservé en localStorage
 * (aucun backend, aucun compte utilisateur).
 */
@Component({
  selector: 'app-code-review',
  imports: [
    BreadcrumbComponent,
    MatCheckboxModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './code-review.component.html',
  styleUrl: './code-review.component.scss',
})
export class CodeReviewComponent implements OnInit {
  private service = inject(CodeReviewService);

  /** Fil d'Ariane : Accueil › Checklist Code Review (page courante). */
  readonly breadcrumb: BreadcrumbItem[] = [
    { label: 'Accueil', link: '/' },
    { label: 'Checklist Code Review' },
  ];

  readonly loading = signal(true);
  readonly error = signal(false);

  /** Items groupés par catégorie, dans l'ordre renvoyé par l'API. */
  readonly groups = signal<ChecklistGroup[]>([]);

  /** Ensemble des ids d'items cochés (source de vérité de l'UI). */
  private readonly checkedIds = signal<Set<string>>(this.loadChecked());

  /** Nombre total d'items, tous groupes confondus. */
  readonly total = computed(() =>
    this.groups().reduce((sum, g) => sum + g.items.length, 0)
  );

  /** Nombre d'items cochés. */
  readonly checkedCount = computed(() => this.checkedIds().size);

  /** Progression en pourcentage (0–100). */
  readonly progress = computed(() => {
    const t = this.total();
    return t === 0 ? 0 : Math.round((this.checkedCount() / t) * 100);
  });

  ngOnInit(): void {
    this.service.getChecklist().subscribe({
      next: (items) => {
        this.groups.set(this.groupByCategory(items));
        this.loading.set(false);
      },
      error: () => {
        this.error.set(true);
        this.loading.set(false);
      },
    });
  }

  isChecked(id: string): boolean {
    return this.checkedIds().has(id);
  }

  /** Coche/décoche un item et persiste l'état. */
  toggle(id: string): void {
    const next = new Set(this.checkedIds());
    if (next.has(id)) next.delete(id);
    else next.add(id);
    this.checkedIds.set(next);
    this.persist(next);
  }

  /** Décoche tout (réinitialise la checklist). */
  reset(): void {
    const empty = new Set<string>();
    this.checkedIds.set(empty);
    this.persist(empty);
  }

  /** Regroupe les items par catégorie en préservant l'ordre d'arrivée. */
  private groupByCategory(items: ChecklistItem[]): ChecklistGroup[] {
    const map = new Map<string, ChecklistItem[]>();
    for (const item of items) {
      const bucket = map.get(item.category) ?? [];
      bucket.push(item);
      map.set(item.category, bucket);
    }
    return Array.from(map, ([category, groupItems]) => ({
      category,
      items: groupItems,
    }));
  }

  private loadChecked(): Set<string> {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? new Set<string>(JSON.parse(raw)) : new Set<string>();
    } catch {
      return new Set<string>();
    }
  }

  private persist(ids: Set<string>): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(ids)));
  }
}
