import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyArtistsPage } from './my-artists.page';

const routes: Routes = [
  {
    path: '',
    component: MyArtistsPage
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyArtistsPageRoutingModule {}
