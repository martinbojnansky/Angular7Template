import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppRoutes } from './shared';
import {
  AuthorizedLayoutComponent,
  AuthGuard,
  LoginPageComponent,
  NotFoundPageComponent
} from './core';
import { HomeModule, UsersModule } from './modules';

const routes: Routes = [
  {
    path: AppRoutes.DEFAULT,
    redirectTo: `${AppRoutes.AUTH}`,
    pathMatch: 'full'
  },
  {
    path: AppRoutes.LOGIN,
    component: LoginPageComponent
  },
  {
    path: AppRoutes.AUTH,
    component: AuthorizedLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: AppRoutes.HOME,
        pathMatch: 'full'
      },
      {
        path: AppRoutes.HOME,
        loadChildren: () => HomeModule
      },
      {
        path: AppRoutes.USERS,
        loadChildren: () => UsersModule,
        canActivate: [AuthGuard]
      }
    ]
  },
  {
    path: AppRoutes.NOT_FOUND,
    component: NotFoundPageComponent
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
