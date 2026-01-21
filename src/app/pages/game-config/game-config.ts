import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
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
  cdr = inject(ChangeDetectorRef);

  currentAvatarIndex = 0;

  avatars: Avatar[] = [{ id: 2, name: 'KURT', image: '/assets/images/avatar-kurt.webp' }];
  scenarios: Scenario[] = [];

  // Au chargement du composant je récupère les listes d'avatars et de scénarios
  ngOnInit(): void {
    // ==== Récupère la liste des avatars ====
    this.avatarService.getAllAvatars().subscribe({
      next: (data: Avatar[]) => {
        console.log('Avatars récupérés :', data);
        this.avatars = data;
        this.cdr.detectChanges(); // Force le rechargement de la vue
      },
    });
    // ==== Récupère la liste des scénarios ====
    this.scenarioService.getAllScenarios().subscribe({
      next: (data: Scenario[]) => {
        console.log('Scénarios récupérés :', data);
        this.scenarios = data;
        this.cdr.detectChanges(); // Force le rechargement de la vue
      },
    });
  }

  // ==== AVATAR ====
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

  selectedScenario: Scenario | undefined;

  // ==== SCENARIO ====
  /**
   * Cette méthode permet de faire un toggle sur le scenario selectionné coté vue
   * Elle permet de déterminer quel scenario est selectionné pour pouvoir afficher sa description et son image
   */
  scenarioSelect(scenario: Scenario) {
    if (this.selectedScenario === scenario) {
      this.selectedScenario = undefined;
    } else {
      this.selectedScenario = scenario;
    }
  }

  // ==== START SCENARIO ====
  /**
   * Cette méthode permet de récupérer l'id du scenario selectionné au moment de l'appui sur le bouton START
   * Elle permet de rediriger vers la page premier scene de jeu avec l'id du scenario selectionné
   */
  // startScenario() {
  //   let idSceneStart = this.selectedScenario?.id
  //   this.gameService.showScene(idSceneStart)
  // }
}
