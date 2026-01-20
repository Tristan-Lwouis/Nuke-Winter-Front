import { Injectable } from '@angular/core';
import { Game } from '../../models/game';

@Injectable({
  providedIn: 'root',
})
export class GameService {

  //initialisation ici pour tester les points de vie
  createGame(): Game {
    return {
      id: 1,
      account: {id: 2, pseudo: 'pseudoTest',image: 'urlimage'},
      health: 0,
      nbTry: 0,
      nbSucces: 0,
    };
  }
    
}
