import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistroProgramaComponent } from './components/registro-programa/registro-programa.component';

const routes: Routes = [

  { path: '', component: RegistroProgramaComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistroProgramaRoutingModule { }
