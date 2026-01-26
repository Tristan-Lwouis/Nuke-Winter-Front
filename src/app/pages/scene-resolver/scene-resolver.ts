import { ChangeDetectorRef, Component, inject, Input, OnInit } from '@angular/core';
import { NukeButton } from '../../components/nuke-button/nuke-button';
import { Game } from '../../core/models/game';
import { GameService } from '../../core/services/game/game-service';
import { Scene } from '../../core/models/scene';
import { SceneService } from '../../core/services/scene/scene-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-scene-resolver',
  imports: [NukeButton],
  templateUrl: './scene-resolver.html',
  styleUrl: './scene-resolver.scss',
})
export class SceneResolver implements OnInit {

  
  private router = inject(Router)
  game!: Game;
  gameService! : GameService;
  cdr = inject(ChangeDetectorRef);
  

  ngOnInit(): void {
    
    if (!this.game) {
      this.router.navigate(['/']); // retour à la page d'accueil si jamais pas de game
      return;
      }

    //récupérer la game en cours
    this.game = this.gameService.getGame()!;
      
  }


  
}
