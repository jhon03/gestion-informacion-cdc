import { Component, OnInit } from '@angular/core';

import { FormatosService } from '../../../../infrastructure/services/formatos/formatos.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MaterialModule } from '../../material/material/material.module';
import { RespondeFormatoRequest } from '../../../../infrastructure/helpers/interfaces/formatos.interface';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { ProgramaService } from '../../../../infrastructure/services/programa/programa.service';
import { Programa } from '../../../../domain/models/programa.models';

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
 page: number = 1;
  limit: number = 10;
  isSubmitting = false;
  
  programas: Programa[] = []; // Aquí se almacenarán los programas activos
  constructor(private formatosService: FormatosService, private snackBar: MatSnackBar, private programaService: ProgramaService) {}

  ngOnInit() {
    this.ObtenerProgramasActivos();
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }


    ObtenerProgramasActivos(page: number = 1, acumulador: Programa[] = []): void {
   this.programaService.obtenerProgramas(page, this.limit).subscribe({
      next: (response)=> {
        const programasActivos = response.programas.filter(p => p.estado === 'ACTIVO');
         const nuevosAcumulados = [...acumulador, ...programasActivos];

         if (response.programas.length === this.limit) {
           this.ObtenerProgramasActivos(page + 1, nuevosAcumulados);
         } else {
           this.programas = nuevosAcumulados;
           console.log('Programas activos cargados:', this.programas);
         }
       },
       error: (error) => {
         console.error('Error al obtener los programas:', error);
         this.snackBar.open('Error al cargar los programas', 'Cerrar', {
           duration: 3000,
           panelClass: ['error-snackbar']
         });
       }
     });
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
