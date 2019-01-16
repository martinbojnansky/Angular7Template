import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared';

import { HomeRoutingModule } from './home-routing.module';
import * as pages from './pages';

@NgModule({
  declarations: [pages.HomeComponent],
  imports: [SharedModule, HomeRoutingModule]
})
export class HomeModule {}
