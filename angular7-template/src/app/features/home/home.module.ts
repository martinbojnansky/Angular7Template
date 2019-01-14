import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import * as pages from './pages';
import { HomeRoutingModule } from './home-routing.module';

@NgModule({
  declarations: [pages.HomeComponent],
  imports: [CommonModule, HomeRoutingModule]
})
export class HomeModule {}
