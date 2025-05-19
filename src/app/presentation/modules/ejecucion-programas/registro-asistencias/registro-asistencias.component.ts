import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AsistenciasService } from '../../../../infrastructure/services/asistencias.service';
import { AsistenciaRequest } from '../../../../infrastructure/helpers/interfaces/asistencia.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registro-asistencias',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './registro-asistencias.component.html',
  styleUrl: './registro-asistencias.component.css'
})
export class RegistroAsistenciasComponent {
  asistenciaForm!: FormGroup;
  mensaje: string | null = null;
  error: string | null = null;

  constructor(private fb: FormBuilder, private asistenciaService: AsistenciasService){

   this.asistenciaForm = this.fb.group({
      numeroDocumento: ['', Validators.required],
      nombreActividad: ['', Validators.required]
    });
  }

  registrar() {
    this.mensaje = null;
    this.error = null;

    if (this.asistenciaForm.invalid) return;

    const data: AsistenciaRequest = this.asistenciaForm.value;

    const token = localStorage.getItem('token'); // Asume que el token está guardado allí

    if (!token) {
      this.error = 'Token no disponible. Inicie sesión.';
      return;
    }

    this.asistenciaService.registrarAsistencia(data, token).subscribe({
      next: (resp) => {
        this.mensaje = resp.message;
        this.asistenciaForm.reset();
      },
      error: (err) => {
        this.error = err.error?.message || 'Error al registrar asistencia';
      }
    });
  }
}
