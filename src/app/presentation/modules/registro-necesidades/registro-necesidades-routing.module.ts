import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrarNecesidadesComponent } from './registrar-necesidades/registrar-necesidades.component';
import { VerNecesidadesRegistradasComponent } from './ver-necesidades-registradas/ver-necesidades-registradas.component';

const routes: Routes = [

  {
    path: 'registrar-necesidades',
    component: RegistrarNecesidadesComponent
  },
  {
    path: 'ver-necesidades',
    component: VerNecesidadesRegistradasComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistroNecesidadesRoutingModule { }
