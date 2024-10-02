import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormRegistroParticipantesComponent } from './form-registro-participantes/form-registro-participantes.component';
import { RegistroParticipantesComponent } from './RegistroParticipantes/registro-participantes/registro-participantes.component';
import { VerParticipantesInscritosPorProgramaComponent } from './formDiligenciados/ver-participantes-inscritos-por-programa/ver-participantes-inscritos-por-programa.component';

const routes: Routes = [

  {
    path: 'formulario-registro',
    component: FormRegistroParticipantesComponent
  },
  {
    path: 'registro-participantes',
    component: RegistroParticipantesComponent
  },
  {
    path: 'programa/:idPrograma/formulario/:idFormulario',
    component: VerParticipantesInscritosPorProgramaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EjecucionProgramasRoutingModule { }
