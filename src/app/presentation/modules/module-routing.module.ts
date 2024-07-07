import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProgramaComponent } from './programa/programa.component';

const routes: Routes = [
  {
    path: '*',
    component: ProgramaComponent
  },
  {
    path:'colaborador',
    component: ProgramaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModuleRoutingModule { }
