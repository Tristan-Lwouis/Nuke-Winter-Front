import { inject, Injectable } from '@angular/core';
import { ApiService } from '../api/api-service';
import { Scenario } from '../../models/scenario';
import { environment } from '../../../../environments/environment';

const RESOURCE = 'scenario';

@Injectable({
  providedIn: 'root',
})
export class ScenarioService {
  private apiService = inject(ApiService);

  getAllScenarios() {
    return this.apiService.getAll(`${RESOURCE}`);
  }

  addPathToImages(scenarios: Scenario[]) {
    scenarios.forEach((scenario) => {
      scenario.background = `${environment.imageApiUrl}${scenario.background}`;
    });
    return scenarios;
  }
}
