import { Observable } from "rxjs";

import { rolesResponse, rolRequest, rolResponse } from "../../infrastructure/helpers/interfaces/rol.interface";


export abstract class RolRespository {

    abstract create(rol: rolRequest): Observable<rolResponse>;
    abstract getListRols(): Observable<rolesResponse>;
    abstract getRolById(id: string): Observable<rolResponse>;
    
    abstract getRolsNotPagination(): Observable<rolesResponse>;


}