import { Inject, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenRepository } from '../../../domain/repositories/token.repository';

export const authGuard: CanActivateFn = (route, state) => {


  const tokenRepository = inject(TokenRepository);
  const router = inject(Router);

  const isLoggin = tokenRepository.getToken();
  if(isLoggin){
    return true;
  }
  console.log(isLoggin);
  router.navigateByUrl('/mdl/login');
  return false;
};
