import { state } from "@angular/animations";
import { inject } from "@angular/core";
import { CanActivate, CanActivateFn, Router } from "@angular/router";
import { TokenRepository } from "../../../../domain/repositories/tokenRepository";

export const showLogin: CanActivateFn = (route, state) => {

    const router = inject(Router);
    const tokenRepository = inject(TokenRepository);
  
    const token = tokenRepository.getToken();
    if(token){
     router.navigateByUrl('/autenticacion/login');
      return false;
    }
  
    return true;

}