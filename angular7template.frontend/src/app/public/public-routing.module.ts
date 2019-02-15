import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppRoute } from '@assets/constants';
import { LoginViewComponent, NotFoundViewComponent } from '@app/public/views';

const routes: Routes = [
  {
    path: AppRoute.DEFAULT,
    redirectTo: AppRoute.AUTH,
    pathMatch: 'full'
  },
  {
    path: AppRoute.LOGIN,
    component: LoginViewComponent
  },
  {
    // Any other unknown route is redirected to not found error page.
    // This route has to be registered as the last one.
    path: '**',
    component: NotFoundViewComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class PublicRoutingModule {}
