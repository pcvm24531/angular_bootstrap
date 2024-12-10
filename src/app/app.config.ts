import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { spinnerInterseptor } from './shared/interseptors/spinner.interseptor';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection(
    { eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(
      withFetch(),
      withInterceptors( [spinnerInterseptor] )
    )
  ]
};
