import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared';
import { PublicRoutingModule } from '@app/public/public-routing.module';
import { LoginViewComponent, NotFoundViewComponent } from '@app/public/views';

@NgModule({
  declarations: [LoginViewComponent, NotFoundViewComponent],
  imports: [SharedModule, PublicRoutingModule],
  exports: [LoginViewComponent, NotFoundViewComponent]
})
export class PublicModule {}
