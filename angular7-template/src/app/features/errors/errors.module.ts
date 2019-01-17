import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared';
import { ErrorsRoutingModule } from './errors-routing.module';
import * as pages from './pages';

@NgModule({
  declarations: [pages.UnauthorizedComponent, pages.NotFoundComponent],
  imports: [SharedModule, ErrorsRoutingModule]
})
export class ErrorsModule {}
