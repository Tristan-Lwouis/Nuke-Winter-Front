import { Directive, ElementRef, NgZone, AfterViewInit, OnDestroy } from '@angular/core';

@Directive({
  selector: '[appParallax]',
  standalone: true
})
export class ParallaxDirective implements AfterViewInit, OnDestroy {
  private skyEl?: HTMLElement | null;
  private cityEl?: HTMLElement | null;
  private avatarEl?: HTMLElement | null;

  private rafId: number | null = null;

  private targetX = 0;
  private targetY = 0;

  private curX = 0;
  private curY = 0;

  private readonly maxMove = 50;
  private readonly ease = 0.12;

  private onPointerMove = (e: PointerEvent) => {
    const nx = e.clientX / window.innerWidth - 0.5;
    const ny = e.clientY / window.innerHeight - 0.5;

    this.targetX = nx * this.maxMove;
    this.targetY = ny * this.maxMove;

    if (this.rafId === null) this.tick();
  };

  private onWindowBlur = () => {
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

    // Petit boost CSS (à mettre idéalement en CSS, mais ok ici si besoin)
    this.skyEl && (this.skyEl.style.willChange = 'transform');
    this.cityEl && (this.cityEl.style.willChange = 'transform');
    this.avatarEl && (this.avatarEl.style.willChange = 'transform');

    this.zone.runOutsideAngular(() => {
      window.addEventListener('pointermove', this.onPointerMove, { passive: true });
      window.addEventListener('blur', this.onWindowBlur, { passive: true });
    });
  }

  private tick = () => {
    this.curX = this.curX + (this.targetX - this.curX) * this.ease;
    this.curY = this.curY + (this.targetY - this.curY) * this.ease;

    this.applyParallax(this.skyEl, this.curX, this.curY, 0.80);
    this.applyParallax(this.cityEl, this.curX, this.curY, 0.35);
    this.applyParallax(this.avatarEl, this.curX, this.curY, 0.15);

    const stillMoving =
      Math.abs(this.targetX - this.curX) > 0.05 ||
      Math.abs(this.targetY - this.curY) > 0.05;

    if (stillMoving) {
      this.rafId = requestAnimationFrame(this.tick);
    } else {
      this.rafId = null;
    }
  };

  private applyParallax(el: HTMLElement | null | undefined, x: number, y: number, depth: number) {
    if (!el) return;
    el.style.transform = `translate3d(${x * depth}px, ${y * depth}px, 0)`;
  }

  ngOnDestroy(): void {
    window.removeEventListener('pointermove', this.onPointerMove);
    window.removeEventListener('blur', this.onWindowBlur);

    if (this.rafId !== null) cancelAnimationFrame(this.rafId);
    this.rafId = null;
  }
}
