import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListProgramasComponent } from './list-programas/list-programas.component';

const routes: Routes = [

  { path: '*', component: ListProgramasComponent},

  {path: 'listprogramas', component: ListProgramasComponent, pathMatch: 'full'}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProgramaRoutingModule { 



}
