import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListProgramasComponent } from './list-programas/list-programas.component';
import { CrearProgramaComponent } from './crear-programa/crear-programa.component';

const routes: Routes = [

  { path: '*', component: ListProgramasComponent},

  {path: 'listprogramas', component: ListProgramasComponent, pathMatch: 'full'},
  
  {path: 'crear', component: CrearProgramaComponent, pathMatch: 'full'}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProgramaRoutingModule { 



}
