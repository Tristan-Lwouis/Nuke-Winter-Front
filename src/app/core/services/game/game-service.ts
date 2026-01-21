import { Injectable, inject } from '@angular/core';
import { ApiService } from '../api/api-service';

const RESOURCE = 'game'

@Injectable({
  providedIn: 'root',
})

export class GameService {
  private apiService = inject(ApiService);

  showScene(id: number) {
    this.apiService.get(`${RESOURCE}/${id}`)
  }
}
