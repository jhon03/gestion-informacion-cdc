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
import { RouterModule} from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { programaRepositoryImpl } from './infrastructure/repositoryImpl/programa.repositoryImpl';
import { ColaboradorRepository } from './domain/repositories/colaborador.repository';
import { ColaboradorRepositoryImpl } from './infrastructure/repositoryImpl/colaborador.repositoryImpl';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { TipoIdentificacionRepository } from './domain/repositories/tipoIdentificacion.repositories';
import { TidentificacionRepositoryImp } from './infrastructure/repositoryImpl/tipoIdentificacion.repositoryImpl';
import { RolRespository } from './domain/repositories/rol.repository';
import { RolRespositoryImpl } from './infrastructure/repositoryImpl/rol.repositoryImpl';
import { UserRepository } from './domain/repositories/user.repository';
import { userRepositoryImpl } from './infrastructure/repositoryImpl/user.repositoryImpl';
import { TokenRepository } from './domain/repositories/token.repository';
import { TokenRepositoryImpl } from './infrastructure/repositoryImpl/token.repositoryImpl';
import { authInterceptor } from './infrastructure/security/interceptor/auth.interceptor';
import { LoginRepository } from './domain/repositories/login.repository';
import { LoginRepositoryImpl } from './infrastructure/repositoryImpl/login.RepositoryImpl';


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
    ProgramaListComponent,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    // Otros módulos que necesites importar
  ],
  providers: [  
    { provide: RolRespository,               useClass: RolRespositoryImpl},
    { provide: UserRepository,               useClass: userRepositoryImpl},
    { provide: LoginRepository,              useClass: LoginRepositoryImpl},
    { provide: TokenRepository,              useClass: TokenRepositoryImpl},
    { provide: ProgramaRepository,           useClass: programaRepositoryImpl},
    { provide: ColaboradorRepository,        useClass: ColaboradorRepositoryImpl},
    { provide: TipoIdentificacionRepository, useClass: TidentificacionRepositoryImp},
    provideHttpClient(
      withInterceptors([authInterceptor])
    ),  //se llama al providehttp en vez del httpclientmodule
    provideAnimationsAsync()
  ], 
  bootstrap: [AppComponent]
})
export class AppModule { }
