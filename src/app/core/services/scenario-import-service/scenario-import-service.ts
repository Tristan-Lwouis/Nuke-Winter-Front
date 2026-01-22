import { Injectable, inject } from '@angular/core';
import { ApiService } from '../api/api-service';

@Injectable({
  providedIn: 'root',
})
export class ScenarioImportService {
  private apiService = inject(ApiService);

  // loadScenario(file: File) {
  //   const formData = new FormData();
  //   formData.append('file', file);
  //   console.log(formData);
  //   return this.apiService.post('scenario/import', formData);
  // }

  loadScenario(JsonManifest: JSON) {
    console.log(JsonManifest);
    return this.apiService.post('scenario/import', JsonManifest);
  }

  loadImages(images: File[]) {
    console.log(images);
    return this.apiService.post('api/images/uploads', images);
  }
}
