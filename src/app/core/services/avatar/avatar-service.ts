import { inject, Injectable } from '@angular/core';
import { ApiService } from '../api/api-service';


const RESOURCE = 'avatar'

@Injectable({
  providedIn: 'root',
})
export class AvatarService {

  private apiService = inject(ApiService);

  getAllAvatars() {
    return this.apiService.getAll(`${RESOURCE}`);
  }
  
}
