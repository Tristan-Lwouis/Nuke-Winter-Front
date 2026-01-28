import { Injectable, inject } from '@angular/core';
import { AudioService } from '../audio/audio-service';
import { ApiService } from '../api/api-service';
import { Account } from '../../models/account';
import { Scenario } from '../../models/scenario';
import { Avatar } from '../../models/avatar';
import { Router } from '@angular/router';
import { BehaviorSubject, tap } from 'rxjs';
import { SceneService } from '../scene/scene-service';
import { Game } from '../../models/game';
import { Response } from '../../models/response';

const RESOURCE = 'game';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private apiService = inject(ApiService);
  private router = inject(Router);
  private audioService = inject(AudioService);

  // un observable pour barder la game à jour
  private gameSubject = new BehaviorSubject<Game | null>(null);
  game$ = this.gameSubject.asObservable();

  get currentGame(): Game | null {
    return this.gameSubject.value;
  }

  updateGame(game: Game) {
    this.gameSubject.next(game);
  }

  startGame() {
    this.audioService.stopBackground();
    this.router.navigate(['/game-component']);
  }

  // route pour récupérr une game ou en créer une si elle n'existe pas
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

  calculResponse(response: Response) {
    const data = {
      idGame: this.currentGame?.idGame,
      idResponse: response.idResponse,
    };
    return this.apiService.post(RESOURCE + '/calcul-response', data);
  }

  giveUp(newGame:boolean = false) {
    return this.apiService.post(RESOURCE + '/' + this.currentGame?.idGame + '/give-up' + '?newGame=' + newGame, {}).pipe(
      tap((game: Game) => {
        this.updateGame(game);

        if (newGame) {
         this.startGame()
        }
        else this.router.navigate(['/',  { queryParams: { status:game.status } }]);
        
      }),
    );
  }
}
