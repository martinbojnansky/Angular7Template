import { NgModule, Optional, SkipSelf } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import * as components from './components';
import * as services from './services';

@NgModule({
  declarations: [components.AppbarComponent],
  imports: [BrowserModule, CommonModule, HttpClientModule, RouterModule],
  exports: [components.AppbarComponent],
  providers: [
    services.AuthorizationService,
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
