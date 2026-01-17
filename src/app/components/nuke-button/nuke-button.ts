import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

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
}
