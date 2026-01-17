import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ParallaxDirective } from '../../shared/directives/parallax.directive';
import { NukeButton } from "../../components/nuke-button/nuke-button";
import { SnowEffect } from "../../components/snow-effect/snow-effect";

@Component({
  selector: 'app-menu',
  imports: [RouterLink, ParallaxDirective, NukeButton, SnowEffect],
  templateUrl: './menu.html',
  styleUrl: './menu.scss',
})
export class Menu {

}
