import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutes } from './app.routes';
import { AppComponent } from './app.component';

// Importar tus componentes aquí
import { ProgramaListComponent } from './presentation/components/programa/programa-list/programa-list.component';
import { ProgramaRepository } from './domain/repositories/programa.repository';
import { RegistroProgramaModule } from './presentation/registro-programa/registro-programa.module';
import { FormatosDeRegistrosModule } from './presentation/formatos-de-registros/formatos-de-registros.module';
import {MatButtonModule} from '@angular/material/button';
import { RouterModule, RouterOutlet } from '@angular/router';

import { programaRepositoryImpl } from './infrastructure/repositoryImpl/programa.repositoryImpl';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';

import {MatDividerModule} from '@angular/material/divider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { HttpClientModule } from '@angular/common/http';
import { UsuariosModule } from './presentation/modules/usuarios/usuarios.module';
import { CommonModule } from '@angular/common';
@NgModule({
  declarations: [
    AppComponent
    // Otros componentes que necesites declarar
  ],
  imports: [
    BrowserModule,
    AppRoutes,
    MatButtonModule,
    RouterModule,
    FormatosDeRegistrosModule,
    RegistroProgramaModule,
    ProgramaListComponent,
    // Otros módulos que necesites importar
    MatGridListModule,
    MatIconModule,
    MatSlideToggleModule,
    MatDividerModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatInputModule,
    MatButtonToggleModule,
    HttpClientModule,
    UsuariosModule,
    CommonModule
  ],
  providers: [  
    {provide: ProgramaRepository, useClass: programaRepositoryImpl}, provideAnimationsAsync()
  ], 
  bootstrap: [AppComponent]
})
export class AppModule { }
