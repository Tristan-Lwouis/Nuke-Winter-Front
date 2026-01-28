import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { ParallaxDirective } from '../../shared/directives/parallax.directive';
import { NukeButton } from "../../components/nuke-button/nuke-button";
import { SnowEffect } from "../../components/snow-effect/snow-effect";
import { AudioService } from '../../core/services/audio/audio-service';

@Component({
  selector: 'app-start-game',
  imports: [ParallaxDirective, NukeButton, SnowEffect],
  templateUrl: './start-game.html',
  styleUrl: './start-game.scss',
})
export class StartGame implements OnInit {

  private audioService = inject(AudioService);
  cdr = inject(ChangeDetectorRef);

  ngOnInit() {
    this.audioService.playBackground(this.audioService.mainMusicPath, 0.5);
    this.cdr.detectChanges();
  }
}
