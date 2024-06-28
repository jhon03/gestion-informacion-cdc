import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListColaboradoresComponent } from './list-colaboradores/list-colaboradores.component';

const routes: Routes = [

  { path: 'list-colaboradores', component: ListColaboradoresComponent, pathMatch: 'full'}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ColaboradorRoutingModule { }
