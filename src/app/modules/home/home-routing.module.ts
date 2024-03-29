import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeViewComponent } from './views';

const routes: Routes = [
  {
    path: '',
    component: HomeViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {}
