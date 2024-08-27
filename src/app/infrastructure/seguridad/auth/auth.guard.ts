import { state } from "@angular/animations";
import { inject } from "@angular/core";
import { CanActivateChildFn, Router } from "@angular/router";
import { TokenRepository } from "../../../domain/repositories/tokenRepository";


export const authGuard: CanActivateChildFn = ( route, state)  => {

  const tokenRepository = inject(TokenRepository);
  const router = inject(Router);
  const isLoggin = tokenRepository.getToken();
  
  if(isLoggin){
    return true;
  }
  router.navigateByUrl('/autenticacion/login');
  return false;
}