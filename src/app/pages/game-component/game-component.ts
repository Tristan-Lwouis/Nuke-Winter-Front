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
import { Router } from '@angular/router';
import { GameStatusEnum } from '../../core/models/enums/gameStatusEnum';

@Component({
  imports: [MenuModal, ResponseMulti, ResponseMatch, ResponseCode],
  templateUrl: './game-component.html',
  styleUrl: './game-component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.Default,
})
export class GameComponent implements OnInit {
  game!: Game | null;
  // Attributs
  //old
  //selectedResponse: Response | undefined;
  //scene: Scene | undefined;
  showResumeModal: boolean = false;
  imageApiUrl = environment.imageApiUrl;
  typeSceneEnum = TypeSceneEnum;

  private router = inject(Router);

  @ViewChild('descriptionContainer') descriptionContainer!: ElementRef;

  // Gestion de l'écriture de la description
  displayedDescription = '';
  speed = 30;
  index = 0;

  isQuestionResponseDisplayed = false;
  isUIDisplayed = true;

  sceneService = inject(SceneService);
  gameService = inject(GameService);
  cdr = inject(ChangeDetectorRef);

  ngOnInit(): void {
    this.gameService.game$.subscribe((game:Game | null)=>{
      console.log("##########GAMECOPONENT#########");
      console.log(game);
      this.game = game;
      this.startScene()
    })
    

    // const newGame = this.gameService.getGame();
    // if (newGame) {
    //   this.startScene(newGame.currentScene);
    //   this.game = newGame;
    // }
  }

  // gestion de l'inetrface
  toggleUI() {
    this.isUIDisplayed = !this.isUIDisplayed;
    console.log(this.gameService.currentGame?.status);
  }

  toggleMenu() {
    this.showResumeModal = true;
  }

  onMenuChoice(choice: 'resume' | 'giveUp' | 'options' | 'saveAndExit' | 'close'): void {
    this.showResumeModal = false;
    switch (choice) {
      case 'giveUp':
        //TODO: implementer la methode giveUp
        // Update game status failed
        this.giveUp()
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
  giveUp() {
    this.game!.status = GameStatusEnum.FAILED;
    console.log(this.gameService.currentGame?.status);
    
    this.gameService.save().subscribe();
  }

  // nous permet de lancer une scene
  startScene() {
    //old: this.scene = scene;
    //this.game!.currentScene = scene;
    this.displayedDescription = '';
    this.isQuestionResponseDisplayed = false;
    this.index = 0;
    this.typeWriter();
  }

  skipDescription() {
    //old: 
    //this.displayedDescription = this.scene!.description;
    this.displayedDescription = this.game!.currentScene!.description;
    this.isQuestionResponseDisplayed = true;
  }

  //compter les points de vie
  healthCount(response: Response){
    if (this.game!.health>0){
      this.game!.health -= response.damage

    }else{
      //redirection vers la page de mort
    }
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
    if(response.nextScene.typeScene == 'RESOLVER'||this.game!.health<=0){
      //passe le gameId dans app-route
      //TODO : utile ?
      if(this.game==null||this.game== undefined){
    this.router.navigate(['/scene-resolver'])
      }else{
        this.router.navigate(['/scene-resolver',this.game.idGame])
      }

    }else{

      //sinon débuter la next scene
      console.log('Fetching scene details for ID:', idScene);
      this.sceneService.read(idScene).subscribe((scene: any) => {
        this.startScene(scene);
      });
    }
  }

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
}
