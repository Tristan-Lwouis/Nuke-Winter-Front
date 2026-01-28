import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AudioService {
  //permet d'avoir plsuezieu sfoond
  cache = new Map<string, HTMLAudioElement>();
  backGroundMusic: HTMLAudioElement | undefined;

  // Master volumes (0.0 to 1.0)
  masterMusicVolume: number = 0.5;
  masterSoundVolume: number = 0.5;

  private currentBackgroundBaseVolume: number = 0.2;

  clickSoundPath = '/assets/sounds/click.mp3';
  beepSoundPath = '/assets/sounds/beep.mp3';
  openPath = '/assets/sounds/open.mp3';
  errorPath = '/assets/sounds/error.mp3';
  mainMusicPath = '/assets/musics/main-ambiance.mp3';

  // permet de precharger des son
  preload(src: string) {
    const audio = new Audio(src);
    this.cache.set(src, audio);
  }

  play(src: string, loop: boolean = false, volume: number = 0.5) {
    let audio = this.cache.get(src);

    if (!audio) {
      audio = new Audio(src);
      this.cache.set(src, audio);
    }

    audio.loop = loop;
    audio.volume = Math.min(Math.max(volume * this.masterSoundVolume, 0), 1);
    audio.play();
    //console.log(this.cache);
  }

  pause(src: string) {
    let audio = this.cache.get(src);
    audio!.pause();
  }

  getCurrentBackgroundMusic() {
    return this.backGroundMusic?.src;
  }

  stop(src: string, fadeOut: boolean = false) {
    const audio = this.cache.get(src);
    if (!audio) return;

    if (!fadeOut) {
      audio.pause();
      audio.currentTime = 0;
      return;
    }

    // Fade-out sur 300ms
    const fadeDuration = 300;
    const steps = 15;
    const stepTime = fadeDuration / steps;
    const volumeStep = audio.volume / steps;

    const fade = setInterval(() => {
      if (audio.volume > volumeStep) {
        audio.volume -= volumeStep;
      } else {
        clearInterval(fade);
        audio.pause();
        audio.currentTime = 0;
        audio.volume = 1; // reset volume
      }
    }, stepTime);
  }

  playBackground(src: string, volume: number = 0.2) {
    if (
      this.backGroundMusic &&
      !this.backGroundMusic.paused &&
      this.backGroundMusic.src.includes(src)
    )
      return;

    // Stop previous if exists
    if (this.backGroundMusic) {
      this.backGroundMusic.pause();
    }

    this.currentBackgroundBaseVolume = volume;
    this.backGroundMusic = new Audio(src);
    this.backGroundMusic.loop = true;
    this.updateBackgroundVolume();
    this.backGroundMusic.play();
  }

  stopBackground() {
    if (this.backGroundMusic) {
      this.backGroundMusic.pause();
    }
  }

  setMusicVolume(volume: number) {
    this.masterMusicVolume = Math.min(Math.max(volume, 0), 1);
    this.updateBackgroundVolume();
  }

  setSoundVolume(volume: number) {
    this.masterSoundVolume = Math.min(Math.max(volume, 0), 1);
  }

  private updateBackgroundVolume() {
    if (this.backGroundMusic) {
      this.backGroundMusic.volume = Math.min(
        Math.max(this.currentBackgroundBaseVolume * this.masterMusicVolume, 0),
        1,
      );
    }
  }
}
