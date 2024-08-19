import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListColaboradoresComponent } from './list-colaboradores/list-colaboradores.component';
import { CrearColaboradorComponent } from './crear-colaborador/crear-colaborador.component';
import { LayoutComponent } from './layout/layout.component';
import { authGuard } from '../../../infrastructure/security/guards/auth/auth.guard';
import { rolGuard } from '../../../infrastructure/security/guards/rols/rol.guard';

//http://localhost:4200/mdl/colaborador
const routes: Routes = [

  {
    path: '',
    component: LayoutComponent,  //componenete padre del resto
    children: [
      { path: 'lista', component: ListColaboradoresComponent, pathMatch: 'full'},
      { path: 'crear', component: CrearColaboradorComponent, pathMatch: 'full'},
      { path: '**', redirectTo: 'lista'},
    ],
     canActivate: [authGuard, rolGuard]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ColaboradorRoutingModule { }
