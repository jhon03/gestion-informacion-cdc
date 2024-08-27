import { Injectable } from "@angular/core";
import { UserRepository } from "../../domain/repositories/user.repository";
import { UserService } from "../services/user/user.service";
import { Observable } from "rxjs";
import { userResponse, usersResponse } from "../helpers/interfaces/user.interface";
import { UserDto } from "../dto/user.dto";


@Injectable({
    providedIn: 'root'
})

export class userRepositoryImpl implements UserRepository {

    constructor(private userService: UserService){}

    getUsers(page: number): Observable<usersResponse>{
        return this.userService.buscarUsers(page);
    };
    getUserById(idUser: string): Observable<userResponse>{
        return this.userService.buscarUserById(idUser);
    };
    activateUser(idUser: string): Observable<userResponse>{
        return this.userService.activarUser(idUser);
    };
    deleteUser(idUser: string): Observable<userResponse>{
        return this.userService.desactivarUser(idUser);
    };
    updateUser(idUser: string, datos: UserDto): Observable<userResponse>{
        return this.userService.actualizarUser(idUser, datos);
    };
    getCurrentUser(): Observable<userResponse> {
        return this.userService.obtenerUsuarioActual();
    }



}