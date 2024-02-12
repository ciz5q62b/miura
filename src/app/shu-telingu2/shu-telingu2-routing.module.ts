import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShuTelingu2Page } from './shu-telingu2.page';

const routes: Routes = [
  {
    path: '',
    component: ShuTelingu2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShuTelingu2PageRoutingModule {}
