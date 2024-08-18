import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginRepository } from '../../../domain/repositories/login.repository';
import { LoginRepositoryImpl } from '../../../infrastructure/repositoryImpl/login.RepositoryImpl';


@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule
  ],
  providers :[
    {provide: LoginRepository, useClass: LoginRepositoryImpl}
  ]
})
export class AuthModule { }
