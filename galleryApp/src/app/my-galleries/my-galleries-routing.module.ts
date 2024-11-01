import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyGalleriesPage } from './my-galleries.page';

const routes: Routes = [
  {
    path: '',
    component: MyGalleriesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyGalleriesPageRoutingModule {}
