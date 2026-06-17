import { Component, Input } from '@angular/core';

/** Adapte la palette des confettis au fond du bandeau qui les accueille. */
export type ConfettiTone = 'light' | 'dark';

/**
 * Calque décoratif de confettis (SVG inline tokenisé), à poser dans un bandeau
 * héros (`position: relative; z-index: 0; overflow: hidden`). Purement
 * décoratif (`aria-hidden`), positionné en absolu derrière le contenu.
 *
 * `tone` adapte la palette au fond :
 * - `light` (défaut) : multicolore de marque, sur fond clair (accueil) ;
 * - `dark` : confettis clairs et translucides, sur le dégradé festif des hubs.
 *
 * Les pièces apparaissent en cascade (keyframe globale `cc-pop`, décalage
 * `--cc-stagger`) — neutralisée par `prefers-reduced-motion`.
 */
@Component({
  selector: 'app-confetti',
  templateUrl: './confetti.component.html',
  styleUrl: './confetti.component.scss',
  host: {
    class: 'confetti',
    '[class.confetti--dark]': "tone === 'dark'",
    'aria-hidden': 'true',
  },
})
export class ConfettiComponent {
  @Input() tone: ConfettiTone = 'light';
}
