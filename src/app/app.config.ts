import { ApplicationConfig, inject, provideAppInitializer, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withInMemoryScrolling, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { headerInterceptor } from './core/interceptors/header/header-interceptor';
import { provideToastr } from 'ngx-toastr';
import { authInterceptor } from './core/interceptors/auth/auth-interceptor';
import { AuthServiceService } from './core/auth/services/authService/auth-service.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(
      routes,
      withInMemoryScrolling({ scrollPositionRestoration: 'top' },),
      withViewTransitions(),
    ),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch(),withInterceptors([headerInterceptor,authInterceptor])),
     provideToastr(),
     provideAppInitializer(() => {
  const authService = inject(AuthServiceService);

  return authService.checkAuth();
}),
  ],
};
