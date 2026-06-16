import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { Tool } from '../../../core/models/tool.model';

/**
 * Carte d'affichage d'un outil sur la page d'accueil.
 * Outil disponible → cliquable (navigation vers sa route).
 * Outil indisponible → badge « Bientôt disponible », non cliquable.
 */
@Component({
  selector: 'app-tool-card',
  imports: [RouterLink, MatCardModule, MatIconModule, MatButtonModule],
  templateUrl: './tool-card.component.html',
  styleUrl: './tool-card.component.scss',
})
export class ToolCardComponent {
  @Input({ required: true }) tool!: Tool;
}
