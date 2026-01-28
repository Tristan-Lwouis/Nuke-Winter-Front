import { Component, EventEmitter, Output, inject } from '@angular/core';
import { NukeButton } from '../nuke-button/nuke-button';
import { AudioService } from '../../core/services/audio/audio-service';

@Component({
  selector: 'app-settings-modal',
  templateUrl: './settings-modal.html',
  styleUrl: './settings-modal.scss',
  imports: [NukeButton],
})
export class SettingsModal {
  @Output() close = new EventEmitter<void>();
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

  back(): void {
    this.close.emit();
  }
}
