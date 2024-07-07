import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrowserModule } from '@angular/platform-browser';
import { ModuleRoutingModule } from './module-routing.module';

import { ProgramaComponent } from './programa/programa.component';
@NgModule({
  declarations: [

    ProgramaComponent
  ],
  imports: [
    CommonModule,
    ModuleRoutingModule,
    BrowserModule
  ]
})
export class ModuleModule { }
