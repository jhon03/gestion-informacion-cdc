import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutes } from './app.routes';
import { AppComponent } from './app.component';
import { HttpClient } from '@angular/common/http';
import { ProgramaService } from './domain/services/programa.service';

// Importar tus componentes aquí
import { ProgramaListComponent } from './presentation/components/programa/programa-list/programa-list.component';
import { ProgramaRepository } from './domain/repositories/programa.repository';
import { RegistroProgramaModule } from './presentation/registro-programa/registro-programa.module';
import { FormatosDeRegistrosModule } from './presentation/formatos-de-registros/formatos-de-registros.module';
import {MatButtonModule} from '@angular/material/button';


@NgModule({
  declarations: [
    AppComponent,
    ProgramaListComponent
    // Otros componentes que necesites declarar
  ],
  imports: [
    BrowserModule,
    AppRoutes,
    HttpClient,
    RegistroProgramaModule, 
    FormatosDeRegistrosModule,
    MatButtonModule
    // Otros módulos que necesites importar
  ],
  providers: [ ],
  bootstrap: [AppComponent]
})
export class AppModule { }
