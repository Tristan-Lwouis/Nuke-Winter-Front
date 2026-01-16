import { Component, AfterViewInit, ElementRef, NgZone, OnDestroy } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-start-game',
  imports: [RouterLink],
  templateUrl: './start-game.html',
  styleUrl: './start-game.scss',
})
export class StartGame implements AfterViewInit, OnDestroy {
private skyEl?: HTMLElement | null;
  private cityEl?: HTMLElement | null;
  private avatarEl?: HTMLElement | null;

  private rafId: number | null = null;
  private targetX = 0;
  private targetY = 0;

  private readonly maxMove = 50; // amplitude globale (px)

  private onMouseMove = (e: MouseEvent) => {
    // Normalise en [-0.5 ; 0.5]
    const nx = e.clientX / window.innerWidth - 0.5;
    const ny = e.clientY / window.innerHeight - 0.5;

    // Cible (on ne bouge pas direct, on lisse ensuite)
    this.targetX = nx * this.maxMove;
    this.targetY = ny * this.maxMove;

    if (this.rafId === null) this.tick();
  };

  private onMouseLeave = () => {
    // Retour doux au centre
    this.targetX = 0;
    this.targetY = 0;
    if (this.rafId === null) this.tick();
  };

  constructor(private host: ElementRef<HTMLElement>, private zone: NgZone) {}

  ngAfterViewInit(): void {
    const root = this.host.nativeElement;

    this.skyEl = root.querySelector('.sky');
    this.cityEl = root.querySelector('.city');
    this.avatarEl = root.querySelector('.avatar');

    this.zone.runOutsideAngular(() => {
      window.addEventListener('mousemove', this.onMouseMove, { passive: true });
      window.addEventListener('mouseleave', this.onMouseLeave, { passive: true });
    });
  }

  private tick = () => {

    const curX = Number(this.host.nativeElement.dataset['px'] ?? '0');
    const curY = Number(this.host.nativeElement.dataset['py'] ?? '0');

    // Lissage (+-nerveux)
    const ease = 0.12;
    const nextX = curX + (this.targetX - curX) * ease;
    const nextY = curY + (this.targetY - curY) * ease;

    this.host.nativeElement.dataset['px'] = String(nextX);
    this.host.nativeElement.dataset['py'] = String(nextY);

    // avatar < ville < ciel 
    this.applyParallax(this.skyEl, nextX, nextY, 0.80);
    this.applyParallax(this.cityEl, nextX, nextY, 0.35);
    this.applyParallax(this.avatarEl, nextX, nextY, 0.15);

    // this.applyParallax(this.skyEl, nextX, nextY, 0.15);
    // this.applyParallax(this.cityEl, nextX, nextY, 0.35);
    // this.applyParallax(this.avatarEl, nextX, nextY, 0.60);

    const stillMoving = Math.abs(this.targetX - nextX) > 0.05 || Math.abs(this.targetY - nextY) > 0.05;

    if (stillMoving) {
      this.rafId = requestAnimationFrame(this.tick);
    } else {
      // Stop pour ne pas tourner inutilement
      this.rafId = null;
    }
  };

  private applyParallax(el: HTMLElement | null | undefined, x: number, y: number, depth: number) {
    if (!el) return;
    const tx = x * depth;
    const ty = y * depth;
    el.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
  }

  ngOnDestroy(): void {
    window.removeEventListener('mousemove', this.onMouseMove);
    window.removeEventListener('mouseleave', this.onMouseLeave);

    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
  }
}
