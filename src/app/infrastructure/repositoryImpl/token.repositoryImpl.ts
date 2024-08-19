import { Injectable } from "@angular/core";
import { TokenRepository } from "../../domain/repositories/token.repository";
import { TokenService } from "../services/token/token.service";

@Injectable({
    providedIn: 'root'
})
export class TokenRepositoryImpl implements TokenRepository {
    
    constructor(
        private tokenService: TokenService
    ){}

    getToken(): String | null {
        return this.tokenService.obtenerToken();
    }

    removeTokenBrowser(): void {
        this.tokenService.eliminarTokenLs();
    }
    setTokenInBrowser(token: string): void {
        this.tokenService.ponerTokenEnLS(token);
    }
    PutTokenInBrowser(token: string): void {
        this.tokenService.renovarTokenLS(token);
    }
    isTokenExpired(token: string): boolean {
        return this.tokenService.estaExpiradoElToken(token);
    }
    getRolUserByToken(token: string): string {
        return this.tokenService.obtenerRolUsuario(token);    
    }


}
