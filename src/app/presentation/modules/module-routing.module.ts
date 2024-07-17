import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProgramaListComponent } from '../components/programa/programa-list/programa-list.component';

const routes: Routes = [


  {
    path: 'programa',
    loadChildren: () => import('./programa/programa.module').then(m => m.ProgramaModule)
  }
  


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModuleRoutingModule { }
