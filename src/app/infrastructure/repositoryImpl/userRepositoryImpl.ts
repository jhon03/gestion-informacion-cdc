import { Observable } from "rxjs";
import { UserRepository } from "../../domain/repositories/userRepository";
import { UserDto } from "../dto/user.dto";
import { usersResponse, userResponse } from "../helpers/interfaces/user.interface";
import { UserService } from "../services/user/user.service";
import { Injectable } from "@angular/core";


@Injectable({
    providedIn: 'root'
})

export class userRepositoryImpl implements UserRepository{

constructor(private userService: UserService){}

getUsers(): Observable<usersResponse>{
    return this.userService.buscarUsers();
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