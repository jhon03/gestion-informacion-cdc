import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormatosDeRegistrosRoutingModule } from './formatos-de-registros-routing.module';

import {MatButtonModule} from '@angular/material/button';
import {MatGridListModule} from '@angular/material/grid-list';

import {MatIconModule} from '@angular/material/icon';

import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import {MatDividerModule} from '@angular/material/divider';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';

@NgModule({
  declarations: [
  ],


  imports: [
    CommonModule,
    FormatosDeRegistrosRoutingModule,
    MatButtonModule,
    MatGridListModule,
    MatIconModule,
    MatSlideToggleModule,
    MatDividerModule,
    MatCardModule,
    MatInputModule
   
  ]
  
})
export class FormatosDeRegistrosModule { }
