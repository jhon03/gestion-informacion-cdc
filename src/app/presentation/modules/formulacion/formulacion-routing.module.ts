import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormatoRegistroPorgramaComponent } from './formato-registro-porgrama/formato-registro-porgrama.component';
import { VisualizarPogramasEnEsperaComponent } from './visualizar-pogramas-en-espera/visualizar-pogramas-en-espera.component';
import { ProgramasActivosComponent } from './programas-activos/programas-activos.component';

const routes: Routes = [


  {
    path: 'registro-programa',
    component: FormatoRegistroPorgramaComponent
  },
  {
    path: 'ver-programas-en-espera',
    component: VisualizarPogramasEnEsperaComponent
  }, 
  {
    path: 'ver-programas-activos',
    component: ProgramasActivosComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormulacionRoutingModule { }
