import { ChangeDetectorRef, Component, inject, OnInit, ViewEncapsulation } from '@angular/core';
import { Scene } from '../../core/models/scene';
import { SceneService } from '../../core/services/scene/scene-service';
import { Response } from '../../core/models/response';


//ce composant est utilisé pour les types multi, yes no (réponses figées) et description (question null et réponse figée)
@Component({
  selector: 'app-scene-multi',
  imports: [],
  templateUrl: './scene-multi.html',
  styleUrl: './scene-multi.scss',
  encapsulation: ViewEncapsulation.None,
})
export class SceneMulti implements OnInit {
  selectedResponse: Response | undefined;
  scene: Scene | undefined;

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

      this.cdr.markForCheck();

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
