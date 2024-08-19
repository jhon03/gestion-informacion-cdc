import Swal from 'sweetalert2';

interface IconosOptions {
    correcto: 'success',
    error: 'error',
    advertencia: 'warning',
    informacion: 'info',
    pregunta: 'question'
  }
  
  // Crear un mapa para asociar los nombres de icono con los valores de SweetAlert
  const iconos: IconosOptions = {
    correcto: 'success',
    error: 'error',
    advertencia: 'warning',
    informacion: 'info',
    pregunta: 'question'
  };


export const mostrar = (mensage: string, tipo: keyof IconosOptions) => {
    
    Swal.fire({
        title: mensage,
        icon: iconos[tipo]
    });
};

export const mostrarVariosTextos = (titulo: string, texto: string, tipoIcono: keyof IconosOptions) => {
    Swal.fire({
        title: titulo,
        text: texto,
        icon: iconos[tipoIcono]
    });
}