import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShuTelinguPage } from './shu-telingu.page';

const routes: Routes = [
  {
    path: '',
    component: ShuTelinguPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShuTelinguPageRoutingModule {}
