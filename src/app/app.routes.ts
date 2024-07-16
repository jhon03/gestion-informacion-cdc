

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { from } from 'rxjs';
import { ProgramaListComponent } from './presentation/components/programa/programa-list/programa-list.component';
import { DetalleProgramaComponent } from './presentation/detalles-programa/componentes/detalle-programa/detalle-programa.component';



export const routes: Routes = [


    {
        path: 'formato-registro',
        loadChildren: ()=> import('./presentation/formatos-de-registros/formatos-de-registros.module').then(m => m.FormatosDeRegistrosModule)
    },

    {
        path: 'registro-programa',
        loadChildren: () => import('./presentation/registro-programa/registro-programa.module').then(m => m.RegistroProgramaModule)

    },

    {
        path: 'evaluacion-activacion-programa',
        loadChildren: () => import('./presentation/evaluacion-activacion-programas/evaluacion-activacion-programas.module').then(m => m.EvaluacionActivacionProgramasModule)

    },

    {
        path: 'mdl',
        loadChildren: () => import('./presentation/modules/module.module').then(m => m.ModuleModule)

    },

    {path: '', redirectTo: '/mdl', pathMatch: 'full'},
    {path: '**', redirectTo: '/mdl', pathMatch: 'full'},

];

@NgModule ({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutes {}