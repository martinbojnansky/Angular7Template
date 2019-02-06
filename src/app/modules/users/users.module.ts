import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared';
import { UsersRoutingModule } from './users-routing.module';
import * as services from './services';
import * as pages from './pages';
import * as components from './components';
import { UserNameComponent } from './components/user-name/user-name.component';

@NgModule({
  declarations: [
    // Components
    components.UserDetailComponent,
    // Pages
    pages.UsersPageComponent,
    UserNameComponent
  ],
  imports: [SharedModule, UsersRoutingModule],
  providers: [services.UsersService]
})
export class UsersModule {}
