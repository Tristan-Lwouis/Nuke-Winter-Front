import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { Scene } from '../../core/models/scene';
import { Response } from '../../core/models/response';
import { AudioService } from '../../core/services/audio/audio-service';

@Component({
  selector: 'app-response-multi',
  imports: [],
  templateUrl: './response-multi.html',
  styleUrl: './response-multi.scss',
})
export class ResponseMulti {

  // Attribut selectedResponse
 // selectedResponse: Response | undefined;

  @Input() scene: Scene | undefined;

  @Output() selectedResponse = new EventEmitter<Response>();

  audioService = inject(AudioService);

   selectResponse(response: Response) {
      this.audioService.play(this.audioService.clickSoundPath);
      this.selectedResponse.emit(response);
    }

}
