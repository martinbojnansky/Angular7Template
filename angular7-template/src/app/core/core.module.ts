import { NgModule, Optional, SkipSelf, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import * as layouts from './layouts';
import * as pages from './pages';
import * as services from './services';
import * as guards from './guards';
import { LocalizationSettings, Locale } from './services';

@NgModule({
  declarations: [
    // Layouts
    layouts.AuthorizedLayoutComponent,
    // Pages
    pages.LoginPageComponent,
    pages.NotFoundPageComponent
  ],
  imports: [BrowserModule, CommonModule, HttpClientModule, RouterModule],
  exports: [
    // Layouts
    layouts.AuthorizedLayoutComponent,
    // Pages
    pages.LoginPageComponent,
    pages.NotFoundPageComponent
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
      provide: services.LocalizationSettings,
      useValue: <LocalizationSettings>{
        defaultLocale: Locale.EN,
        useReload: true
      }
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
