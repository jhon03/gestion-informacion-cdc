import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModuleRoutingModule } from './module-routing.module';
import { ColaboradorComponent } from './colaborador/colaborador.component';
import { ProgramaListComponent } from '../components/programa/programa-list/programa-list.component';
import { ProgramaModule } from './programa/programa.module';
import { ColaboradorModule } from './colaborador/colaborador.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    ModuleRoutingModule,
    ProgramaModule,
    ColaboradorModule
  ]
})
export class ModuleModule { }
