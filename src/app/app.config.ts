import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';
import { NgxSpinnerModule } from "ngx-spinner";
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { headerInterceptor } from './core/interceptors/header/header.interceptor';
import { errorInterceptor } from './core/interceptors/error/error.interceptor';
import { loaderInterceptor } from './core/interceptors/loader/loader.interceptor';
import { provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideAnimations(), provideRouter(routes, withViewTransitions()), provideClientHydration(withEventReplay()), importProvidersFrom(NgxSpinnerModule), provideHttpClient(withFetch(), withInterceptors([headerInterceptor, loaderInterceptor, errorInterceptor]))]
};
