import { Component, EventEmitter, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NukeButton } from "../nuke-button/nuke-button";

@Component({
  selector: 'app-resume-modal',
  templateUrl: './resume-modal.html',
  styleUrl: './resume-modal.scss',
  imports: [NukeButton],
})
export class ResumeModal {
  @Output() choice = new EventEmitter<'continue' | 'restart' | 'close'>();

  resume(): void {
    this.choice.emit('continue');
  }

  restart(): void {
    this.choice.emit('restart');
  }

  close(): void {
    this.choice.emit('close');
  }
}