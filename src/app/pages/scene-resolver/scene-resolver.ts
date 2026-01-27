import { ChangeDetectorRef, Component, inject, Input, OnInit } from '@angular/core';
import { NukeButton } from '../../components/nuke-button/nuke-button';
import { Game } from '../../core/models/game';
import { GameService } from '../../core/services/game/game-service';
import { Scene } from '../../core/models/scene';
import { SceneService } from '../../core/services/scene/scene-service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-scene-resolver',
  imports: [NukeButton],
  templateUrl: './scene-resolver.html',
  styleUrl: './scene-resolver.scss',
})
export class SceneResolver implements OnInit {

  
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private gameService = inject(GameService);
  game: Game|null = null;
  cdr = inject(ChangeDetectorRef);
  

  ngOnInit(): void {
    
    //récupérer l'id de game dans l'url qui vient de game-component (en passant par app-route)
    //const gameId = Number(this.route.snapshot.paramMap.get('gameId'));

    //récupérer la game en cours
    //this.game = this.gameService.getGameByid(gameId)!;
    this.gameService.game$.subscribe((game : Game|null)=>{
      this.game = game

    });

    if (!this.game) {
      this.router.navigate(['/']); // retour à la page d'accueil si jamais pas de game
      return;
      }

      
  }


  
}
