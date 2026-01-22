import { Injectable, inject } from '@angular/core';
import { ApiService } from '../api/api-service';
import { Game } from '../../models/game';
import { Account } from '../../models/account';
import { Scenario } from '../../models/scenario';
import { Avatar } from '../../models/avatar';

const RESOURCE = 'game';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private apiService = inject(ApiService);

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
  readGame(avatar: Avatar, scenario: Scenario, account: Account): any {

    // (DTO)
    const JsonGame: any = {
      // id: null,
      // health: 100,
      // currentScene: scenario.firstScene,
      // status: GameStatus.PENDING,

      avatar: avatar,
      scenario: scenario,
      account: account,
    };

    return this.apiService.post(RESOURCE+"/read", JsonGame);

    //récupère la dernière partie de ce scénario en cours
    // getLastPendingGameWithThisScenario(){
    // }
  }
}
