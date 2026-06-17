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
  {
    path: 'bonnes-pratiques',
    loadComponent: () =>
      import('./features/best-practices/best-practices.component').then(
        (m) => m.BestPracticesComponent
      ),
  },
  {
    path: 'bonnes-pratiques/:phase',
    loadComponent: () =>
      import('./features/phase-guide/phase-guide.component').then(
        (m) => m.PhaseGuideComponent
      ),
  },
  {
    path: 'solid',
    loadComponent: () =>
      import('./features/solid/solid.component').then((m) => m.SolidComponent),
  },
  {
    path: 'solid/:principe',
    loadComponent: () =>
      import('./features/solid-detail/solid-detail.component').then(
        (m) => m.SolidDetailComponent
      ),
  },
  {
    path: 'design-patterns',
    loadComponent: () =>
      import('./features/design-patterns/design-patterns.component').then(
        (m) => m.DesignPatternsComponent
      ),
  },
  {
    path: 'design-patterns/:pattern',
    loadComponent: () =>
      import('./features/design-pattern-detail/design-pattern-detail.component').then(
        (m) => m.DesignPatternDetailComponent
      ),
  },
  {
    path: 'claude-code-setup',
    loadComponent: () =>
      import('./features/claude-code-setup/claude-code-setup.component').then(
        (m) => m.ClaudeCodeSetupComponent
      ),
  },
  {
    path: 'claude-code-setup/:sujet',
    loadComponent: () =>
      import('./features/claude-code-setup-detail/claude-code-setup-detail.component').then(
        (m) => m.ClaudeCodeSetupDetailComponent
      ),
  },
  { path: '**', redirectTo: '' },
];
