import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { pesudoInterceptor } from './core/middleware/pseudo-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [// pour injecter les interceptors dans toutes les requetes
    //provideHttpClient(withInterceptors([pesudoInterceptor])),
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes)
  ]
};
