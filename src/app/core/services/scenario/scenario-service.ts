import { inject, Injectable } from '@angular/core';
import { ApiService } from '../api/api-service';


const RESOURCE = 'scenario'

@Injectable({
  providedIn: 'root',
})
export class ScenarioService {

  private apiService = inject(ApiService);

  getAllScenarios() {
    return this.apiService.getAll(`${RESOURCE}`);
  }
}