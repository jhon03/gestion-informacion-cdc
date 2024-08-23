import { inject} from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map, take } from 'rxjs';
import { mostrar, mostrarVariosTextos } from '../../../plugins/sweetalert/swal.plugin';
import { UserRepository } from '../../../../domain/repositories/user.repository';
import { userResponse } from '../../../helpers/interfaces/user.interface';
import { TokenRepository } from '../../../../domain/repositories/token.repository';

const userRolesPermitidos = [
  "SUPERUSER",
  "ADMINISTRADOR"
]

export const rolGuard: CanActivateFn = (route, state) => {


  const router = inject(Router);
  const tokenRepository = inject(TokenRepository);

  const token = tokenRepository.getToken();
  if(token){
    const rol = tokenRepository.getRolUserByToken(token); //SUPERUSER O OTRO ROL
    const isPermited = userRolesPermitidos.includes(rol);
    if(isPermited) return true;
    mostrarVariosTextos('Redirigiendo', 'no estas autorizado para ingresar a esta ruta', 'informacion');
    router.navigateByUrl('/mdl/programa/listprogramas')
    return false;
  }
  return false;
};
