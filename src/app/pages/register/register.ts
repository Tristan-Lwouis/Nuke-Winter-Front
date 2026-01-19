import { Component } from '@angular/core';
import { SnowEffect } from "../../components/snow-effect/snow-effect";
import { NukeButton } from "../../components/nuke-button/nuke-button";
import { RouterLink } from '@angular/router';
import { ParallaxDirective } from '../../shared/directives/parallax.directive';

@Component({
  selector: 'app-register',
  imports: [SnowEffect, NukeButton, RouterLink, ParallaxDirective],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {

}