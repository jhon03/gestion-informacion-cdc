import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PanelAdministracionComponent } from './panel-administracion/panel-administracion.component';
import { CrearColaboradorComponent } from './colaborador/crear-colaborador/crear-colaborador.component';

const routes: Routes = [

  {
    path:'administracion-usuarios',
    component: PanelAdministracionComponent
  },

  {
    path: 'crear-colaborador',
    component: CrearColaboradorComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosRoutingModule { }
