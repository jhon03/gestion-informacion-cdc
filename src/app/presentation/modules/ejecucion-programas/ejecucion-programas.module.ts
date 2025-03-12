import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EjecucionProgramasRoutingModule } from './ejecucion-programas-routing.module';
import { MaterialModule } from '../material/material/material.module';
import { FormsModule } from '@angular/forms';
import { MatCardContent, MatCardModule } from '@angular/material/card';

@NgModule({


  declarations: [],
  imports: [
    CommonModule,
    EjecucionProgramasRoutingModule,
    MaterialModule,
     FormsModule,
     MatCardModule,
     
  ],

})
export class EjecucionProgramasModule { }
