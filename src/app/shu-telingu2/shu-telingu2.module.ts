import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShuTelingu2PageRoutingModule } from './shu-telingu2-routing.module';

import { ShuTelingu2Page } from './shu-telingu2.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShuTelingu2PageRoutingModule
  ],
  declarations: [ShuTelingu2Page]
})
export class ShuTelingu2PageModule {}
