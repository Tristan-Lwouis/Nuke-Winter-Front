import { Component, inject } from '@angular/core';

import { SnowEffect } from '../../components/snow-effect/snow-effect';
import { ParallaxDirective } from '../../shared/directives/parallax.directive';
import { NukeButton } from '../../components/nuke-button/nuke-button';
import { AudioService } from '../../core/services/audio/audio-service';

@Component({
  selector: 'app-settings',
  imports: [SnowEffect, ParallaxDirective, NukeButton],
  templateUrl: './settings.html',
  styleUrl: './settings.scss',
})
export class Settings {
  audioService = inject(AudioService);

  get musicVolumePercentage() {
    return Math.round(this.audioService.masterMusicVolume * 100);
  }
  get soundVolumePercentage() {
    return Math.round(this.audioService.masterSoundVolume * 100);
  }

  updateMusicVolume(event: Event) {
    const value = (event.target as HTMLInputElement).valueAsNumber;
    this.audioService.setMusicVolume(value / 100);
  }

  updateSoundVolume(event: Event) {
    const value = (event.target as HTMLInputElement).valueAsNumber;
    this.audioService.setSoundVolume(value / 100);
    // Beep test
    if (this.audioService.masterSoundVolume > 0) {
      // Optional: Play a test sound only if user drags?
      // Might be annoying if it fires continuously. Let's skip for now or just log.
    }
  }

  setMusicMax() {
    this.audioService.setMusicVolume(1);
  }
  setMusicMute() {
    this.audioService.setMusicVolume(0);
  }

  setSoundMax() {
    this.audioService.setSoundVolume(1);
  }
  setSoundMute() {
    this.audioService.setSoundVolume(0);
  }
}
