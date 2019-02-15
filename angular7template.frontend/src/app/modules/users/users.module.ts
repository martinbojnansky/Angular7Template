import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared';
import { UsersRoutingModule } from './users-routing.module';
import * as services from './services';
import * as repositories from './repositories';
import * as views from './views';
import * as components from './components';

@NgModule({
  declarations: [
    // Components
    components.UserDetailComponent,
    components.UserNameComponent,
    // Views
    views.UsersViewComponent
  ],
  imports: [SharedModule, UsersRoutingModule],
  providers: [
    // Services
    services.UsersService,
    // Repositories
    repositories.UsersRepository
  ]
})
export class UsersModule {}
