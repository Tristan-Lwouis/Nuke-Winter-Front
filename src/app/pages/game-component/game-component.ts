import {
  ChangeDetectorRef,
  Component,
  inject,
  OnInit,
  ViewEncapsulation,
  ViewChild,
  ElementRef,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Scene } from '../../core/models/scene';
import { SceneService } from '../../core/services/scene/scene-service';
import { Response } from '../../core/models/response';
import { MenuModal } from '../../components/menu-modal/menu-modal';
import { ResponseMulti } from '../../components/response-multi/response-multi';
import { ResponseMatch } from '../../components/response-match/response-match';
import { ResponseCode } from '../../components/response-code/response-code';
import { GameService } from '../../core/services/game/game-service';
import { Game } from '../../core/models/game';
import { environment } from '../../../environments/environment';
import { TypeSceneEnum } from '../../core/models/enums/TypeSceneEnum';
import { HealthBar } from '../../components/health-bar/health-bar';
import { Router } from '@angular/router';

@Component({
  imports: [MenuModal, ResponseMulti, ResponseMatch, ResponseCode, HealthBar],
  templateUrl: './game-component.html',
  styleUrl: './game-component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.Default,
})
export class GameComponent implements OnInit {
  game: Game | undefined;
  // Attributs
  healthDamage = 0;
  private startTimeout: any;
  selectedResponse: Response | undefined;
  scene: Scene | undefined;
  showResumeModal: boolean = false;
  imageApiUrl = environment.imageApiUrl;
  typeSceneEnum = TypeSceneEnum;

  @ViewChild('descriptionContainer') descriptionContainer!: ElementRef;

  // Gestion de l'écriture de la description
  displayedDescription = '';
  speed = 20;
  index = 0;

  isQuestionResponseDisplayed = false;
  isUIDisplayed = true;

  sceneService = inject(SceneService);
  gameService = inject(GameService);
  cdr = inject(ChangeDetectorRef);

  ngOnInit(): void {
    const newGame = this.gameService.getGame();
    if (newGame) {
      this.startScene(newGame.currentScene);
      this.game = newGame;
    }
  }

  onMenuChoice(choice: 'resume' | 'giveUp' | 'options' | 'saveAndExit' | 'close'): void {
    this.showResumeModal = false;
    switch (choice) {
      case 'giveUp':
        //TODO: implementer la methode giveUp
        // Update game status failed
        break;
      case 'options':
        //TODO: implementer la methode options
        // Affichage modale options
        break;
      case 'saveAndExit':
        //TODO: implementer la methode saveAndExit
        // Update game (laisser le status en 'pending')
        break;
    }
  }

  //TODO: Methode de giveUp
  giveUp() {}

  // nous permet de lancer une scene
  startScene(scene: Scene) {
    this.scene = scene;
    this.displayedDescription = '';
    this.isQuestionResponseDisplayed = false;
    this.index = 0;
    this.isUIDisplayed = false;

    // Permet d'afficher l'UI au bout de 2 secondes
    if (this.startTimeout) {
      clearTimeout(this.startTimeout);
    }
    this.startTimeout = setTimeout(() => {
      this.isUIDisplayed = true;
      this.typeWriter();
      this.cdr.detectChanges();
    }, 1000);
  }

  skipDescription() {
    if (this.startTimeout) {
      clearTimeout(this.startTimeout);
    }
    this.isUIDisplayed = true;
    this.displayedDescription = this.scene!.description;
    this.isQuestionResponseDisplayed = true;
    this.index = this.scene!.description.length;
  }

  selectResponse(response: Response) {
    console.log('Next Script Info :', response.nextScene);

    let idScene: string;

    if (typeof response.nextScene === 'string') {
      // console.log("response.nextScene est un string")
      idScene = response.nextScene;
    } else {
      // console.log("response.nextScene est un object")
      idScene = response.nextScene.idScene;
    }

    console.log('Fetching scene details for ID:', idScene);
    this.sceneService.read(idScene).subscribe((scene: any) => {
      // Mise a jour de la vie

      this.healthDamage = this.healthDamage + response.damage;
      this.startScene(scene);
    });
  }

  // ============= UI =============
  // pour ecrire la description en mode lettre par lettre
  private typeWriter() {
    if (!this.scene) return;
    const description = this.scene.description;
    console.log('Description :', description);
    // const description = this.scene.description || '';

    if (this.index < description.length) {
      this.displayedDescription += description.charAt(this.index);
      this.index++;

      this.cdr.detectChanges();

      if (this.descriptionContainer) {
        this.descriptionContainer.nativeElement.scrollTop =
          this.descriptionContainer.nativeElement.scrollHeight;
      }

      // si la description est affiché on ne continue pas
      if (!this.isQuestionResponseDisplayed) {
        setTimeout(() => this.typeWriter(), this.speed);
      }
    } else {
      //execute cette methode après avoir écris tous les caracteres pour dire d'affciher la question et les reposnes
      this.onTypingFinished();
    }
  }

  // quand l''écriture de la déscription est terminé on affiche la question et les reponses
  onTypingFinished() {
    this.isQuestionResponseDisplayed = true;
    this.cdr.markForCheck();
  }

  toggleUI() {
    this.isUIDisplayed = !this.isUIDisplayed;
  }

  toggleMenu() {
    this.showResumeModal = true;
  }
}
