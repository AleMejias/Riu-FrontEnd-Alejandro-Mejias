import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { httpInterceptorInterceptor } from '@core-interceptors/http-interceptor.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(), // required animations providers
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideClientHydration(withEventReplay()), 
    provideHttpClient(
      withFetch(),
      withInterceptors([httpInterceptorInterceptor])
    ),
    importProvidersFrom(MatSnackBarModule)
  ]

};
