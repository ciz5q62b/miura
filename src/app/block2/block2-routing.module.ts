import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Block2Page } from './block2.page';

const routes: Routes = [
  {
    path: '',
    component: Block2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Block2PageRoutingModule {}
