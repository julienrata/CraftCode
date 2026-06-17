import { Component, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { CLAUDE_CODE_TOPICS } from '../../core/data/claude-code-topics';
import { ClaudeCodeTopic } from '../../core/models/claude-code-topic.model';
import {
  BreadcrumbComponent,
  BreadcrumbItem,
} from '../../shared/components/breadcrumb/breadcrumb.component';

/** Ordre du parcours — dérivé de l'unique source CLAUDE_CODE_TOPICS. */
const TOPIC_SLUGS = CLAUDE_CODE_TOPICS.map((t) => t.slug);

/** Un sujet voisin pour le parcours séquentiel (précédent/suivant). */
interface TopicLink {
  slug: string;
  titre: string;
}

/**
 * Page de détail d'un sujet de mise en place de Claude Code : définition,
 * pourquoi, exemples commentés, et comment le mettre en place.
 *
 * Le sujet est résolu depuis le paramètre de route `:sujet`. Un slug inconnu
 * redirige vers le hub `/claude-code-setup`. Le suivi réactif du paramètre
 * couvre la navigation précédent/suivant entre routes sœurs (Angular réutilise
 * alors le composant) — même pattern que la page de détail SOLID.
 */
@Component({
  selector: 'app-claude-code-setup-detail',
  imports: [RouterLink, BreadcrumbComponent, MatCardModule, MatIconModule],
  templateUrl: './claude-code-setup-detail.component.html',
  styleUrl: './claude-code-setup-detail.component.scss',
})
export class ClaudeCodeSetupDetailComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  /** Slug courant, suivi de façon réactive (cf. constructeur). */
  private readonly slug = signal('');

  /** Sujet courant (undefined si slug inconnu → redirection). */
  readonly topic = signal<ClaudeCodeTopic | undefined>(undefined);

  /** Fil d'Ariane : Accueil › Claude Code › {titre du sujet}. */
  readonly breadcrumb = computed<BreadcrumbItem[]>(() => [
    { label: 'Accueil', link: '/' },
    { label: 'Claude Code', link: '/claude-code-setup' },
    { label: this.topic()?.titre ?? '' },
  ]);

  /** Sujet précédent / suivant du parcours (undefined aux extrémités). */
  readonly prev = computed<TopicLink | undefined>(() => this.neighbor(-1));
  readonly next = computed<TopicLink | undefined>(() => this.neighbor(1));

  constructor() {
    this.route.paramMap.pipe(takeUntilDestroyed()).subscribe((params) => {
      const slug = params.get('sujet') ?? '';
      const topic = CLAUDE_CODE_TOPICS.find((t) => t.slug === slug);
      if (!topic) {
        this.router.navigate(['/claude-code-setup']);
        return;
      }
      this.slug.set(slug);
      this.topic.set(topic);
    });
  }

  /** Sujet voisin dans TOPIC_SLUGS (delta -1 = précédent, +1 = suivant). */
  private neighbor(delta: number): TopicLink | undefined {
    const index = TOPIC_SLUGS.indexOf(this.slug());
    if (index === -1) return undefined;
    const slug = TOPIC_SLUGS[index + delta];
    if (!slug) return undefined;
    const titre = CLAUDE_CODE_TOPICS.find((t) => t.slug === slug)?.titre ?? '';
    return { slug, titre };
  }
}
