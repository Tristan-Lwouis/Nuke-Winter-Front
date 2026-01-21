import { Component, inject, OnInit } from '@angular/core';
import { SnowEffect } from '../../components/snow-effect/snow-effect';
import { ParallaxDirective } from '../../shared/directives/parallax.directive';
import { NukeButton } from '../../components/nuke-button/nuke-button';
import { Avatar } from '../../core/models/avatar';
import { AvatarService } from '../../core/services/avatar/avatar-service';
import { ScenarioService } from '../../core/services/scenario/scenario-service';
import { Scenario } from '../../core/models/scenario';

@Component({
  selector: 'app-game-config',
  imports: [SnowEffect, ParallaxDirective, NukeButton],
  templateUrl: './game-config.html',
  styleUrl: './game-config.scss',
})
export class GameConfig implements OnInit {
  avatarService = inject(AvatarService);
  scenarioService = inject(ScenarioService);

  currentAvatarIndex = 0;

  avatars: Avatar[] = [{ id: 2, name: 'KURT', image: '/assets/images/avatar-kurt.webp' },];
  scenarios: Scenario[] = [];

  // Au chargement du composant je récupère les listes d'avatars et de scénarios
  ngOnInit(): void {
    // ==== Récupère la liste des avatars ====
    this.avatarService.getAllAvatars().subscribe({
      next: (data: Avatar[]) => {
        console.log('Avatars récupérés :', data);
        this.avatars = data;
      },
    });
    // ==== Récupère la liste des scénarios ====
    this.scenarioService.getAllScenarios().subscribe({
      next: (data: Scenario[]) => {
        console.log('Scénarios récupérés :', data);
        this.scenarios = data;
      },
    });
  }

  // avatars: Avatar[] = [
  //   { id: 1, name: 'SARAH', image: '/assets/images/avatar-sarah.png' },
  //   { id: 2, name: 'KURT', image: '/assets/images/avatar-kurt.png' },
  //   { id: 3, name: 'PEDRO', image: '/assets/images/avatar-pedro.png' },
  // ];

  get currentAvatar(): Avatar | undefined {
    return this.avatars[this.currentAvatarIndex];
  }

  /**
   * @param direction Permet de faire defiler tous les avatrs
   *    1 Avance dans le tableau
   *   -1 recule dans le tableau
   */
  nextAvatar(direction: number) {
    const len = this.avatars.length;

    // Si liste recu est vide.
    if (len === 0) {
      console.warn('La liste des avatars est vide.');
      return;
    }
    const step = direction > 0 ? 1 : direction < 0 ? -1 : 0;
    this.currentAvatarIndex = (this.currentAvatarIndex + step + len) % len;
  }
}
