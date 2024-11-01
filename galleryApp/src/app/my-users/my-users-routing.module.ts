import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyUsersPage } from './my-users.page';

const routes: Routes = [
  {
    path: '',
    component: MyUsersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyUsersPageRoutingModule {}
