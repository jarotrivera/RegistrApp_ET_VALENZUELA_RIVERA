import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginestudiantePage } from './loginestudiante.page';

const routes: Routes = [
  {
    path: '',
    component: LoginestudiantePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginestudiantePageRoutingModule {}
