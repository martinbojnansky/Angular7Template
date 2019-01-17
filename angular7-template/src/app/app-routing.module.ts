import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppRoutes } from '@shared/constants';
import { AuthorizationGuard } from './core/guards/authorization.guard';
import * as modules from './features';

const routes: Routes = [
  {
    path: AppRoutes.DEFAULT,
    redirectTo: `${AppRoutes.HOME}`,
    pathMatch: 'full'
  },
  {
    path: AppRoutes.HOME,
    loadChildren: () => modules.HomeModule
  },
  {
    path: AppRoutes.ADMIN,
    canActivate: [AuthorizationGuard],
    children: [
      {
        path: '',
        redirectTo: AppRoutes.USERS,
        pathMatch: 'full'
      },
      {
        path: AppRoutes.USERS,
        loadChildren: () => modules.UsersModule,
        canActivate: [AuthorizationGuard]
      }
    ]
  },
  {
    path: AppRoutes.ERRORS,
    loadChildren: () => modules.ErrorsModule
  },
  {
    path: '**',
    redirectTo: `${AppRoutes.ERRORS}/${AppRoutes.NOT_FOUND}`,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
