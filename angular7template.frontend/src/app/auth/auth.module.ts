import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthorizedViewComponent } from '@app/auth/views';

@NgModule({
  declarations: [
    // Views
    AuthorizedViewComponent
  ],
  imports: [SharedModule, AuthRoutingModule],
  exports: [
    // Views
    AuthorizedViewComponent
  ]
})
export class AuthModule {}
