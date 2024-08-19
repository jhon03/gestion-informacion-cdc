import { Injectable } from "@angular/core";
import { loginRequest, loginResponse } from "../../infrastructure/helpers/interfaces/login.interface";
import { Observable } from "rxjs";
import { HttpResponse } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
 })

 export abstract class LoginRepository {

    abstract login(formLogin: loginRequest): Observable< HttpResponse<loginResponse> >;
    abstract loggout(): void;
    abstract isUserLoggin(): Observable<Boolean>;
    abstract getUserRole(): string;
    
 }