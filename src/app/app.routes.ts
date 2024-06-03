

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { from } from 'rxjs';
import { ProgramaListComponent } from './presentation/components/programa/programa-list/programa-list.component';



export const routes: Routes = [


    {
     path: 'formato-registro',
     loadChildren: ()=> import('./presentation/formatos-de-registros/formatos-de-registros.module').then(m => m.FormatosDeRegistrosModule)
    },

    {
        path: 'registro-programa',
        loadChildren: () => import('./presentation/registro-programa/registro-programa-routing.module').then(m => m.RegistroProgramaRoutingModule)

    },
    { path: '', redirectTo: '/formato-registro', pathMatch: 'full'},
    { path: '**', redirectTo: '/formato-registro'},

    {path: '', redirectTo: '/registro-programa',  pathMatch: 'full'},
    {path: '**', redirectTo: '/registro-programa'},

    { path: 'programas', component: ProgramaListComponent},
    {path: '', redirectTo: '/progrmas', pathMatch: 'full'},

];

@NgModule ({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutes {}