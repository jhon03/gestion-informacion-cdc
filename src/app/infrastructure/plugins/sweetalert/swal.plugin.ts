import Swal from 'sweetalert2';

export const mostrar = (mensage: string) => {
    Swal.fire(mensage);
}