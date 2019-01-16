import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';
import { UsersRoutingModule } from './users-routing.module';
import * as services from './services';
import * as pages from './pages';
import * as components from './components';

@NgModule({
  declarations: [pages.UsersComponent, components.UserDetailComponent],
  imports: [SharedModule, UsersRoutingModule],
  providers: [services.UsersRepositoryService]
})
export class UsersModule {}
