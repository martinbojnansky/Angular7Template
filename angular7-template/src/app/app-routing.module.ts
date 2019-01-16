import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppRoutes } from '@shared/constants';
import { AuthorizationGuard } from './core/guards/authorization.guard';

const routes: Routes = [
  {
    path: AppRoutes.DEFAULT,
    redirectTo: `/${AppRoutes.HOME}`,
    pathMatch: 'full'
  },
  {
    path: AppRoutes.HOME,
    loadChildren: './features/home/home.module#HomeModule'
  },
  {
    path: AppRoutes.ADMIN,
    canActivate: [AuthorizationGuard],
    children: [
      {
        path: AppRoutes.USERS,
        loadChildren: './features/users/users.module#UsersModule',
        canActivate: [AuthorizationGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
