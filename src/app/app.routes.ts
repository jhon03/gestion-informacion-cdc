

import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { from } from 'rxjs';
import { ProgramaListComponent } from './presentation/components/programa/programa-list/programa-list.component';
import { DetalleProgramaComponent } from './presentation/detalles-programa/componentes/detalle-programa/detalle-programa.component';
import { PaginaInicioComponent } from './presentation/components/pagina-inicio/pagina-inicio.component';
import { InfoCdcComponent } from './presentation/components/info-cdc/info-cdc.component';
import { EscenarioProblemaComponent } from './presentation/components/escenario-problema/escenario-problema.component';
import { authGuard } from './infrastructure/seguridad/auth/auth.guard';
import { DashboardComponent } from './presentation/components/dashboard/dashboard.component';
import { CrearColaboradorComponent } from './presentation/modules/usuarios/colaborador/crear-colaborador/crear-colaborador.component';
import { CrearNuevoProgramaComponent } from './presentation/components/crear-nuevo-programa/crear-nuevo-programa.component';
import { FormRegistroUsuariosComponent } from './presentation/components/form-registro-usuarios/form-registro-usuarios.component';
import { GestionarColaboradoresComponent } from './presentation/components/usuarios/gestionar-colaboradores/gestionar-colaboradores.component';


export const routes: Routes = [

    {
       path: '',
      component: PaginaInicioComponent
    },

    {
        path: 'home',
        component: PaginaInicioComponent
    },

    {
        path: 'info-cdc',
        component: InfoCdcComponent
    },

    {
        path: 'escenario',
        component: EscenarioProblemaComponent
    },

    {

        path: 'autenticacion',
        loadChildren: () => import('./presentation/modules/autenticacion/autenticacion.module').then(m => m.AutenticacionModule)

        },
        {
            path: 'usuarios',
            loadChildren: () => import('./presentation/modules/usuarios/usuarios.module').then(m => m.UsuariosModule)
        },

        {
            path: 'formulacion',
            loadChildren: () => import('./presentation/modules/formulacion/formulacion.module').then(m => m.FormulacionModule)
        },

    {
        path: 'dashboard',
        component: DashboardComponent, children: [
    ]
    },

    {
         path: 'registro_programa',
         component: CrearNuevoProgramaComponent
    },
    {
         path: 'crear-formulario',
         component: FormRegistroUsuariosComponent
    },

    {
        path: 'gestionar-colaboradores',
        component: GestionarColaboradoresComponent
    },

    {
        path: 'evaluacion-activacion-programa',
        loadChildren: () => import('./presentation/evaluacion-activacion-programas/evaluacion-activacion-programas.module').then(m => m.EvaluacionActivacionProgramasModule)

    },

    {
        path: '**',
        redirectTo: ''
    },

];

@NgModule ({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutes {}