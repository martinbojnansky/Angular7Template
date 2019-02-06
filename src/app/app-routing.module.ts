import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppRoute } from '@assets/constants';
import {
  AuthGuard,
  AuthorizedLayoutComponent,
  NotFoundPageComponent
} from './core';
import { LoginPageComponent } from './core';

const routes: Routes = [
  {
    path: AppRoute.DEFAULT,
    redirectTo: AppRoute.AUTH,
    pathMatch: 'full'
  },
  {
    path: AppRoute.LOGIN,
    component: LoginPageComponent
  },
  {
    path: AppRoute.AUTH,
    component: AuthorizedLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: AppRoute.HOME,
        pathMatch: 'full'
      },
      {
        path: AppRoute.HOME,
        loadChildren: './modules/home/home.module#HomeModule'
      },
      {
        path: AppRoute.USERS,
        loadChildren: './modules/users/users.module#UsersModule'
      }
    ]
  },
  {
    // Any other unknown route is redirected to not found error page.
    // This route has to be registered as the last one.
    path: '**',
    component: NotFoundPageComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
