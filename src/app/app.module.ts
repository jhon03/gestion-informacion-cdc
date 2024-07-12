import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutes } from './app.routes';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Importar tus componentes aquí
import { ProgramaListComponent } from './presentation/components/programa/programa-list/programa-list.component';
import { ProgramaRepository } from './domain/repositories/programa.repository';
import { RegistroProgramaModule } from './presentation/registro-programa/registro-programa.module';
import { FormatosDeRegistrosModule } from './presentation/formatos-de-registros/formatos-de-registros.module';
import {MatButtonModule} from '@angular/material/button';
import { RouterModule, RouterOutlet } from '@angular/router';

import { programaRepositoryImpl } from './infrastructure/repositoryImpl/programa.repositoryImpl';


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
    RegistroProgramaModule,
    ProgramaListComponent
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
    {provide: ProgramaRepository, useClass: programaRepositoryImpl}
  ], 
  bootstrap: [AppComponent]
})
export class AppModule { }
