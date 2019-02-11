import { NgModule, Optional, SkipSelf } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { SharedModule } from '@app/shared';
import * as services from './services';
import * as guards from './guards';
import * as views from './views';
import { LocalizationSettings } from '@assets/localization';

@NgModule({
  declarations: [
    // Views
    views.NotFoundViewComponent,
    views.LoginViewComponent,
    views.AuthorizedViewComponent
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
    views.NotFoundViewComponent,
    views.LoginViewComponent,
    views.AuthorizedViewComponent
  ],
  providers: [
    // Services
    {
      provide: services.AuthService,
      useClass: services.FakeAuthService
    },
    {
      provide: services.LocalStorageService,
      useFactory: () => new services.DefaultLocalStorageService(localStorage)
    },
    {
      provide: services.LocalizationService,
      useClass: services.DefaultLocalizationService
    },
    {
      provide: LocalizationSettings,
      useValue: new LocalizationSettings()
    },
    // Guards
    guards.AuthGuard
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
