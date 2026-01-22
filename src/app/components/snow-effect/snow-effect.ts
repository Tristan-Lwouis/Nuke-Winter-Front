import { 
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  ViewChild,
  Input } from '@angular/core';

type Flake = {
  x: number;
  y: number;
  r: number;
  vy: number;
  vx: number;
  o: number;
  tw: number;
};

@Component({
  selector: 'app-snow-effect',
  imports: [],
  templateUrl: './snow-effect.html',
  styleUrl: './snow-effect.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SnowEffect implements AfterViewInit, OnDestroy {

  @Input() zIndex: number = 2000;

  @ViewChild('canvas', { static: true }) private canvasRef!: ElementRef<HTMLCanvasElement>;

  // Réglages principaux
  private readonly flakesMax = 140;
  private readonly flakesMaxActive = 80;

  // Effets
  private readonly followMouse = true;
  private readonly useTwinkleEffect = false;

  private ctx!: CanvasRenderingContext2D;
  private dpr = 1;
  private w = 0;
  private h = 0;

  private rafId: number | null = null;
  private lastT = 0;

  private flakes: Flake[] = [];
  private activeCount = 0;

  private wind = 0;
  private windTarget = 0;

  ngAfterViewInit(): void {
    const canvas = this.canvasRef.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    this.ctx = ctx;
    this.resize();
    this.seedFlakes();

    this.rafId = requestAnimationFrame(this.loop);
  }

  ngOnDestroy(): void {
    if (this.rafId !== null) cancelAnimationFrame(this.rafId);
  }

  @HostListener('window:resize')
  resize(): void {
    const canvas = this.canvasRef.nativeElement;

    this.dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
    this.w = Math.floor(window.innerWidth);
    this.h = Math.floor(window.innerHeight);

    canvas.width = Math.floor(this.w * this.dpr);
    canvas.height = Math.floor(this.h * this.dpr);
    canvas.style.width = `${this.w}px`;
    canvas.style.height = `${this.h}px`;

    // 1 unité canvas = 1 px CSS
    this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
  }

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(ev: MouseEvent): void {
    if (!this.followMouse) return;

    const nx = (ev.clientX / Math.max(1, this.w)) * 2 - 1; // -1..+1
    this.windTarget = nx * 1.2;
  }

  private seedFlakes(): void {
    this.flakes = [];
    this.activeCount = 0;

    for (let i = 0; i < this.flakesMax; i++) {
      this.flakes.push(this.newFlake(true));
    }
  }

  private newFlake(randomY = false): Flake {
    const r = this.rand(1, 3.6);

    // vitesses "par frame" puis on multiplie par dt*60 pour un rendu stable
    const vy = this.rand(40, 140) / 60;
    const vx = this.rand(-14, 14) / 60;

    const f: Flake = {
      x: this.rand(0, this.w),
      y: randomY ? this.rand(0, this.h) : this.rand(-this.h * 0.2, 0),
      r,
      vy,
      vx,
      o: this.rand(0.25, 0.95),
      tw: this.rand(0, Math.PI * 2),
    };

    // limite de flocons "actifs" (comme le script d’origine)
    if (this.activeCount < this.flakesMaxActive) {
      this.activeCount++;
    } else {
      f.o *= 0.15;
      f.vy *= 0.35;
      f.vx *= 0.35;
    }

    return f;
  }

  private loop = (t: number) => {
    const dt = this.lastT ? Math.min(0.05, (t - this.lastT) / 1000) : 0.016;
    this.lastT = t;

    // vent lissé
    this.wind += (this.windTarget - this.wind) * 0.06;

    this.draw(dt);
    this.rafId = requestAnimationFrame(this.loop);
  };

  private draw(dt: number): void {
    const ctx = this.ctx;

    ctx.clearRect(0, 0, this.w, this.h);

    for (const f of this.flakes) {
      let opacity = f.o;
      if (this.useTwinkleEffect) {
        f.tw += dt * 3.5;
        opacity *= 0.65 + 0.35 * Math.sin(f.tw);
      }

      const windPush = this.wind * (0.35 + f.r * 0.12);

      f.x += (f.vx + windPush) * (dt * 60);
      f.y += f.vy * (dt * 60);

      // wrap horizontal
      if (f.x < -10) f.x = this.w + 10;
      if (f.x > this.w + 10) f.x = -10;

      // recycle en bas
      if (f.y > this.h + 12) {
        f.x = this.rand(0, this.w);
        f.y = this.rand(-this.h * 0.15, 0);
        f.r = this.rand(1, 3.6);
        f.vy = this.rand(40, 140) / 60;
        f.vx = this.rand(-14, 14) / 60;
        f.o = this.rand(0.25, 0.95);
        f.tw = this.rand(0, Math.PI * 2);
      }

      // draw
      ctx.fillStyle = `rgba(255,255,255,${opacity})`;
      ctx.fillRect(f.x - f.r, f.y - f.r, f.r * 2, f.r * 2);
    }
  }

  private rand(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  }
}
