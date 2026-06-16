import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

/** Un maillon du fil d'Ariane. Sans `link` → maillon non cliquable. */
export interface BreadcrumbItem {
  label: string;
  link?: string;
}

/**
 * Fil d'Ariane générique. Piloté par `items` : le dernier élément est la page
 * courante (rendu sans lien, avec aria-current="page"). Le séparateur est
 * purement décoratif (aria-hidden).
 */
@Component({
  selector: 'app-breadcrumb',
  imports: [RouterLink],
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.scss',
})
export class BreadcrumbComponent {
  @Input({ required: true }) items: BreadcrumbItem[] = [];
}
