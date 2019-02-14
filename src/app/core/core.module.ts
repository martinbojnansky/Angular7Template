import { NgModule, Optional, SkipSelf } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { SharedModule } from '@app/shared';
import { LocalizationSettings } from '@assets/localization';
import { LoginRepository } from '@app/core/repositories/login/login.repository';
import {
  AuthorizedViewComponent,
  LoginViewComponent,
  NotFoundViewComponent
} from '@app/core/views';
import {
  AuthService,
  DefaultLocalizationService,
  FakeAuthService,
  DefaultAuthService,
  LocalizationService,
  LocalStorageService
} from '@app/core/services';
import { AuthGuard } from '@app/core/guards';
import { AuthHeaderInterceptor } from '@app/core/interceptors';
import { DefaultLoginRepository } from '@app/core/repositories';

@NgModule({
  declarations: [
    // Views
    NotFoundViewComponent,
    LoginViewComponent,
    AuthorizedViewComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    RouterModule,
    SharedModule
  ],
  exports: [
    // Views
    NotFoundViewComponent,
    LoginViewComponent,
    AuthorizedViewComponent
  ],
  providers: [
    // Services
    {
      provide: AuthService,
      useClass: FakeAuthService // DefaultAuthService //
    },
    {
      provide: LocalStorageService,
      useValue: localStorage
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
      useClass: DefaultLoginRepository
    },
    // Guards
    AuthGuard,
    // Interceptors
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHeaderInterceptor,
      multi: true
    }
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only'
      );
    }
  }
}
