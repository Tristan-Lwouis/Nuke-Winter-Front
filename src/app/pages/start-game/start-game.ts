import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ParallaxDirective } from '../../shared/directives/parallax.directive';

@Component({
  selector: 'app-start-game',
  imports: [RouterLink, ParallaxDirective],
  templateUrl: './start-game.html',
  styleUrl: './start-game.scss',
})
export class StartGame {

}
