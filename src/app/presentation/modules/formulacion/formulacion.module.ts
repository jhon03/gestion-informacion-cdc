import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormulacionRoutingModule } from './formulacion-routing.module';
import { MaterialModule } from '../material/material/material.module';
import {  FormatoRegistroProgramaComponent } from './formato-registro-programa/formato-registro-programa.component';
import { RouterModule } from '@angular/router';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormulacionRoutingModule,
    MaterialModule,
FormatoRegistroProgramaComponent,
RouterModule
  ]
})
export class FormulacionModule { }
