import { Component } from '@angular/core';

import { FormatosService } from '../../../../infrastructure/services/formatos/formatos.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MaterialModule } from '../../material/material/material.module';
import { RespondeFormatoRequest } from '../../../../infrastructure/helpers/interfaces/formatos.interface';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-subir-formatos',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './subir-formatos.component.html',
  styleUrl: './subir-formatos.component.css'
})
export class SubirFormatosComponent {
  selectedFile: File | null = null;
  archivoSubido: boolean = false;
  constructor(private formatosService: FormatosService, private snackBar: MatSnackBar) {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  uploadFile() {
    if (!this.selectedFile) {
      Swal.fire('Error', 'Por favor selecciona un archivo', 'error');
      return;
    }

    this.formatosService.subirArchivo(this.selectedFile).subscribe({
      next: (response) => {
        this.archivoSubido = true;
        Swal.fire('Éxito', 'Archivo subido exitosamente', 'success');
      },
      error: (err) => {
        Swal.fire('Error', 'No se pudo subir el archivo', 'error');
      }
});

  }
}
