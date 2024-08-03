import { Injectable } from "@angular/core";
import { RolRespository } from "../../domain/repositories/rol.repository";
import { RolService } from "../services/rol/rol.service";
import { Observable } from "rxjs";
import { rolesResponse, rolResponse } from "../helpers/rol.interface";
@Injectable({
    providedIn: 'root'
})

export class RolRepositoryImpl implements RolRespository {

    constructor (private rolService: RolService){}


     getListRols(): Observable<rolesResponse> {
         return this.rolService.obtenerRoles();
     }
     getRolById(id: string): Observable<rolResponse> {
         return this.rolService.obtenerRoleById(id);
     }
}