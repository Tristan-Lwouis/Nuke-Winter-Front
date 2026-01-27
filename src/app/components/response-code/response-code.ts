import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { Scene } from '../../core/models/scene';
import { Response } from '../../core/models/response';
import { AudioService } from '../../core/services/audio/audio-service';

@Component({
  selector: 'app-response-code',
  imports: [],
  standalone: true,
  templateUrl: './response-code.html',
  styleUrl: './response-code.scss',
})
export class ResponseCode {
  @Input() scene: Scene | undefined;
  @Output() selectedResponse = new EventEmitter<Response>();

  private audioService = inject(AudioService);

  userCode: string = '';
  errorMessage: string = '';
  maxLen = 4; // Longueur pour le code

  selectResponse(response: Response) {
    this.selectedResponse.emit(response);
  }

  addDigit(digit: number) {
    this.audioService.play(this.audioService.beepSoundPath);
    if (this.userCode.length < this.maxLen) {
      this.userCode += digit;
      this.errorMessage = '';
    }
  }

  clear() {
    this.audioService.play(this.audioService.beepSoundPath);
    this.userCode = '';
    this.errorMessage = '';
  }

  validate() {
    if (!this.scene || !this.userCode) return;

    // Cherche une réponse qui matche le code entré
    const match = this.scene.responses.find((r) => r.name === this.userCode);

    if (match) {
      this.audioService.play(this.audioService.openPath);
      this.selectedResponse.emit(match);
      this.clear();
    } else {
      this.audioService.play(this.audioService.errorPath);
      this.errorMessage = 'Accès Refusé';
      this.userCode = '';
    }
  }
}
