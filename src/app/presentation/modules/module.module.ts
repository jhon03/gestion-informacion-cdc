import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModuleRoutingModule } from './module-routing.module';
import { ProgramaListComponent } from '../components/programa/programa-list/programa-list.component';
import { ProgramaModule } from './programa/programa.module';
import { ColaboradorModule } from './colaborador/colaborador.module';
import { FormsModule } from '@angular/forms';
import { AuthModule } from './auth/auth.module';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    ModuleRoutingModule,
    ProgramaModule,
    ColaboradorModule,
    AuthModule
  ]
})
export class ModuleModule { }
