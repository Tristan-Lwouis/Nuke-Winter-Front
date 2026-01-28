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
import { GameStatusEnum } from '../../core/models/enums/gameStatusEnum';
import { AudioService } from '../../core/services/audio/audio-service';

@Component({
  imports: [MenuModal, ResponseMulti, ResponseMatch, ResponseCode, HealthBar],
  templateUrl: './game-component.html',
  styleUrl: './game-component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.Default,
})
export class GameComponent implements OnInit {
  game!: Game | null;
  // Attributs
  // selectedResponse: Response | undefined;
  // scene: Scene | undefined;
  showResumeModal: boolean = false;
  healthDamage = 0; // a supprimer
  private startTimeout: any;
  imageApiUrl = environment.imageApiUrl;
  audioApiUrl = environment.audioApiUrl;
  typeSceneEnum = TypeSceneEnum;
  private router = inject(Router);
  private audioService = inject(AudioService);

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
        //TODO: implementer la methode options
        // Affichage modale options
        break;
      case 'saveAndExit':
          this.router.navigate(['/game-config']);
        break;
    }
  }

  giveUp() {
    this.game!.status = GameStatusEnum.FAILED;
    // console.log(this.gameService.currentGame?.status);
    this.game!.health = 0;
    this.gameService.save().subscribe();
    this.router.navigate(['/scene-resolver']);
    // this.router.navigate(['/game-config']);
  }

  // nous permet de lancer une scene
  startScene() {
    this.displayedDescription = '';
    this.isQuestionResponseDisplayed = false;
    this.index = 0;
    this.isUIDisplayed = true;

    if(this.game!.currentScene!.audio){
      console.log("INFO : Musuique trouvé sur cette scene")
      this.audioService.stopBackground();
      this.audioService.playBackground(this.audioApiUrl + this.game!.currentScene!.audio);
      // this.audioService.playBackground(this.audioApiUrl + this.game!.currentScene!.music);
    }
    else{
      console.log("INFO : Pas de musique sur cette scene")
    }
    
    this.typeWriter();
    this.cdr.detectChanges();
  }

  skipDescription() {
    this.isUIDisplayed = true;
    this.displayedDescription = this.game!.currentScene!.description;
    this.isQuestionResponseDisplayed = true;
  }

  //compter les points de vie
  healthCount(response: Response) {
    if (this.game!.health > 0) {
      this.game!.health -= response.damage;
      this.healthDamage += response.damage;
    }
    // else {
    //   this.game!.status = GameStatusEnum.FAILED;
    //   this.gameService.save().subscribe();
    // } 
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

    //actualise les points de vie du game
    this.healthCount(response);

    //si la next scene est de type resolver ou si health <=0
    //redirect to la page scène resolver
    if (response.nextScene.typeScene == 'RESOLVER' || this.game!.health <= 0) {
      //passe le gameId dans app-route
      this.router.navigate(['/scene-resolver']);
    } else {
      //sinon débuter la next scene
      console.log('Fetching scene details for ID:', idScene);
      this.sceneService.read(idScene).subscribe((scene: Scene) => {
        this.game!.currentScene = scene;
        this.game!.status = GameStatusEnum.PENDING;
        this.gameService.save().subscribe();
        this.startScene();
      });
    }
  }

  // ============= UI =============
  // pour ecrire la description en mode lettre par lettre
  private typeWriter() {
    if (!this.game?.currentScene) return;
    const description = this.game?.currentScene.description;
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
