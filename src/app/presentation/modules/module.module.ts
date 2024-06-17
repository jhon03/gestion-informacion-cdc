import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModuleRoutingModule } from './module-routing.module';
import { ColaboradorComponent } from './colaborador/colaborador.component';
import { ProgramaComponent } from './programa/programa.component';


@NgModule({
  declarations: [
    ColaboradorComponent,
    ProgramaComponent
  ],
  imports: [
    CommonModule,
    ModuleRoutingModule
  ]
})
export class ModuleModule { }
