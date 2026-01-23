import {
  ChangeDetectorRef,
  Component,
  inject,
  OnInit,
  ViewEncapsulation,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { Scene } from '../../core/models/scene';
import { SceneService } from '../../core/services/scene/scene-service';
import { Response } from '../../core/models/response';
import { MenuModal } from "../../components/menu-modal/menu-modal";
import { ResponseMulti } from "../../components/response-multi/response-multi";


@Component({
  imports: [MenuModal, ResponseMulti],
  templateUrl: './game-component.html',
  styleUrl: './game-component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class GameComponent implements OnInit {
  
  // Attributs
  selectedResponse: Response | undefined;
  scene: Scene | undefined;
  showResumeModal: boolean = false;

  @ViewChild('descriptionContainer') descriptionContainer!: ElementRef;

  // Gestion de l'écriture de la description
  displayedDescription = '';
  speed = 30;
  index = 0;

  isQuestionResponseDisplayed = false;
  isUIDisplayed = true;

  sceneService = inject(SceneService);
  cdr = inject(ChangeDetectorRef);

  ngOnInit(): void {
    //TODO: reflechir à la maniere dont on récupère la premiere scene
    this.sceneService.read('s1s1').subscribe({
      next: (scene: Scene) => {
        if (scene) {
          this.startScene(scene);
        }
      },
      error: (err) => console.error(err),
    });
  }

  toggleUI() {
    this.isUIDisplayed = !this.isUIDisplayed;
  }

  toggleMenu() {
    this.showResumeModal = true;
  }

  onMenuChoice(choice : 'resume' | 'giveUp' | 'options' | 'saveAndExit' | 'close'):void {
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
    this.typeWriter();
  }

  skipDescription() {
    this.displayedDescription = this.scene!.description;
    this.isQuestionResponseDisplayed = true;
  }

  selectResponse(response: Response) {
    this.startScene(response.nextScene);
  }

  // pour ecrire la description en mode lettre par lettre
  private typeWriter() {
    if (!this.scene) return;

    const description = this.scene.description;

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
