import { Component, signal, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AudioService } from './core/services/audio/audio-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  protected readonly title = signal('Nuke-Winter');
  private audioService = inject(AudioService);

  ngOnInit() {
    this.audioService.preload(this.audioService.mainMusicPath);
    this.audioService.preload(this.audioService.clickSoundPath);
  }
}
