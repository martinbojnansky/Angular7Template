import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsersViewComponent } from './views';

const routes: Routes = [
  {
    path: '',
    component: UsersViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule {}
