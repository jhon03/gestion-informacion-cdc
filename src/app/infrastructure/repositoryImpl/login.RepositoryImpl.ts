import { Injectable } from "@angular/core";
import { LoginRepository } from "../../domain/repositories/login.repository";
import { Observable } from "rxjs";
import { loginRequest, loginResponse } from "../helpers/interfaces/login.interface";
import { LoginService } from "../services/login/login.service";
import { HttpResponse } from "@angular/common/http";


@Injectable({
    providedIn: 'root'
}) 

export class LoginRepositoryImpl implements LoginRepository {

    constructor(
        private loginService: LoginService
    ){}

    loggout(): void {
        return this.loginService.cerrarSesion();
    }

    isUserLoggin(): Observable<Boolean> {
        return this.loginService.userLogin;
    }

    login(formLogin: loginRequest): Observable< HttpResponse<loginResponse> > {
        return this.loginService.iniciarSesion(formLogin);
    }

}