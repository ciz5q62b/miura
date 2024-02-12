import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'block',
    loadChildren: () => import('./block/block.module').then( m => m.BlockPageModule)
  },
  {
    path: 'shu-telingu',
    loadChildren: () => import('./shu-telingu/shu-telingu.module').then( m => m.ShuTelinguPageModule)
  },
  {
    path: 'shu-telingu2',
    loadChildren: () => import('./shu-telingu2/shu-telingu2.module').then( m => m.ShuTelingu2PageModule)
  },
  {
    path: 'block2',
    loadChildren: () => import('./block2/block2.module').then( m => m.Block2PageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
