import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { showLogin } from '../../../infrastructure/security/guards/auth/login/showLogin.guard';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    canActivate: [showLogin]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
