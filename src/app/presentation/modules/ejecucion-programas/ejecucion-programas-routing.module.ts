import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormRegistroParticipantesComponent } from './form-registro-participantes/form-registro-participantes.component';
import { RegistroParticipantesComponent } from './RegistroParticipantes/registro-participantes/registro-participantes.component';
import { VerParticipantesInscritosPorProgramaComponent } from './formDiligenciados/ver-participantes-inscritos-por-programa/ver-participantes-inscritos-por-programa.component';
import { SubirFormatosComponent } from './subir-formatos/subir-formatos.component';
import { VerPlaneacionComponent } from './ver-planeacion/ver-planeacion.component';
import { RegistroAsistenciasComponent } from './registro-asistencias/registro-asistencias.component';

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
    path: 'ver-participantes',
    component: VerParticipantesInscritosPorProgramaComponent
  },
  {
    path: 'subir-archivos',
    component: SubirFormatosComponent
  },

  {
    path: 'ver-planeacion',
    component: VerPlaneacionComponent
  },
  {
    path: 'registrar-asistencia',
    component: RegistroAsistenciasComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EjecucionProgramasRoutingModule { }
