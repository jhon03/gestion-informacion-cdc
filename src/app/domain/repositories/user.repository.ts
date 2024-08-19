import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { userResponse, usersResponse } from "../../infrastructure/helpers/interfaces/user.interface";
import { UserDto } from "../../infrastructure/dto/user.dto";



@Injectable({
    providedIn: 'root'
})

export abstract class UserRepository {

    abstract getUsers(): Observable<usersResponse>;
    abstract getUserById(idUser: string): Observable<userResponse>;
    abstract activateUser(idUser: string): Observable<userResponse>;
    abstract deleteUser(idUser: string): Observable<userResponse>;
    abstract updateUser(idUser: string, datos: UserDto): Observable<userResponse>;
    abstract getCurrentUser(): Observable<userResponse>;


}