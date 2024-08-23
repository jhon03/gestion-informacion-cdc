import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearColaboradorComponent } from './colaborador/crear-colaborador/crear-colaborador.component';
import { RolesComponent } from './roles/roles.component';

const routes: Routes = [

  

  {
    path: 'crear-colaborador',
    component: CrearColaboradorComponent
  },

  

  {
    path: 'roles',
    component: RolesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosRoutingModule { }
