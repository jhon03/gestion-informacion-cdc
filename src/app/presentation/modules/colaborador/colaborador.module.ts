import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ColaboradorRoutingModule } from './colaborador-routing.module';
import { ListColaboradoresComponent } from './list-colaboradores/list-colaboradores.component';
import { CrearColaboradorComponent } from './crear-colaborador/crear-colaborador.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material/material.module';
import { LayoutComponent } from './layout/layout.component';
import { UserRepository } from '../../../domain/repositories/user.repository';
import { userRepositoryImpl } from '../../../infrastructure/repositoryImpl/user.repositoryImpl';


@NgModule({
  declarations: [
    LayoutComponent,
    ListColaboradoresComponent,
    CrearColaboradorComponent
  ],
  imports: [
    CommonModule,
    ColaboradorRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
  providers :[
    {provide: UserRepository, useClass: userRepositoryImpl}
  ]
})
export class ColaboradorModule { }
