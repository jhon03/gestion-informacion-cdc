import { Component, OnInit } from '@angular/core';
import { NecesidadService } from '../../../../infrastructure/services/RegistroNecesidades/necesidad.service';
import { necesidadRequest } from '../../../../infrastructure/helpers/interfaces/necesidad.interface';
import { FormArray, FormBuilder, FormGroup, FormGroupName, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registrar-necesidades',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './registrar-necesidades.component.html',
  styleUrl: './registrar-necesidades.component.css'
})
export class RegistrarNecesidadesComponent implements OnInit{
  necesidadForm!: FormGroup;
  loading = false;
  mensajeExito = '';
  mostrarResumen = false;
  resumen: any[] = [];

  constructor(private fb: FormBuilder, private necesidadService: NecesidadService) {
    this.necesidadForm = this.fb.group({
      necesidades: this.fb.array([this.crearNecesidad()])
    });
  }

  ngOnInit(): void {}

  get necesidades() {
    return this.necesidadForm.get('necesidades') as FormArray;
  }

  crearNecesidad(): FormGroup {
    return this.fb.group({
      necesidadIdentificada: ['', Validators.required],
      causas: ['', Validators.required],
      impacto: ['', Validators.required],
      poblacionAfectada: ['', Validators.required],
      prioridad: ['', Validators.required],
      recursosNecesarios: ['', Validators.required],
      estrategiasIntervencion: ['', Validators.required],
      indicadoresExito: ['', Validators.required]
    });
  }

  agregarNecesidad(): void {
    this.necesidades.push(this.crearNecesidad());
  }

  eliminarNecesidad(index: number): void {
    if (this.necesidades.length > 1) {
      this.necesidades.removeAt(index);
    }
  }

  previsualizar(): void {
    if (this.necesidadForm.invalid) {
      this.necesidadForm.markAllAsTouched();
      return;
    }

    // Validación adicional por lógica de negocio
    const necesidades = this.necesidadForm.value.necesidades;
    for (let n of necesidades) {
      if (n.prioridad === 'Alta' && (!n.recursosNecesarios || n.recursosNecesarios.trim() === '')) {
        alert('Si la prioridad es Alta, los recursos necesarios no pueden estar vacíos.');
        return;
      }
    }

    this.resumen = necesidades;
    this.mostrarResumen = true;
  }

  cancelarEnvio(): void {
    this.mostrarResumen = false;
  }

  confirmarEnvio(): void {
    const nuevaNecesidad: necesidadRequest = this.necesidadForm.value;
    this.loading = true;

    this.necesidadService.crearRegistroNecesidad(nuevaNecesidad).subscribe({
      next: (resp) => {
        this.loading = false;
        this.mensajeExito = '¡Registro exitoso!';
        this.necesidadForm.reset();
        this.necesidadForm.setControl('necesidades', this.fb.array([this.crearNecesidad()]));
        this.mostrarResumen = false;

        setTimeout(() => {
          this.mensajeExito = '';
        }, 3000);
      },
      error: (err) => {
        console.error('Error al registrar necesidad', err);
        this.loading = false;
      }
    });
  }

  onSubmit(): void {
    this.previsualizar();
  }
}
