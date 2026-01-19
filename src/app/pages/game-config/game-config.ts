import { Component } from '@angular/core';
import { SnowEffect } from "../../components/snow-effect/snow-effect";
import { ParallaxDirective } from '../../shared/directives/parallax.directive';
import { NukeButton } from "../../components/nuke-button/nuke-button";

@Component({
  selector: 'app-game-config',
  imports: [SnowEffect, ParallaxDirective, NukeButton],
  templateUrl: './game-config.html',
  styleUrl: './game-config.scss',
})
export class GameConfig {

}
