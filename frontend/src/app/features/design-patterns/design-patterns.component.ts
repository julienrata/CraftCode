import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { DESIGN_PATTERNS } from '../../core/data/design-patterns';
import {
  DesignPattern,
  DesignPatternCategory,
} from '../../core/models/design-pattern.model';
import {
  BreadcrumbComponent,
  BreadcrumbItem,
} from '../../shared/components/breadcrumb/breadcrumb.component';

/** Une famille de patrons et ses cartes, pour l'affichage groupé du hub. */
interface PatternGroup {
  categorie: DesignPatternCategory;
  patterns: DesignPattern[];
}

/** Ordre d'affichage des familles (du plus simple au plus avancé). */
const CATEGORY_ORDER: DesignPatternCategory[] = [
  'Créationnel',
  'Structurel',
  'Comportemental',
];

/**
 * Page pédagogique « Design Patterns (Gang of Four) ».
 *
 * Hub des 23 patrons regroupés par famille (créationnels, structurels,
 * comportementaux) : une carte par patron, cliquable vers sa page de détail
 * (`/design-patterns/:pattern`). Le contenu provient de la source unique
 * DESIGN_PATTERNS.
 */
@Component({
  selector: 'app-design-patterns',
  imports: [RouterLink, BreadcrumbComponent, MatCardModule, MatIconModule],
  templateUrl: './design-patterns.component.html',
  styleUrl: './design-patterns.component.scss',
})
export class DesignPatternsComponent {
  /** Fil d'Ariane : Accueil › Design Patterns (page courante). */
  readonly breadcrumb: BreadcrumbItem[] = [
    { label: 'Accueil', link: '/' },
    { label: 'Design Patterns' },
  ];

  /** Les 23 patrons regroupés par famille, dans l'ordre des familles. */
  readonly groups: PatternGroup[] = CATEGORY_ORDER.map((categorie) => ({
    categorie,
    patterns: DESIGN_PATTERNS.filter((p) => p.categorie === categorie),
  }));
}
