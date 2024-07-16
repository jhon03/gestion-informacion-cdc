import { Observable } from "rxjs";
import { RolRespository } from "../../domain/repositories/rol.repository";
import { rolRequest, rolResponse, rolesResponse } from "../helpers/interfaces/rol.interface";
import { RolService } from "../services/rol/rol.service";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class RolRespositoryImpl implements RolRespository {

    constructor(private rolService: RolService){}
    
    create(rol: rolRequest): Observable<rolResponse> {
        return this.rolService.crearRol(rol);
    }
    getListRols(): Observable<rolesResponse> {
        return this.rolService.obtenerRoles();
    }
    getRolById(id: string): Observable<rolResponse> {
        return this.rolService.obtenerRoleById(id);
    }
    
}