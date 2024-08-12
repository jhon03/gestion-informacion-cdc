import { Observable } from "rxjs";

import { rolesResponse, rolRequest, rolResponse } from "../../infrastructure/helpers/rol.interface";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export abstract class RolRespository {

    abstract create(rol: rolRequest): Observable<rolResponse>;
    abstract getListRols(): Observable<rolesResponse>;
    abstract getRolById(id: string): Observable<rolResponse>;


}