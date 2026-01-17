import { Directive, ElementRef, NgZone, AfterViewInit, OnDestroy, Input } from '@angular/core';

@Directive({
  selector: '[appParallax]',
  standalone: true
})
export class ParallaxDirective implements AfterViewInit, OnDestroy {
  private far_distanceEl?: HTMLElement | null;
  private med_distanceEl?: HTMLElement | null;
  private near_distanceEl?: HTMLElement | null;

  @Input() parallaxRatios = { far: 0.80, med: 0.35, near: 0.15 };

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
    this.far_distanceEl = root.querySelector('.far_distance');
    this.med_distanceEl = root.querySelector('.med_distance');
    this.near_distanceEl = root.querySelector('.near_distance');

    // Petit boost CSS (à mettre idéalement en CSS, mais ok ici si besoin)
    this.far_distanceEl && (this.far_distanceEl.style.willChange = 'transform');
    this.med_distanceEl && (this.med_distanceEl.style.willChange = 'transform');
    this.near_distanceEl && (this.near_distanceEl.style.willChange = 'transform');

    this.zone.runOutsideAngular(() => {
      window.addEventListener('pointermove', this.onPointerMove, { passive: true });
      window.addEventListener('blur', this.onWindowBlur, { passive: true });
    });
  }

  private tick = () => {
    this.curX = this.curX + (this.targetX - this.curX) * this.ease;
    this.curY = this.curY + (this.targetY - this.curY) * this.ease;

    this.applyParallax(this.far_distanceEl, this.curX, this.curY, this.parallaxRatios.far);
    this.applyParallax(this.med_distanceEl, this.curX, this.curY, this.parallaxRatios.med);
    this.applyParallax(this.near_distanceEl, this.curX, this.curY, this.parallaxRatios.near);

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
