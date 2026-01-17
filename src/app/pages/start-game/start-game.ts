import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ParallaxDirective } from '../../shared/directives/parallax.directive';
import { NukeButton } from "../../components/nuke-button/nuke-button";
import { SnowEffect } from "../../components/snow-effect/snow-effect";

@Component({
  selector: 'app-start-game',
  imports: [RouterLink, ParallaxDirective, NukeButton, SnowEffect],
  templateUrl: './start-game.html',
  styleUrl: './start-game.scss',
})
export class StartGame {

}
