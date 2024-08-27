import { HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { loginRequest, loginResponse } from "../../infrastructure/helpers/interfaces/login.interface";


@Injectable({
    providedIn: 'root'
})
export abstract class LoginRepository {

   abstract login(formLogin: loginRequest): Observable<HttpResponse<loginResponse> >;
   abstract loggout(): void;
   abstract isUserLoggin(): Observable<Boolean>;
   abstract getUserRole(): string;
}