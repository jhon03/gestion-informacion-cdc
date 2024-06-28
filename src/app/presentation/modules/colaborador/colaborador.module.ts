import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ColaboradorRoutingModule } from './colaborador-routing.module';
import { ListColaboradoresComponent } from './list-colaboradores/list-colaboradores.component';


@NgModule({
  declarations: [
    ListColaboradoresComponent
  ],
  imports: [
    CommonModule,
    ColaboradorRoutingModule
  ]
})
export class ColaboradorModule { }
