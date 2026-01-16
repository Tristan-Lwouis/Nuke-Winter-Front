import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ParallaxDirective } from '../../shared/directives/parallax.directive';

@Component({
  selector: 'app-menu',
  imports: [RouterLink, ParallaxDirective],
  templateUrl: './menu.html',
  styleUrl: './menu.scss',
})
export class Menu {

}
