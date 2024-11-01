import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyGalleriesPageRoutingModule } from './my-galleries-routing.module';

import { MyGalleriesPage } from './my-galleries.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyGalleriesPageRoutingModule
  ],
  declarations: [MyGalleriesPage]
})
export class MyGalleriesPageModule {}
