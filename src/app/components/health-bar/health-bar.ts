import { Component, Input } from '@angular/core';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-health-bar',
  imports: [NgStyle],
  templateUrl: './health-bar.html',
  styleUrl: './health-bar.scss',
})
export class HealthBar {
  @Input() damage: number = 0;

  get clipStyle() {
    return {
      'clip-path': `inset(0 ${this.damage}% 0 0)`,
      filter: `hue-rotate(-${this.damage * 1.2}deg)`,
    };
  }
}
