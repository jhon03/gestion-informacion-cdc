import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ColaboradorComponent } from './colaborador/colaborador.component';
import { ProgramaListComponent } from '../components/programa/programa-list/programa-list.component';

const routes: Routes = [


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
