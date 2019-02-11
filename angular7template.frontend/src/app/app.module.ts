import { NgModule } from '@angular/core';

import { CoreModule } from './core/';
import { BaseModule } from '@modules/base';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BaseModule, AppRoutingModule, CoreModule],
  exports: [],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
