import { Injectable, inject } from '@angular/core';
import { ApiService } from '../api/api-service';

@Injectable({
  providedIn: 'root',
})
export class ScenarioImportService {
  private apiService = inject(ApiService);

  loadScenario(file: File) {
    const formData = new FormData();
    formData.append('file', file);
    return this.apiService.post('scenario/import', formData);
  }
}
