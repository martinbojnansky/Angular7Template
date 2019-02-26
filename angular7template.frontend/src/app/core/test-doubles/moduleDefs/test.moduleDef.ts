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
  DefaultAuthService,
  LocalizationService,
  LocalStorageService, AuthExpirationInterceptor
} from '@app/core';
import {
  localStorageServiceSpyFactory,
  LocalStorageValues,
  LoginRepositoryStub,
  routerSpyFactory
} from '@app/core/test-doubles';
import { LocalizationSettings } from '@assets/localization';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginRepository } from '@app/core/repositories';

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
      useClass: DefaultAuthService
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
    AuthExpirationInterceptor,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthExpirationInterceptor,
      multi: true
    },
    // Repositories
    {
      provide: LoginRepository,
      useClass: LoginRepositoryStub
    }
  ],
  schemas: [NO_ERRORS_SCHEMA]
});
