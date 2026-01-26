import { Injectable, inject } from '@angular/core';
import { ApiService } from '../api/api-service';
import { Account } from '../../models/account';
import { Scenario } from '../../models/scenario';
import { Avatar } from '../../models/avatar';
import { Scene } from '../../models/scene';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { SceneService } from '../scene/scene-service';
import { Game } from '../../models/game';

const RESOURCE = 'game';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private apiService = inject(ApiService);
  private sceneservice = inject(SceneService);
  private router = inject(Router);

  private game : Game | undefined;
  //private _game$ = new BehaviorSubject<Game| undefined>(undefined);

  //initialisation ici pour tester les points de vie
  // createGameTest(): Game {
  //   return {
  //     id: 1,
  //     account: { id: 2, pseudo: 'pseudoTest', image: 'urlimage' },
  //     health: 0,
  //     nbTry: 0,
  //     nbSucces: 0,
  //   };
  // }

  /**
   * Création d'un Json de type Game et envoi au backend
   * @param numberIdAvatar 
   * @param numberIdScenario 
   * @param pseudo 
   * @returns 
   */
  readGame(avatar: Avatar, scenario: Scenario, account: Account): Game | any {

    // (DTO)
    const JsonGame: any = {
      avatar: avatar,
      scenario: scenario,
      account: account,
    };

    return this.apiService.post(RESOURCE+"/read", JsonGame);
  }

  startGame(game:Game){
    this.game = game;
    this.router.navigate(["/game-component"]);
  }


  setGame(game:Game){
    this.game =game;
  }
  
  public getGame() : Game | undefined {
    return this.game;
  }
  

  // getGame(): Observable<Game | undefined>{
  //   ///return this._game$;
  // }
}
