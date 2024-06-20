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
import { HttpClientModule } from '@angular/common/http';
import { programaRepositoryImpl } from './infrastructure/repositoryImpl/programa.repositoryImpl';


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
    HttpClientModule,
    FormatosDeRegistrosModule,
    RegistroProgramaModule,
    ProgramaListComponent
    // Otros módulos que necesites importar
  ],
  providers: [  
    {provide: ProgramaRepository, useClass: programaRepositoryImpl}
  ], 
  bootstrap: [AppComponent]
})
export class AppModule { }
