import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AudioService {
  //permet d'avoir plsuezieu sfoond
  cache = new Map<string, HTMLAudioElement>();

  // permet de precharger des son
  preload(src: string) {
    const audio = new Audio(src);
    this.cache.set(src, audio);
  }

  play(src: string, loop: boolean = false) {
    let audio = this.cache.get(src);

    if (!audio) {
      audio = new Audio(src);
      this.cache.set(src, audio);
    }

    audio.loop = loop;
    audio.play();
    console.log(this.cache);
  }

  pause(src:string) {
    let audio = this.cache.get(src);
    audio!.pause();
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
}
