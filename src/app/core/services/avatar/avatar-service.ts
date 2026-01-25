import { inject, Injectable } from '@angular/core';
import { ApiService } from '../api/api-service';
import { Avatar } from '../../models/avatar';
import { environment } from '../../../../environments/environment';


const RESOURCE = 'avatar'

@Injectable({
  providedIn: 'root',
})
export class AvatarService {

  private apiService = inject(ApiService);

  getAllAvatars() {
    return this.apiService.getAll(`${RESOURCE}`);
  }

  addPathToImages(avatars: Avatar[]) {
    avatars.forEach((avatar) => {
      avatar.image = `${environment.imageApiUrl}${avatar.image}`;
    });
    return avatars;
  }
  
}
