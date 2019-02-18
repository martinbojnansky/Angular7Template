import { NgModule, Optional, SkipSelf } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { LocalizationSettings } from '@assets/localization';
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
import {
  DefaultLoginRepository,
  LoginRepository
} from '@app/core/repositories';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    NoopAnimationsModule,
    CommonModule,
    HttpClientModule,
    RouterModule
  ],
  exports: [],
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
    // Guards
    AuthGuard,
    // Interceptors
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHeaderInterceptor,
      multi: true
    },
    // Repositories
    {
      provide: LoginRepository,
      useClass: DefaultLoginRepository
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
