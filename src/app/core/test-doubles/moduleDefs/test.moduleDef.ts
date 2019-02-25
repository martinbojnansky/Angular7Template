import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TestModuleMetadata } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import {
  AuthGuard,
  AuthHeaderInterceptor,
  AuthService,
  DefaultLocalizationService,
  FakeAuthService,
  LocalizationService,
  LocalStorageService
} from '@app/core';
import {
  localStorageServiceSpyFactory,
  LocalStorageValues,
  routerSpyFactory
} from '@app/core/test-doubles';
import { LocalizationSettings } from '@assets/localization';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

export interface CoreTestModuleDefOptions {
  localStorageValues?: LocalStorageValues;
}

export const coreTestModuleDefFactory = (
  options?: CoreTestModuleDefOptions
): TestModuleMetadata => ({
  imports: [HttpClientTestingModule, FormsModule, ReactiveFormsModule],
  declarations: [],
  providers: [
    // Angular services
    {
      provide: Router,
      useFactory: routerSpyFactory
    },
    // Services
    {
      provide: LocalStorageService,
      useValue: localStorageServiceSpyFactory(
        options && options.localStorageValues ? options.localStorageValues : {}
      )
    },
    {
      provide: AuthService,
      useClass: FakeAuthService
    },
    {
      provide: LocalizationService,
      useClass: DefaultLocalizationService
    },
    {
      provide: LocalizationSettings,
      useValue: new LocalizationSettings()
    },
    // Guards
    AuthGuard,
    // Interceptors
    AuthHeaderInterceptor,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHeaderInterceptor,
      multi: true
    },
    // Repositories
  ],
  schemas: [NO_ERRORS_SCHEMA]
});
