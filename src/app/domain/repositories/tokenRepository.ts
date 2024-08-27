import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'

})
export abstract class TokenRepository {

    abstract getToken(): String | null;
    abstract setTokenInBrowser(token: string): void;
    abstract PutTokenInBrowser(token: string): void;
    abstract isTokenExpired(token: String) : boolean; 
    abstract removeTokenBrowser(): void;
    abstract getRolUserByToken(token: String): string;
}