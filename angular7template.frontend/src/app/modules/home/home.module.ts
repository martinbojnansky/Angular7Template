import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared';
import { HomeRoutingModule } from './home-routing.module';
import * as pages from './pages';

@NgModule({
  declarations: [
    // Pages
    pages.HomePageComponent
  ],
  imports: [SharedModule, HomeRoutingModule]
})
export class HomeModule {}
