import { Injectable } from "@angular/core";
import { RolRespository } from "../../domain/repositories/rol.repository";
import { RolService } from "../services/rol/rol.service";
import { Observable } from "rxjs";
import { rolesResponse, rolRequest, rolResponse } from "../helpers/interfaces/rol.interface";
@Injectable({
    providedIn: 'root'
})

export class RolRepositoryImpl implements RolRespository {

    constructor (private rolService: RolService){}

    getRolsNotPagination(): Observable<rolesResponse> {
        return this.rolService.obtenerRolesSinPaginacion();
    }


     getListRols(): Observable<rolesResponse> {
         return this.rolService.obtenerRoles();
     }
     getRolById(id: string): Observable<rolResponse> {
         return this.rolService.obtenerRoleById(id);
     }
     create(rol: rolRequest): Observable<rolResponse>{
          return this.rolService.crearRol(rol);
 }}