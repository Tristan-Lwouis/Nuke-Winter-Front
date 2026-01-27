import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AudioService } from '../../core/services/audio/audio-service';

@Component({
  selector: 'app-nuke-button',
  imports: [RouterLink],
  templateUrl: './nuke-button.html',
  styleUrl: './nuke-button.scss',
})
export class NukeButton {
  @Input() label: string = '';
  @Input() route: string = '';
  @Input() width: string = '';
  @Input() fontSize: number = 1.5;

  constructor(private audioService: AudioService) {}

  playClickSound() {
    this.audioService.play('/assets/sounds/click.mp3');
  }
}
