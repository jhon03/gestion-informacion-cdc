import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EjecucionProgramasRoutingModule } from './ejecucion-programas-routing.module';
import { MaterialModule } from '../material/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardContent, MatCardModule } from '@angular/material/card';
import { MatSelect } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    EjecucionProgramasRoutingModule,
    MaterialModule,
     FormsModule,
     MatCardModule,
     FormsModule,
     MatSelect,
     MatTableModule,
     MatIconModule,
     MatButtonModule,
     ReactiveFormsModule

  ],

})
export class EjecucionProgramasModule { }
