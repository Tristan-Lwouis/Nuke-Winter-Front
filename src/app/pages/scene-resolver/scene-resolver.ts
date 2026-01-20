import { Component, OnInit } from '@angular/core';
import { NukeButton } from '../../components/nuke-button/nuke-button';
import { Game } from '../../core/models/game';
import { GameService } from '../../core/services/game/game-service';

@Component({
  selector: 'app-scene-resolver',
  imports: [NukeButton],
  templateUrl: './scene-resolver.html',
  styleUrl: './scene-resolver.scss',
})
export class SceneResolver implements OnInit {

  game!: Game;

  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    this.game = this.gameService.createGame();
  }
}
