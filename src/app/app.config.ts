import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { dataReducer } from './reducers';
import { DataEffects } from './effects';
import { ApiService } from './api.service';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(),provideHttpClient(), provideStore({ data: dataReducer }),
    provideEffects([DataEffects]),
    ApiService,
]
};
