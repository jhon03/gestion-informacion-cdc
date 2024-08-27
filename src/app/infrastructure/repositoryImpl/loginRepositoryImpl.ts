import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { loginRequest, loginResponse } from "../helpers/interfaces/login.interface";
import { HttpResponse } from "@angular/common/http";
import { LoginRepository } from "../../domain/repositories/login.repository";
import { AuthenticacionService } from "../services/authenticacion/authenticacion.service";

@Injectable({
    providedIn:'root'
})

export class LoginRepositoryImpl implements LoginRepository {

    constructor(
        private authenticacionService: AuthenticacionService
    ){}

    loggout(): void {
        return this.authenticacionService.cerrarSesion();
    }

    isUserLoggin(): Observable<Boolean> {
        return this.authenticacionService.getUserIsLogin();
    }

    login(formLogin: loginRequest): Observable<HttpResponse<loginResponse>> {
        return this.authenticacionService.iniciarSesion(formLogin);
    }

    getUserRole(): string {
        return this.authenticacionService.getUserRole();    
    }

}