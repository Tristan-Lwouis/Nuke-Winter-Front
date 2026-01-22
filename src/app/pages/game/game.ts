import { Component, inject, OnInit } from '@angular/core';
import { SceneMulti } from "../scene-multi/scene-multi";
import { GameService } from '../../core/services/game/game-service';
import { Game as GameModel} from '../../core/models/game';
import { SceneDescription } from "../scene-description/scene-description";
import { SceneResolver } from "../scene-resolver/scene-resolver";
import { SceneService } from '../../core/services/scene/scene-service';
import { ScenarioService } from '../../core/services/scenario/scenario-service';
import { AvatarService } from '../../core/services/avatar/avatar-service';
import { AccountService } from '../../core/services/account/account-service';
import { GameStatusEnum } from '../../core/models/enums/gameStatusEnum';

@Component({
  selector: 'app-game',
  imports: [SceneMulti, SceneDescription, SceneResolver],
  templateUrl: './game.html',
  styleUrl: './game.scss',
})
export class Game implements OnInit{
  
  game : GameModel|undefined;
  gameService = inject(GameService);
  accountService = inject(AccountService);
  avatarService = inject(AvatarService);
  scenarioService = inject(ScenarioService);
  sceneService = inject(SceneService);

  // this.account=account; 
  // this.avatar=avatar;  
  // this.scenario=scenario; 
  // this.scene=scene;




 ngOnInit(): void {

    this.game = {
        id: 12,
        account:{idAccount: 13, pseudo: "Account", image: "fqef"},
        avatar:{
          idAvatar: 14, image: "kjdsfkjh",
          name: 'qsqfq'
        },
        scenario:{
          idScenario: 15,
          background: 'qgqg',
          name: 'zrgzqrgz',
          description: 'zrfzfgzgz',
          firstSceneId: {idScene:'24', background:'rgzrtzg',description:'shslhssd',question:null,responses:null,type:{idTypeScene: 23, name:'coucou',rule:'zfrgz'}}
        },
        health : 23,
        currentScene : {idScene:'24', background:'rgzrtzg',description:'shslhssd',question:null,responses:null,type:{idTypeScene: 23, name:'coucou',rule:'zfrgz'}},
        status:"PENDING";
    }
    
      
  };

  

  
}
