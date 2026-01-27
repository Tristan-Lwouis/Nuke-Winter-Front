import { Injectable, inject } from '@angular/core';
import { ApiService } from '../api/api-service';
import { Account } from '../../models/account';
import { Scenario } from '../../models/scenario';
import { Avatar } from '../../models/avatar';
import { Scene } from '../../models/scene';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject, tap } from 'rxjs';
import { SceneService } from '../scene/scene-service';
import { Game } from '../../models/game';
import { LogIn } from '../../../pages/log-in/log-in';

const RESOURCE = 'game';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private apiService = inject(ApiService);
  private sceneservice = inject(SceneService);
  private router = inject(Router);


  private gameSubject = new BehaviorSubject<Game | null>(null)
  game$ = this.gameSubject.asObservable();

  get currentGame() : Game | null {
    return this.gameSubject.value;
  }

  updateGame(game:Game){
    console.log("GAMESERVICE-UPDATE#####");
    console.log(game);
    this.gameSubject.next(game);
  }

  startGame(){
    this.router.navigate(["/game-component"]);
  }

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

  // route pour récupérr un game ou en créer une si elle n'existe pas
  readOrSave(avatar: Avatar, scenario: Scenario, account: Account): Game | any {
    // (DTO)
    const jsonGame: any = {
      avatar: avatar,
      scenario: scenario,
      account: account,
    };

    return this.apiService.post(RESOURCE + '/read-or-save', jsonGame).pipe(
      tap((game: Game) => {
        this.updateGame(game);
      }),
    );
  }

  // route pour sauvegarder un game
  save(): Game | any {
    
    const game =  {
        "account": {
            "idAccount": this.currentGame?.account.idAccount
        },
        "avatar": {
            "idAvatar":  this.currentGame?.avatar.idAvatar
        },
        "currentScene": {
            "idScene":  this.currentGame?.currentScene?.idScene
            },
        "health": this.currentGame?.health,
        "idGame": this.currentGame?.idGame,
        "scenario": {"idScenario": this.currentGame?.scenario.idScenario},
        "status": this.currentGame?.status
      }

      
      console.log("###SAVE-EN-COURS###");
      console.log(game.idGame);
      
    return this.apiService.post(RESOURCE + '/save', 
      game
    );
  }
  startGame(game:Game){
    this.game = game;
    this.router.navigate(["/game-component"]);
  }

  getGameByid(idGame:number):Game| any{
    return this.apiService.get(RESOURCE+"/read/"+idGame);
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
