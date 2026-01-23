import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Scene } from '../../core/models/scene';
import { Response } from '../../core/models/response';

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

   selectResponse(response: Response) {
      this.selectedResponse.emit(response);
    }

}
