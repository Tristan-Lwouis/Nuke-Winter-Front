import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import { Scene } from '../../core/models/scene';
import { Response } from '../../core/models/response';
import { NukeButton } from "../nuke-button/nuke-button";

@Component({
  selector: 'app-response-match',
  imports: [NukeButton, ReactiveFormsModule],
  templateUrl: './response-match.html',
  styleUrl: './response-match.scss',
})
export class ResponseMatch {

  matchForm = new FormGroup({
    response: new FormControl('',{nonNullable:true, validators:[Validators.required]})
  });


  @Input() scene: Scene | undefined;

  @Output() selectedResponse = new EventEmitter<Response>();


  submitForm(){
        //Réponse émise par le formulaire
        let formResponse:string|undefined;
        formResponse = this.matchForm.value.response;

        //Bonne réponse à la scène
        const trueResponse:string = this.scene!.responses[0].name;
        
        //Réponse amenant à une scène : la bonne ou toute autre réponse qui devient "Wrong"
        let transferedResponse:String;

        if(formResponse?.toLowerCase() === trueResponse.toLowerCase()){
          transferedResponse = trueResponse;
        }else{
          transferedResponse = "*";
        }
        
      
        for(let responseChoice of this.scene!.responses){
          if(transferedResponse == responseChoice.name){
            this.selectedResponse.emit(responseChoice);
          }
        }

        
    }


  }

 