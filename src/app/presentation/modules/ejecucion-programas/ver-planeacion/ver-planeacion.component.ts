import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProgramaService } from '../../../../infrastructure/services/programa/programa.service';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { Programa } from '../../../../domain/models/programa.models';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProgramaDto } from '../../../../infrastructure/dto/programa.dto';

@Component({
  selector: 'app-ver-planeacion',
  standalone: true,
  imports: [MatTableModule, MatIconModule, MatButtonModule, CommonModule, MatFormFieldModule, MatSelectModule, FormsModule],
  templateUrl: './ver-planeacion.component.html',
  styleUrl: './ver-planeacion.component.css'
})
export class VerPlaneacionComponent implements OnInit {

//implementación de select
  programas: { idPrograma: string, nombrePrograma: string }[] = [];
idProgramaSeleccionado: string = '';

 nombrePrograma: string = '';
  archivos: {
    name: string;
    webUrl: string;
    downloadUrl: string;
  }[] = [];

  displayedColumns: string[] = ['name', 'tipo', 'acciones'];
  loadingProgramas!: boolean;
   limit: number = 10;



  constructor(
    private route: ActivatedRoute,
    private programaService: ProgramaService, private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
 this.obtenerProgramasSeleccion();

  }
obtenerProgramasSeleccion(page: number = 1, acumulador: ProgramaDto[] = []): void{
   this.loadingProgramas = true;

  this.programaService.obtenerProgramas(page, this.limit).subscribe({
    next: (response) => {
      const nuevosAcumulados = [...acumulador, ...response.programas];

      if (response.programas.length === this.limit) {
        this.obtenerProgramasSeleccion(page + 1, nuevosAcumulados);
      } else {
        this.programas = nuevosAcumulados.map(p => ({
          idPrograma: p.id,
          nombrePrograma: p.nombrePrograma
        }));
        console.log('Todos los programas cargados:', this.programas);
        this.loadingProgramas = false;
      }
    },
    error: (error) => {
      console.error('Error al obtener los programas:', error);
      this.snackBar.open('Error al cargar los programas', 'Cerrar', {
        duration: 3000,
        panelClass: ['error-snackbar']
      });
      this.loadingProgramas = false;
    }
  });

}
 onProgramaSeleccionado(): void {
  console.log('Programa seleccionado:', this.idProgramaSeleccionado);
    if (this.idProgramaSeleccionado) {

// Guardar selección
    //localStorage.setItem('idProgramaSeleccionado', this.idProgramaSeleccionado);


      this.programaService.getArchivosPlaneacion(this.idProgramaSeleccionado).subscribe({
        next: (respuestaPlaneacion) => {
          this.nombrePrograma = respuestaPlaneacion.nombrePrograma;
            this.archivos = Array.isArray(respuestaPlaneacion.archivos) ? respuestaPlaneacion.archivos : [];
        },
        error: (err) => {
          console.error('Error cargando archivos:', err);

          this.archivos = [];
           this.nombrePrograma = '';
        this.snackBar.open('Error al cargar los archivos', 'Cerrar', {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
        }
      });
    } else {
      this.nombrePrograma = '';
    this.archivos = [];
    }
  }
  getTipoArchivo(nombre: string): string {
    const partes = nombre.split('.');

    return partes.length > 1 ? partes.pop()!.toUpperCase() : 'N/A';
  }
}