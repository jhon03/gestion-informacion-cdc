import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProgramaListComponent } from '../components/programa/programa-list/programa-list.component';

const routes: Routes = [

  {
    path: 'login',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },

  {
    path: 'programa',
    loadChildren: () => import('./programa/programa.module').then(m => m.ProgramaModule)
  },
  {
    path: 'colaborador',
    loadChildren: () => import('./colaborador/colaborador.module').then(m => m.ColaboradorModule)
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModuleRoutingModule { }
