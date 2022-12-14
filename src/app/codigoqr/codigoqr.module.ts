import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CodigoqrPageRoutingModule } from './codigoqr-routing.module';

import { CodigoqrPage } from './codigoqr.page';

import {QRCodeModule} from 'angularx-qrcode';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QRCodeModule,
    CodigoqrPageRoutingModule
  ],
  declarations: [CodigoqrPage]
})
export class CodigoqrPageModule {}
