import { Component, EventEmitter, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NukeButton } from "../nuke-button/nuke-button";

@Component({
  selector: 'app-menu-modal',
  templateUrl: './menu-modal.html',
  styleUrl: './menu-modal.scss',
  imports: [NukeButton],
})
export class MenuModal {
  @Output() choice = new EventEmitter<'resume' | 'giveUp' | 'options' | 'saveAndExit' | 'close'>();

  resume(): void {  
    this.choice.emit('resume');
  }
  
  giveUp(): void {
    this.choice.emit('giveUp');
  }

  options(): void {
    this.choice.emit('options');
  }

  saveAndExit(): void {
    this.choice.emit('saveAndExit');
  }

  close(): void {
    this.choice.emit('close');
  }

}