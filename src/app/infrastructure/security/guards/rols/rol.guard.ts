import { inject} from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map, take } from 'rxjs';
import { mostrar } from '../../../plugins/sweetalert/swal.plugin';
import { UserRepository } from '../../../../domain/repositories/user.repository';
import { userResponse } from '../../../helpers/interfaces/user.interface';

const userRolesPermitidos = [
  //"SUPERUSER",
  "ADMINISTRADOR"
]

export const rolGuard: CanActivateFn = (route, state) => {


  const userRepository = inject(UserRepository);
  const router = inject(Router);

  return userRepository.getCurrentUser().pipe(
    take(1), // Desuscribirse automáticamente después de recibir el primer valor
    map(({usuario}: userResponse) => {
      if (userRolesPermitidos.includes(usuario.rol)) {
        return true;
      } else {
        mostrar("No tienes permiso para acceder a esta ruta", 'informacion');
        router.navigateByUrl('/mdl/login');
        return true;
      }
    })
  );
};
