import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { TokenRepository } from "../../../../../domain/repositories/token.repository";


export const showLogin: CanActivateFn = (route, state) => {

  const router = inject(Router);
  const tokenRepository = inject(TokenRepository);

  const token = tokenRepository.getToken();
  if(token){
    router.navigateByUrl('/mdl/colaborador/lista');
    return false;
  }

  return true;

  };