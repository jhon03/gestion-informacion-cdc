import { Component, OnInit } from '@angular/core';

import { FormatosService } from '../../../../infrastructure/services/formatos/formatos.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MaterialModule } from '../../material/material/material.module';
import { RespondeFormatoRequest } from '../../../../infrastructure/helpers/interfaces/formatos.interface';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { ProgramaService } from '../../../../infrastructure/services/programa/programa.service';

@Component({
  selector: 'app-subir-formatos',
  standalone: true,
  imports: [MaterialModule, MatSelectModule, FormsModule],
  templateUrl: './subir-formatos.component.html',
  styleUrl: './subir-formatos.component.css'
})
export class SubirFormatosComponent implements OnInit {
  selectedFile: File | null = null;

  archivoSubido: boolean = false;
  selectedPrograma: string = '';

  programas: any[] = []; // Aquí se almacenarán los programas activos
  constructor(private formatosService: FormatosService, private snackBar: MatSnackBar, private programaService: ProgramaService) {}

  ngOnInit() {
    this.obtenerProgramas();
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  obtenerProgramas() {
    this.programaService.obtenerProgramas(1).subscribe(
      response => {
        this.programas = response.programas; // Ajustar según la estructura del backend
      },
      error => {
        console.error('Error al obtener programas:', error);
      }
    );
  }

  uploadFile() {
    if (!this.selectedFile ||  !this.selectedPrograma) {
      Swal.fire('Error', 'Por favor selecciona un archivo y un programa', 'error');
      return;
    }

    this.formatosService.subirArchivo(this.selectedFile, this.selectedPrograma).subscribe({
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
