import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListProgramasComponent } from './list-programas/list-programas.component';
import { CrearProgramaComponent } from './crear-programa/crear-programa.component';
import { authGuard } from '../../../infrastructure/security/guards/auth.guard';

const routes: Routes = [

  { path: '*', redirectTo: 'listprogramas'},

  {
    path: 'listprogramas', 
    component: ListProgramasComponent, 
    pathMatch: 'full',
    canActivate: [authGuard]
  },
  
  {
    path: 'crear', 
    component: CrearProgramaComponent, 
    pathMatch: 'full',
    canActivate: [authGuard]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProgramaRoutingModule { 



}
