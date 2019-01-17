import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared';
import { UsersRoutingModule } from './users-routing.module';
import * as services from './services';
import * as pages from './pages';
import * as components from './components';

@NgModule({
  declarations: [
    // Components
    components.UserDetailComponent,
    // Pages
    pages.UsersPageComponent
  ],
  imports: [SharedModule, UsersRoutingModule],
  providers: [services.UsersRepositoryService]
})
export class UsersModule {}
