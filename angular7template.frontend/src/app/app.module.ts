import { NgModule } from '@angular/core';

import { CoreModule } from './core/';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PublicModule } from '@app/public';

@NgModule({
  declarations: [AppComponent],
  imports: [AppRoutingModule, CoreModule],
  exports: [],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
