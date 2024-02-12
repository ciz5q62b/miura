import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShuTelinguPageRoutingModule } from './shu-telingu-routing.module';

import { ShuTelinguPage } from './shu-telingu.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShuTelinguPageRoutingModule
  ],
  declarations: [ShuTelinguPage]
})
export class ShuTelinguPageModule {}
