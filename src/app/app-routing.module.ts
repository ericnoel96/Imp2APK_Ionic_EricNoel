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
    path: 'departamentos',
    loadChildren: () => import('./pages/departamentos/departamentos.module').then( m => m.DepartamentosPageModule)
  },
  {
    path: 'departamento/:id',
    loadChildren: () => import('./pages/departamento/departamento.module').then( m => m.DepartamentoPageModule)
  },
  {
    path: 'geolocalizacion',
    loadChildren: () => import('./pages/geolocalizacion/geolocalizacion.module').then( m => m.GeolocalizacionPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
