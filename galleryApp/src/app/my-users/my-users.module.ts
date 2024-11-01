import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyUsersPageRoutingModule } from './my-users-routing.module';

import { MyUsersPage } from './my-users.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyUsersPageRoutingModule
  ],
  declarations: [MyUsersPage]
})
export class MyUsersPageModule {}
