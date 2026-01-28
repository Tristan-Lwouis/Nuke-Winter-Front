// Angular
import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { StorageService } from '../../core/services/storage/storage-service';
// Components & Directives
import { SnowEffect } from '../../components/snow-effect/snow-effect';
import { ParallaxDirective } from '../../shared/directives/parallax.directive';
import { NukeButton } from '../../components/nuke-button/nuke-button';
import { ResumeModal } from '../../components/resume-modal/resume-modal';

import { Account } from '../../core/models/account';

import { Avatar } from '../../core/models/avatar';
import { AvatarService } from '../../core/services/avatar/avatar-service';

import { ScenarioService } from '../../core/services/scenario/scenario-service';
import { Scenario } from '../../core/models/scenario';

import { Game } from '../../core/models/game';
import { GameService } from '../../core/services/game/game-service';
import { AudioService } from '../../core/services/audio/audio-service';
import { environment } from '../../../environments/environment';


@Component({
  selector: 'app-game-config',
  imports: [SnowEffect, ParallaxDirective, NukeButton, ResumeModal],
  templateUrl: './game-config.html',
  styleUrl: './game-config.scss',
})
export class GameConfig implements OnInit {
  avatarService = inject(AvatarService);
  scenarioService = inject(ScenarioService);
  gameService = inject(GameService);
  cdr = inject(ChangeDetectorRef);
  storageService = inject(StorageService);

  imageApiUrl = environment.imageApiUrl;

  // Variables
  currentAvatarIndex = 0;
  showResumeModal: boolean = false;
  //currentGame: Game | undefined;
  avatars: Avatar[] = [{ idAvatar: 0, name: 'KURT', image: '/assets/images/avatar-kurt.webp'}];
  scenarios: Scenario[] = [];

  connectedAccount: Account | undefined;
  private audioService = inject(AudioService);

  // Au chargement du composant je récupère les listes d'avatars et de scénarios
  ngOnInit(): void {
    // Lancer la musique de fond
    this.audioService.playBackground(this.audioService.mainMusicPath);

    const account = this.storageService.read('account');
    if (account) {
      this.connectedAccount = JSON.parse(account);
    }
    // ==== Récupère la liste des avatars ====
    this.avatarService.getAllAvatars().subscribe({
      next: (data: Avatar[]) => {
        this.avatarService.addPathToImages(data);
        console.log('Avatars récupérés :', data);
        this.avatars = data;
        this.cdr.detectChanges(); // Force le rechargement de la vue
      },
    });
    // ==== Récupère la liste des scénarios ====
    this.scenarioService.getAllScenarios().subscribe({
      next: (data: Scenario[]) => {
        this.scenarioService.addPathToImages(data);
        console.log('Scénarios récupérés :', data);
        this.scenarios = data;
        this.cdr.detectChanges(); // Force le rechargement de la vue
      },
    });
  }

  // ==== AVATAR ====
  get currentAvatar(): Avatar {
    return this.avatars[this.currentAvatarIndex];
  }

  /**
   * @param direction Permet de faire defiler tous les avatrs
   *    1 Avance dans le tableau
   *   -1 recule dans le tableau
   */
  nextAvatar(direction: number) {
    const len = this.avatars.length;
    this.audioService.play(this.audioService.clickSoundPath);

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
    this.audioService.play(this.audioService.clickSoundPath);
    if (this.selectedScenario === scenario) {
      this.selectedScenario = undefined;
    } else {
      this.selectedScenario = scenario;
      // console.log('Scénario sélectionné :', this.selectedScenario);
      // console.log('Id du scénario sélectionné :', this.selectedScenario.idScenario);
    }
  }

  resumeOrRestartGame(): void {
    this.showResumeModal = true;
  }

  onResumeChoice(choice: 'continue' | 'restart' | 'close'): void {
    switch (choice) {
      case 'continue':
        // Redirige vers la scene courante
        this.gameService.startGame();
        break;
      case 'restart':
       // Redirige ver la scene courante d'une nouvelle partie
        this.gameService.giveUp(true).subscribe();
        break;
      case 'close':
        this.showResumeModal = false;
        break;
    }
  }

  // ==== START SCENARIO ====
  /**
   * Cette méthode permet de récupérer l'id du scenario selectionné au moment de l'appui sur le bouton START
   * Elle permet de rediriger vers la page premier scene de jeu avec l'id du scenario selectionné
   */
  startScenario() {
    // Récuperation du scenario selectionné
    let selectedScenario: Scenario = this.selectedScenario!;

    // Récuperation de l'avatar selectionné
    let selectedAvatar = this.currentAvatar!;

    // Récuperation de l'account courant
    const accountJson = this.storageService.read('account');
    const connectedAccount: Account = accountJson ? JSON.parse(accountJson) : null;

    // Appel de la méthode de création de partie dans le game service
    console.log('TRY STARTING GAME', selectedScenario);

    this.gameService.readOrSave(selectedAvatar!, selectedScenario!, connectedAccount).subscribe({
      next: (response: Game) => {
        this.gameService.updateGame(response);
        // console.log("🔥response.status = " + response.status)
        // console.log('#######CONFIG-ROS########');

        if (response.status.toString() == 'NEW') {
          // console.log('Nouvelle partie, redirection vers la première scène du scénario.', response);
          // console.log('FirstSceneId : ' + response.scenario.firstScene.idScene);
          this.gameService.startGame();
        } else {

          this.resumeOrRestartGame();
          this.cdr.detectChanges();
        }
      },
    });

    // TODO : Creation d'un objet game
    // - avec l'avatar selectionné ✅
    // - avec le scenario selectionné ✅
    // - avec l'id de l'account courant ✅
    //     - Le back crée la game ou la récupere si elle existe déja ✅
    //     - Le back me renvoi cet objet game ✅
    // - Verifier si la game est nouvelle grace a son status (NEW ou PENDING)✅
    //     - Si nouvelle game, aller a la premiere scene du scenario ⛔
    //     - Si la game est en cours, afficher une modale pour demander si on veut reprendre la partie ou recommencer✅
    //        - Si reprise de la partie
    //            - Aller a la scene courante de l'objet game reçu
    //     - Sinon aller a la premiere scene du scenario
    // Aller chercher un Monster white a Intermarché 🦖
  }
}
