import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ColaboradorRoutingModule } from './colaborador-routing.module';
import { ListColaboradoresComponent } from './list-colaboradores/list-colaboradores.component';
import { CrearColaboradorComponent } from './crear-colaborador/crear-colaborador.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material/material.module';
import { LayoutComponent } from './layout/layout.component';


@NgModule({
  declarations: [
    LayoutComponent,
    ListColaboradoresComponent,
    CrearColaboradorComponent,
  ],
  imports: [
    CommonModule,
    ColaboradorRoutingModule,
    ReactiveFormsModule,
    MaterialModule 
  ]
})
export class ColaboradorModule { }
