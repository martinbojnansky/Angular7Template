import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppRoute } from '@assets/constants';
import { AuthGuard } from '@app/core';

const routes: Routes = [
  {
    path: AppRoute.DEFAULT,
    pathMatch: 'full',
    redirectTo: AppRoute.AUTH
  },
  {
    path: AppRoute.AUTH,
    canActivate: [AuthGuard],
    loadChildren: './auth/auth.module#AuthModule'
  },
  {
    path: AppRoute.DEFAULT,
    loadChildren: './public/public.module#PublicModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
