import { Component } from '@angular/core';
import { AsistenciasService } from '../../../infrastructure/services/asistencias.service';
import { AsistenciaActividad } from '../../../infrastructure/helpers/interfaces/asistencia.interface';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
@Component({
  selector: 'app-administrar-asistencias',
  standalone: true,
  imports: [ FormsModule, CommonModule, MatInputModule, MatFormFieldModule, MatCardModule],
  templateUrl: './administrar-asistencias.component.html',
  styleUrl: './administrar-asistencias.component.css'
})
export class AdministrarAsistenciasComponent {

  nombreActividad: string = ' ';
  resultado: AsistenciaActividad | null = null;
  error: string | null = null;

  constructor(private asistenciaService: AsistenciasService){}
  
normalizarTexto(texto: string): string {
  return texto
    .normalize("NFD")                         // separar acentos
    .replace(/[\u0300-\u036f]/g, "")         // eliminar acentos
    .toLowerCase()                           // minúsculas
    .replace(/\s+/g, "");                    // quitar espacios
}


  buscarAsistencias() {


    if (!this.nombreActividad.trim()) {
      this.error = 'Debe ingresar un nombre de actividad.';
      this.resultado = null;
      return;
    }

    const nombreNormalizado = this.normalizarTexto(this.nombreActividad);
    this.asistenciaService.obtenerTotalAsistenciasPorActividad(nombreNormalizado).subscribe({
      next: (res) => {
        this.resultado = res;
        this.error = null;
      },
      error: () => {
        this.error = ' No se encontraron asistencias para esta actividad';
        this.resultado = null;
      }
    });
  }

}
