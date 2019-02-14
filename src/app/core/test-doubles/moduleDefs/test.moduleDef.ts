import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TestModuleMetadata } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import {
  AuthGuard,
  AuthHeaderInterceptor,
  AuthorizedViewComponent,
  AuthService,
  DefaultLocalizationService,
  FakeAuthService,
  DefaultAuthService,
  LocalizationService,
  LocalStorageService,
  LoginRepository,
  LoginViewComponent,
  NotFoundViewComponent
} from '@app/core';
import { ConstantsPipe, LocalizePipe } from '@app/shared';
import {
  localStorageServiceSpyFactory,
  LocalStorageValues,
  LoginRepositoryServiceStub,
  routerSpyFactory
} from '@app/core/test-doubles';
import { LocalizationSettings } from '@assets/localization';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

export const testModuleDefFactory = ({
  localStorageValues
}: {
  localStorageValues?: LocalStorageValues;
}): TestModuleMetadata => ({
  imports: [HttpClientTestingModule, FormsModule, ReactiveFormsModule],
  declarations: [
    // Pipes
    LocalizePipe,
    ConstantsPipe,
    // Views
    NotFoundViewComponent,
    LoginViewComponent,
    AuthorizedViewComponent
  ],
  providers: [
    // Angular services
    {
      provide: Router,
      useFactory: routerSpyFactory
    },
    // Services
    {
      provide: LocalStorageService,
      useValue: localStorageServiceSpyFactory(localStorageValues)
    },
    {
      provide: AuthService,
      useClass: FakeAuthService // DefaultAuthService //
    },
    {
      provide: LocalizationService,
      useClass: DefaultLocalizationService
    },
    {
      provide: LocalizationSettings,
      useValue: new LocalizationSettings()
    },
    // Repositories
    {
      provide: LoginRepository,
      useClass: LoginRepositoryServiceStub
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
    // Pipes
    LocalizePipe
  ],
  schemas: [NO_ERRORS_SCHEMA]
});
