import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AutenticacionRoutingModule } from './autenticacion-routing.module';
import { MaterialModule } from '../material/material/material.module';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    AutenticacionRoutingModule, 
    MaterialModule
  ]
})
export class AutenticacionModule { }
