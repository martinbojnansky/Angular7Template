import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './pages/home/home.component';
import { HomeRoutingModule } from './home-routing.module';

import * as services from './services';

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, HomeRoutingModule, HttpClientModule],
  providers: [services.HomeRepositoryService]
})
export class HomeModule {}
