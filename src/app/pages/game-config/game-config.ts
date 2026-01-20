import { Component } from '@angular/core';
import { SnowEffect } from "../../components/snow-effect/snow-effect";
import { ParallaxDirective } from '../../shared/directives/parallax.directive';
import { NukeButton } from "../../components/nuke-button/nuke-button";
import { Avatar } from '../../core/models/avatar';

@Component({
  selector: 'app-game-config',
  imports: [SnowEffect, ParallaxDirective, NukeButton],
  templateUrl: './game-config.html',
  styleUrl: './game-config.scss',
})
export class GameConfig {

  currentAvatarIndex = 0;

  avatars: Avatar[] = [
    { id: 1, name: "SARAH", image: "/assets/images/avatar-sarah.png" },
    { id: 2, name: "KURT", image: "/assets/images/avatar-kurt.png" },
    { id: 3, name: "PEDRO", image: "/assets/images/avatar-pedro.png" }
  ];

  get currentAvatar(): Avatar {
    return this.avatars[this.currentAvatarIndex];
  }

  /**
   * 
   * @param direction Permet de faire defiler tous les avatrs : 1 Avance dans le tableau, -1 recule dans le tableau
   */
  nextAvatar(direction: number) {
    const len = this.avatars.length;

    // Si liste recu est vide.
    if (len === 0) {
      console.warn("La liste des avatars est vide.");
      return;
    }
    const step = direction > 0 ? 1 : direction < 0 ? -1 : 0;
    this.currentAvatarIndex = (this.currentAvatarIndex + step + len) % len;
  }
}
