import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { pseudoInterceptor } from './core/middleware/pseudo-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [// pour injecter les interceptors dans toutes les requetes
    provideHttpClient(withInterceptors([pseudoInterceptor])),
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes)
  ]
};
