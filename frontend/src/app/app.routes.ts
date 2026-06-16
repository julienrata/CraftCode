import { Routes } from '@angular/router';

/**
 * Routes de l'application. Chaque outil est lazy-loadé via son composant
 * standalone. Pour ajouter un outil (ex: SOLID, GoF), il suffit d'ajouter
 * une route pointant vers le composant de sa feature — aucun refactor du cœur.
 */
export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'code-review',
    loadComponent: () =>
      import('./features/code-review/code-review.component').then(
        (m) => m.CodeReviewComponent
      ),
  },
  { path: '**', redirectTo: '' },
];
