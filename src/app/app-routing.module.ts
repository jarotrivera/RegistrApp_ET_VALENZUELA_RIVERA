import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { IngresadoGuard } from './ingresado.guard';
import { NoIngresadoGuard } from './no-ingresado.guard';



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
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule),
    canActivate: [NoIngresadoGuard]
  },
  {
    path: 'logindocente',
    loadChildren: () => import('./logindocente/logindocente.module').then( m => m.LogindocentePageModule),
    canActivate: [NoIngresadoGuard]
    
  },
  {
    path: 'loginestudiante',
    loadChildren: () => import('./loginestudiante/loginestudiante.module').then( m => m.LoginestudiantePageModule),
    canActivate: [NoIngresadoGuard]
  },
  {
    path: 'inicio-alumno',
    loadChildren: () => import('./inicio-alumno/inicio-alumno.module').then( m => m.InicioAlumnoPageModule),
    canActivate: [IngresadoGuard]
  },
  {
    path: 'inicio-docente',
    loadChildren: () => import('./inicio-docente/inicio-docente.module').then( m => m.InicioDocentePageModule),
    canActivate: [IngresadoGuard]
  },
  {
    path: 'codigoqr',
    loadChildren: () => import('./codigoqr/codigoqr.module').then( m => m.CodigoqrPageModule),
    canActivate: [IngresadoGuard]
  },
  {
    path: 'faq',
    loadChildren: () => import('./faq/faq.module').then( m => m.FAQPageModule)
  },
  {
    path: 'registro-alumno',
    loadChildren: () => import('./registro-alumno/registro-alumno.module').then( m => m.RegistroAlumnoPageModule),
    canActivate: [NoIngresadoGuard]
  },
  {
    path: 'registro-docente',
    loadChildren: () => import('./registro-docente/registro-docente.module').then( m => m.RegistroDocentePageModule),
    canActivate: [NoIngresadoGuard]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
