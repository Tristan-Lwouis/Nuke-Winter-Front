import { ChangeDetectorRef, Component, inject, Input, OnInit } from '@angular/core';
import { NukeButton } from '../../components/nuke-button/nuke-button';
import { Game } from '../../core/models/game';
import { GameService } from '../../core/services/game/game-service';
import { Scene } from '../../core/models/scene';
import { SceneService } from '../../core/services/scene/scene-service';

@Component({
  selector: 'app-scene-resolver',
  imports: [NukeButton],
  templateUrl: './scene-resolver.html',
  styleUrl: './scene-resolver.scss',
})
export class SceneResolver implements OnInit {
  selectedResponse: Response | undefined;
  @Input() game: Game | undefined;

  // Gestion de l'écriture de la description
  displayedDescription = '';
  speed = 30;
  index = 0;

  isQuestionResponseDisplayed = false;

  sceneService = inject(SceneService);
  cdr = inject(ChangeDetectorRef);

  ngOnInit(): void {
    //TODO: reflechir à la maniere dont on récupère la premiere scene
    this.sceneService.read(this.game!.currentScene.idScene).subscribe({
      next: (scene: Scene) => {
        if (scene) {
          this.startScene(scene);
        }
      },
      error: (err) => console.error(err),
    });
  }

  // nous permet de lancer une scene
  startScene(scene: Scene) {
    this.game!.currentScene = scene;
    this.displayedDescription = ''; 
    this.isQuestionResponseDisplayed = false;
    this.index = 0;
    this.typeWriter();
  }

  skipDescription() {
    this.displayedDescription = this.game!.currentScene.description;
    this.isQuestionResponseDisplayed = true;
  }

  // pour ecrire la description en mode lettre par lettre
  private typeWriter() {
    if (!this.game!.currentScene) return;

    const description = this.game!.currentScene.description;

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
