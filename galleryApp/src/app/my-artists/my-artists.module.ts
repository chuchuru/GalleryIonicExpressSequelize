import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MyArtistsPageRoutingModule } from './my-artists-routing.module';
import { MyArtistsPage } from './my-artists.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    MyArtistsPageRoutingModule
  ],
  declarations: [MyArtistsPage]
})
export class MyArtistsPageModule {}
