import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared';
import { HomeRoutingModule } from './home-routing.module';
import * as views from './views';

@NgModule({
  declarations: [
    // Views
    views.HomeViewComponent
  ],
  imports: [SharedModule, HomeRoutingModule]
})
export class HomeModule {}
