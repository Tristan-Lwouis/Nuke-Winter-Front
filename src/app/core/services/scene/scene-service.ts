import { inject, Injectable } from '@angular/core';
import { ApiService } from '../api/api-service';
import { Scene } from '../../models/scene';
import { Router } from '@angular/router';
import { TypeScene } from '../../models/type-scene';

const RESOURCE = 'scene';
@Injectable({
  providedIn: 'root',
})
export class SceneService {
  private apiService = inject(ApiService);
  private router = inject(Router);

  read(id: string) {
    return this.apiService.get(`${RESOURCE}/read/${id}`);
  }

  // startNextScene(scene: Scene) {
  //   switch (scene.type) {
  //     case {}:
  //       this.router.navigate(['/scene-multi']);
  //       break;

  //     default:
  //       break;
  //   }
  // }
}
