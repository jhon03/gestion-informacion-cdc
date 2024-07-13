import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutes } from './app.routes';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Importar tus componentes aquí
import { ProgramaListComponent } from './presentation/components/programa/programa-list/programa-list.component';
import { ProgramaRepository } from './domain/repositories/programa.repository';

import { FormatosDeRegistrosModule } from './presentation/formatos-de-registros/formatos-de-registros.module';
import {MatButtonModule} from '@angular/material/button';
import { RouterModule, RouterOutlet } from '@angular/router';

import { programaRepositoryImpl } from './infrastructure/repositoryImpl/programa.repositoryImpl';
import { UsuariosModule } from './presentation/modules/usuarios/usuarios.module';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './presentation/modules/material/material/material.module';

@NgModule({
  declarations: [
    AppComponent
    // Otros componentes que necesites declarar
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutes,
    MatButtonModule,
    RouterModule,
    FormatosDeRegistrosModule,
    
    ProgramaListComponent,
    // Otros módulos que necesites importar
    HttpClientModule,
    UsuariosModule,
    CommonModule,
    MaterialModule
    
  ],
  providers: [  
    {provide: ProgramaRepository, useClass: programaRepositoryImpl}
  ], 
  bootstrap: [AppComponent]
})
export class AppModule { }
