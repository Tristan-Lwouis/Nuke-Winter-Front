import { Injectable, inject } from '@angular/core';
import { ApiService } from '../api/api-service';
import { Game } from '../../models/game';

const RESOURCE = 'game'

@Injectable({
  providedIn: 'root',
})
export class GameService {
    private apiService = inject(ApiService);

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

    showScene(id: number) {
    this.apiService.get(`${RESOURCE}/${id}`)
  }
    
}