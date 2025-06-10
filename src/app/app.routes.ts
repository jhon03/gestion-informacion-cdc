

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
import { AdministrarAsistenciasComponent } from './presentation/components/administrar-asistencias/administrar-asistencias.component';
import { TotalAsistentesPorActividadesComponent } from './presentation/components/total-asistentes-por-actividades/total-asistentes-por-actividades.component';
import { ReportesCaracterizacionPoblacionalComponent } from './presentation/components/reportes-caracterizacion-poblacional/reportes-caracterizacion-poblacional.component';


export const routes: Routes = [
{
        path: 'dashboard',
        component: DashboardComponent,

        children: [
    {
        path: 'consultar-asistencias',
        component: AdministrarAsistenciasComponent
    },

    {
        path: 'total-asistentes-por-actividad',
        component: TotalAsistentesPorActividadesComponent
    },
     {
         path: 'crear-formulario',
         component: FormRegistroUsuariosComponent
    },
    {
         path: 'registro_programa',
         component: CrearNuevoProgramaComponent
    },

    {
        path: 'gestionar-colaboradores',
        component: GestionarColaboradoresComponent
    },
    {
        path: 'reportes/caracterizacion',
        component: ReportesCaracterizacionPoblacionalComponent
    },
      {
            path: 'iniciacion',
            loadChildren: () => import('./presentation/modules/registro-necesidades/registro-necesidades.module').then(m => m.RegistroNecesidadesModule)
        },

        {
            path: 'formulacion',
            loadChildren: () => import('./presentation/modules/formulacion/formulacion.module').then(m => m.FormulacionModule)
        },
        {
            path: 'ejecuccion',
            loadChildren: () => import('./presentation/modules/ejecucion-programas/ejecucion-programas.module').then(m => m.EjecucionProgramasModule)
        },
         {
            path: 'usuarios',
            loadChildren: () => import('./presentation/modules/usuarios/usuarios.module').then(m => m.UsuariosModule)
        },

    {
        path: '**',
        redirectTo: ''
    },
    ]
},


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
        path: '**',
        redirectTo: ''
    },

];

@NgModule ({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutes {}