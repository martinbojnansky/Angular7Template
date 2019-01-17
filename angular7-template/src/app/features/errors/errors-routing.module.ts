import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppRoutes } from '@shared/constants';
import * as pages from './pages';

const routes: Routes = [
  {
    path: AppRoutes.UNAUTHORIZED,
    component: pages.UnauthorizedComponent
  },
  {
    path: AppRoutes.NOT_FOUND,
    component: pages.NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ErrorsRoutingModule {}
