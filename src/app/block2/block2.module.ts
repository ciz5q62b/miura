import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Block2PageRoutingModule } from './block2-routing.module';

import { Block2Page } from './block2.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Block2PageRoutingModule
  ],
  declarations: [Block2Page]
})
export class Block2PageModule {}
