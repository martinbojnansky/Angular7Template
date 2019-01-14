import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import * as services from './services';
import * as pages from './pages';
import * as components from './components';
import { UsersRoutingModule } from './users-routing.module';

@NgModule({
  declarations: [pages.UsersComponent, components.UserDetailComponent],
  imports: [CommonModule, UsersRoutingModule],
  providers: [services.UsersRepositoryService]
})
export class UsersModule {}
