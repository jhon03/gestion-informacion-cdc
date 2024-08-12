

import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { from } from 'rxjs';
import { ProgramaListComponent } from './presentation/components/programa/programa-list/programa-list.component';
import { DetalleProgramaComponent } from './presentation/detalles-programa/componentes/detalle-programa/detalle-programa.component';
import { PaginaInicioComponent } from './presentation/components/pagina-inicio/pagina-inicio.component';
import { InfoCdcComponent } from './presentation/components/info-cdc/info-cdc.component';
import { EscenarioProblemaComponent } from './presentation/components/escenario-problema/escenario-problema.component';



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
        path: 'usuarios',
        loadChildren: () => import('./presentation/modules/usuarios/usuarios.module').then(m => m.UsuariosModule)
    },
    
    {
        path: 'formato-registro',
        loadChildren: ()=> import('./presentation/formatos-de-registros/formatos-de-registros.module').then(m => m.FormatosDeRegistrosModule)
    },

    {
        path: 'evaluacion-activacion-programa',
        loadChildren: () => import('./presentation/evaluacion-activacion-programas/evaluacion-activacion-programas.module').then(m => m.EvaluacionActivacionProgramasModule)

    },


    { path: 'detalles-programa', 
    component: DetalleProgramaComponent
    },
    
    { path: 'programas',
        
     component: ProgramaListComponent
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