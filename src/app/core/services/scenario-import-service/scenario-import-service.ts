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
    // console.log(JsonManifest);
    return this.apiService.post('scenario/import', JsonManifest);
  }

  loadImages(images: File[]) {
    const formData = new FormData();
    // nettoyage des images polués par le webkitdirectory
    images.forEach((image) => {
      const cleanFile = new File([image], image.name, { type: image.type });
      formData.append('image', cleanFile);
    });
    return this.apiService.post('api/images/uploads', formData);
  }
}
