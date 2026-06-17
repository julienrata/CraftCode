import { Component, OnInit, inject, signal } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { ToolService } from '../../core/services/tool.service';
import { Tool } from '../../core/models/tool.model';
import { ToolCardComponent } from '../../shared/components/tool-card/tool-card.component';
import { ConfettiComponent } from '../../shared/components/confetti/confetti.component';

/** Page d'accueil : liste les outils du site récupérés via GET /api/tools. */
@Component({
  selector: 'app-home',
  imports: [MatProgressSpinnerModule, ToolCardComponent, ConfettiComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  private toolService = inject(ToolService);

  readonly tools = signal<Tool[]>([]);
  readonly loading = signal(true);
  readonly error = signal(false);

  ngOnInit(): void {
    this.toolService.getTools().subscribe({
      next: (tools) => {
        this.tools.set(tools);
        this.loading.set(false);
      },
      error: () => {
        this.error.set(true);
        this.loading.set(false);
      },
    });
  }
}
