import { NgModule, Optional, SkipSelf } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import * as layouts from './layouts';
import * as pages from './pages';
import * as services from './services';
import * as guards from './guards';

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
      provide: Storage,
      useValue: window.localStorage
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
