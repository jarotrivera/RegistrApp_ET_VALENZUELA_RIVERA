import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LogindocentePageRoutingModule } from './logindocente-routing.module';

import { LogindocentePage } from './logindocente.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    LogindocentePageRoutingModule
  ],
  declarations: [LogindocentePage]
})
export class LogindocentePageModule {}
