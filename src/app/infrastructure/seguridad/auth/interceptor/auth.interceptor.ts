import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { TokenRepository } from "../../../../domain/repositories/tokenRepository";
import { LoginRepository } from "../../../../domain/repositories/login.repository";
import { mostrar } from "../../../plugins/jwt/sweetalert/swal.plugin";

export const authInterceptor: HttpInterceptorFn = (req, next) => {


    const tokenRepository = inject(TokenRepository);
    const loginRepository = inject(LoginRepository);
  
    const token = tokenRepository.getToken();
    if(token){
      if(tokenRepository.isTokenExpired(token)){
        mostrar('cuenta inactiva, se cierra sesion por su seguridad', 'informacion');
        loginRepository.loggout();
      };
      const reqCloned = req.clone({
        setHeaders: {
          'x-token': `${token}`
        }
      });
      
      return next(reqCloned);
    }
  
    return next(req);
};