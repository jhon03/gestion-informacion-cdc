import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutes } from './app.routes';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Importar tus componentes aquí
import { ProgramaListComponent } from './presentation/components/programa/programa-list/programa-list.component';
import { ProgramaRepository } from './domain/repositories/programa.repository';

import { MatButtonModule } from '@angular/material/button';
import { RouterModule, RouterOutlet } from '@angular/router';
import { programaRepositoryImpl } from './infrastructure/repositoryImpl/programa.repositoryImpl';
import { UsuariosModule } from './presentation/modules/usuarios/usuarios.module';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './presentation/modules/material/material/material.module';
import { TipoIdentificacionRepository } from './domain/repositories/tipoIdentificacion.repositories';
import { TidentificacionRepositoryImp } from './infrastructure/repositoryImpl/tipoIdentificacion.repositoryImpl';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ColaboradorRepository } from './domain/repositories/colaborador.repository';
import { ColaboradorRepositoryImpl } from './infrastructure/repositoryImpl/colaborador.repositoryImpl';
import { provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { PaginaInicioComponent } from './presentation/components/pagina-inicio/pagina-inicio.component';
import { AutenticacionModule } from './presentation/modules/autenticacion/autenticacion.module';
import { LoginComponent } from './presentation/modules/autenticacion/auth/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RolRespository } from './domain/repositories/rol.repository';
import { UserRepository } from './domain/repositories/userRepository';
import { RolRepositoryImpl } from './infrastructure/repositoryImpl/rol.repositoryImpl';
import { userRepositoryImpl } from './infrastructure/repositoryImpl/userRepositoryImpl';
import { LoginRepository } from './domain/repositories/login.repository';
import { LoginRepositoryImpl } from './infrastructure/repositoryImpl/loginRepositoryImpl';
import { TokenRepository } from './domain/repositories/tokenRepository';
import { TokenRepositoryImpl } from './infrastructure/repositoryImpl/tokenRepositoryImpl';
import { authInterceptor } from './infrastructure/seguridad/auth/interceptor/auth.interceptor';
import { DashboardComponent } from './presentation/components/dashboard/dashboard.component';
import { CrearNuevoProgramaComponent } from './presentation/components/crear-nuevo-programa/crear-nuevo-programa.component';
import { FormulacionModule } from './presentation/modules/formulacion/formulacion.module';
//import { HttpClientModule } from '@angular/common/http'; deprecado
import { GestionarColaboradoresComponent } from './presentation/components/usuarios/gestionar-colaboradores/gestionar-colaboradores.component';
import { EjecucionProgramasModule } from './presentation/modules/ejecucion-programas/ejecucion-programas.module';
import { RegistroNecesidadesModule } from './presentation/modules/registro-necesidades/registro-necesidades.module';

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
    ProgramaListComponent,

    // Otros módulos que necesites importar
    CommonModule,
    MaterialModule,
   // HttpClientModule,
   FormsModule,
   ReactiveFormsModule,
   //Módulos de la aplicación
   AutenticacionModule,
   UsuariosModule,
   FormulacionModule,
   EjecucionProgramasModule,
   RegistroNecesidadesModule
  ],


  providers: [
    { provide: ProgramaRepository,                useClass: programaRepositoryImpl },
    { provide: ColaboradorRepository,             useClass: ColaboradorRepositoryImpl },
    { provide: TipoIdentificacionRepository,      useClass: TidentificacionRepositoryImp},
    { provide: RolRespository,                    useClass: RolRepositoryImpl},
    { provide: UserRepository,                    useClass: userRepositoryImpl},
    { provide: LoginRepository,                   useClass: LoginRepositoryImpl},
    { provide: TokenRepository,                   useClass: TokenRepositoryImpl},

    provideHttpClient(
      withInterceptors([authInterceptor])
    ),
    provideAnimationsAsync(),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
