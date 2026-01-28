import { ChangeDetectorRef, Component, inject, Input, OnInit } from '@angular/core';
import { NukeButton } from '../../components/nuke-button/nuke-button';
import { Game } from '../../core/models/game';
import { GameService } from '../../core/services/game/game-service';
import { Router } from '@angular/router';
import { GameStatusEnum } from '../../core/models/enums/gameStatusEnum';

@Component({
  selector: 'app-scene-resolver',
  imports: [NukeButton],
  templateUrl: './scene-resolver.html',
  styleUrl: './scene-resolver.scss',
})
export class SceneResolver implements OnInit {
  private router = inject(Router);
  private gameService = inject(GameService);
  game: Game | null = null;
  cdr = inject(ChangeDetectorRef);
  GameStatusenum = GameStatusEnum;

  ngOnInit(): void {
    //récupérer la game en cours
    this.gameService.game$.subscribe((game: Game | null) => {
      this.game = game;
      // console.log("##SCENERESOLVER");
      // console.log(game?.status);
    });

    if (!this.game) {
      this.router.navigate(['/']); // retour à la page d'accueil si jamais pas de game
      return;
    }
  }
}
