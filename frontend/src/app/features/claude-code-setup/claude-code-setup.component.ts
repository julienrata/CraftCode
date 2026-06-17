import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { CLAUDE_CODE_TOPICS } from '../../core/data/claude-code-topics';
import { ClaudeCodeTopic } from '../../core/models/claude-code-topic.model';
import {
  BreadcrumbComponent,
  BreadcrumbItem,
} from '../../shared/components/breadcrumb/breadcrumb.component';
import { ConfettiComponent } from '../../shared/components/confetti/confetti.component';

/**
 * Page pédagogique « Mettre en place Claude Code ».
 *
 * Hub des quatre sujets (fichiers markdown, hooks, slash-commands & skills,
 * settings & MCP) : une carte par sujet, cliquable vers sa page de détail
 * (`/claude-code-setup/:sujet`). Le contenu provient de la source unique
 * CLAUDE_CODE_TOPICS.
 */
@Component({
  selector: 'app-claude-code-setup',
  imports: [
    RouterLink,
    BreadcrumbComponent,
    ConfettiComponent,
    MatCardModule,
    MatIconModule,
  ],
  templateUrl: './claude-code-setup.component.html',
  styleUrl: './claude-code-setup.component.scss',
})
export class ClaudeCodeSetupComponent {
  /** Fil d'Ariane : Accueil › Claude Code (page courante). */
  readonly breadcrumb: BreadcrumbItem[] = [
    { label: 'Accueil', link: '/' },
    { label: 'Claude Code' },
  ];

  /** Les quatre sujets de mise en place, dans l'ordre pédagogique. */
  readonly topics: ClaudeCodeTopic[] = CLAUDE_CODE_TOPICS;
}
