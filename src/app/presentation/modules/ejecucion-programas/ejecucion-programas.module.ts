import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EjecucionProgramasRoutingModule } from './ejecucion-programas-routing.module';
import { MaterialModule } from '../material/material/material.module';
import { FormsModule } from '@angular/forms';

@NgModule({


  declarations: [],
  imports: [
    CommonModule,
    EjecucionProgramasRoutingModule,
    MaterialModule,
     FormsModule
  ],
 
})
export class EjecucionProgramasModule { }
