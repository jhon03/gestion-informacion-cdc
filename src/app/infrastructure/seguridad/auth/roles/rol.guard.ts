import { state } from "@angular/animations";
import { inject } from "@angular/core";
import { CanActivateChildFn, Router } from "@angular/router";
import { TokenRepository } from "../../../../domain/repositories/tokenRepository";
import { mostrarVariosTextos } from "../../../plugins/jwt/sweetalert/swal.plugin";


const userRolesPermitidos = [

    "SUPERUSER",
    "ADMINISTRADOR"
]
export const rolGuard: CanActivateChildFn = (route, state) => {

    const router = inject(Router);
    const tokenRepository = inject(TokenRepository);
  
    const token = tokenRepository.getToken();
    if(token){
      const rol = tokenRepository.getRolUserByToken(token); //SUPERUSER O OTRO ROL
      const isPermited = userRolesPermitidos.includes(rol);
      if(isPermited) return true;
      mostrarVariosTextos('Redirigiendo', 'no estas autorizado para ingresar a esta ruta', 'informacion');
     router.navigateByUrl('/autenticacion/login')
      return false;
    }
    return false;
};