import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProgramaRoutingModule } from './programa-routing.module';
import { ListProgramasComponent } from './list-programas/list-programas.component';
import { ActivateProgramaComponent } from './activate-programa/activate-programa.component';
import { DesactivateProgramaComponent } from './desactivate-programa/desactivate-programa.component';
import { FindProgramaByIdComponent } from './find-programa-by-id/find-programa-by-id.component';
import { ProgramaenEsperaComponent } from './programaen-espera/programaen-espera.component';
import { ActualizarProgramaComponent } from './actualizar-programa/actualizar-programa.component';
import { CrearProgramaComponent } from './crear-programa/crear-programa.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    ListProgramasComponent,
    ActivateProgramaComponent,
    DesactivateProgramaComponent,
    FindProgramaByIdComponent,
    ProgramaenEsperaComponent,
    ActualizarProgramaComponent,
    CrearProgramaComponent
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    ProgramaRoutingModule,
    MaterialModule,

  ]
})
export class ProgramaModule { }
