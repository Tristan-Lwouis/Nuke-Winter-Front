import { inject, Injectable } from '@angular/core';
import { ApiService } from '../api/api-service';

const RESOURCE = 'scene'
@Injectable({
  providedIn: 'root',
})
export class SceneService {

  private apiService = inject(ApiService);

  read(id:string) {
    return this.apiService.get(`${RESOURCE}/read/${id}`);
  }
}