import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    // La página llega pre-renderizada: Angular reutiliza ese HTML en lugar de volver a pintarlo.
    provideClientHydration(),
  ],
};
