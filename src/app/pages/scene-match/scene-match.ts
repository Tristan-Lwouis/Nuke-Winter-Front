import { ChangeDetectorRef, Component, inject, OnInit, ViewEncapsulation } from '@angular/core';
import { Scene } from '../../core/models/scene';
import { SceneService } from '../../core/services/scene/scene-service';
import { Response } from '../../core/models/response';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NukeButton } from "../../components/nuke-button/nuke-button";

@Component({
  selector: 'app-scene-match',
  imports: [NukeButton, ReactiveFormsModule],
  templateUrl: './scene-match.html',
  styleUrl: './scene-match.scss',
})
export class SceneMatch implements OnInit {

  // pour lier et avoir la main sur les input de la vue coté logique
    matchForm = new FormGroup({
    response: new FormControl('', { nonNullable: true, validators: [Validators.required] }), // TODO: ajouter un validator pour autoriser que des caractere normaux
  })
  
  //Attributs du composant
  //@Input scene: Scene | undefined;
  scene: Scene | undefined;

  // Gestion de l'écriture de la description
  displayedDescription = '';
  speed = 30;
  index = 0;

  isQuestionResponseDisplayed = false;

  sceneService = inject(SceneService);
  cdr = inject(ChangeDetectorRef);
response: any;

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

      submitForm(){
        let formResponse:string|undefined ;
        const trueResponse:string = this.scene!.responses[0].name;
        formResponse = this.matchForm.value.response;
        
        if(formResponse === trueResponse){
          this.startScene(this.scene!.responses[0].nextScene);
        }else{
          //TODO : Prendre des dégats
          this.startScene(this.scene!);
        }
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
      //execute cette methode après avoir écris tous les caracteres pour dire d'affciher la question et les reponses
      this.onTypingFinished();
    }
  }

  // quand l''écriture de la déscription est terminé on affiche la question et les reponses
  onTypingFinished() {
    this.isQuestionResponseDisplayed = true;
    this.cdr.markForCheck();
  }
}