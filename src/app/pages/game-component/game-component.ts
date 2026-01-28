import {
  ChangeDetectorRef,
  Component,
  inject,
  OnInit,
  ViewEncapsulation,
  ViewChild,
  ElementRef,
  ChangeDetectionStrategy,
  OnChanges,
} from '@angular/core';
import { SceneService } from '../../core/services/scene/scene-service';
import { Response } from '../../core/models/response';
import { MenuModal } from '../../components/menu-modal/menu-modal';
import { SettingsModal } from '../../components/settings-modal/settings-modal';
import { ResponseMulti } from '../../components/response-multi/response-multi';
import { ResponseMatch } from '../../components/response-match/response-match';
import { ResponseCode } from '../../components/response-code/response-code';
import { GameService } from '../../core/services/game/game-service';
import { Game } from '../../core/models/game';
import { environment } from '../../../environments/environment';
import { TypeSceneEnum } from '../../core/models/enums/TypeSceneEnum';
import { HealthBar } from '../../components/health-bar/health-bar';
import { Router } from '@angular/router';
import { GameStatusEnum } from '../../core/models/enums/gameStatusEnum';
import { AudioService } from '../../core/services/audio/audio-service';

@Component({
  imports: [MenuModal, SettingsModal, ResponseMulti, ResponseMatch, ResponseCode, HealthBar],
  templateUrl: './game-component.html',
  styleUrl: './game-component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.Default,
})
export class GameComponent implements OnInit {
  // === Attributs
  game!: Game | null;
  showResumeModal: boolean = false;
  showSettingsModal: boolean = false;
  healthDamage = 0; // a supprimer
  private startTimeout: any;
  imageApiUrl = environment.imageApiUrl;
  audioApiUrl = environment.audioApiUrl;
  typeSceneEnum = TypeSceneEnum;
  GameStatusEnum = GameStatusEnum;
  private router = inject(Router);
  private audioService = inject(AudioService);

  @ViewChild('descriptionContainer') descriptionContainer!: ElementRef;

  // tODO: A objecté
  displayedDescription = '';
  speed = 20;
  index = 0;

  isQuestionResponseDisplayed = false;
  isUIDisplayed = true;

  sceneService = inject(SceneService);
  gameService = inject(GameService);
  cdr = inject(ChangeDetectorRef);

  ngOnInit(): void {
    this.gameService.game$.subscribe((game: Game | null) => {
      this.game = game;
      this.startScene();
    });
  }

  onMenuChoice(choice: 'resume' | 'giveUp' | 'options' | 'saveAndExit' | 'close'): void {
    this.showResumeModal = false;
    switch (choice) {
      case 'giveUp':
        this.giveUp();
        break;
      case 'options':
        this.showSettingsModal = true;
        break;
      case 'saveAndExit':
        this.router.navigate(['/game-config']);
        break;
    }
  }

  onSettingsClose(): void {
    this.showSettingsModal = false;
    this.showResumeModal = true;
  }

  giveUp() {
    this.gameService.giveUp().subscribe(() => {
      this.router.navigate(['/scene-resolver']);
    });
  }

  // nous permet de lancer une scene
  startScene() {
    this.displayedDescription = '';
    this.isQuestionResponseDisplayed = false;
    this.index = 0;
    this.isUIDisplayed = true;

    if (this.game!.currentScene!.audio) {
      this.audioService.playBackground(this.audioApiUrl + this.game!.currentScene!.audio);
    }

    this.typeWriter();
    this.cdr.detectChanges();

    if (this.game!.status == GameStatusEnum.FAILED || this.game!.status == GameStatusEnum.SUCCEED || this.game!.currentScene?.typeScene == TypeSceneEnum.RESOLVER) {
        
        this.router.navigate(['/scene-resolver']);
      }
  }

  skipDescription() {
    this.displayedDescription = '';
    this.isUIDisplayed = true;
    this.displayedDescription = this.game!.currentScene!.description;
    this.isQuestionResponseDisplayed = true;
  }

  selectResponse(response: Response) {
    this.gameService.calculResponse(response).subscribe((game: Game) => {      
      
      // console.log("##RESOLVER");
      // console.log(game.status);
       this.startScene();
    });
  }

  // ============= UI =============
  // pour ecrire la description en mode lettre par lettre
  private typeWriter() {
    if (!this.game?.currentScene) return;
    const description = this.game?.currentScene.description;
    //console.log('Description :', description);
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
      } else {
        //execute cette methode après avoir écris tous les caracteres pour dire d'affciher la question et les reposnes
        this.onTypingFinished();
      }
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
