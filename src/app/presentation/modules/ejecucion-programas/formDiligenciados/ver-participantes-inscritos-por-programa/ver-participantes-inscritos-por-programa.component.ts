import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../../material/material/material.module';
import { responseFormPrograma } from '../../../../../infrastructure/helpers/interfaces/formPrograma.interface';
import { ActivatedRoute } from '@angular/router';
import { FormularioProgramaService } from '../../../../../infrastructure/services/formPrograma/formulario-programa.service';
@Component({
  selector: 'app-ver-participantes-inscritos-por-programa',
  standalone: true,
  imports: [
    MaterialModule
  ],
  templateUrl: './ver-participantes-inscritos-por-programa.component.html',
  styleUrl: './ver-participantes-inscritos-por-programa.component.css'
})
export class VerParticipantesInscritosPorProgramaComponent implements OnInit{

  formulario!: responseFormPrograma['formulario'];  // Tipo de la respuesta
  errorMessage: string | null = null; // Para mostrar el error si ocurre

  constructor(
    private route: ActivatedRoute,
    private formularioService: FormularioProgramaService
  ) { }

  ngOnInit(): void {
    const idPrograma = this.route.snapshot.paramMap.get('idPrograma');
    const idFormulario = this.route.snapshot.paramMap.get('idFormulario');

    if (idPrograma && idFormulario) {
      this.formularioService.obtenerFormulario(idPrograma, idFormulario).subscribe(
        (data: responseFormPrograma) => {
          this.formulario = data.formulario;
        },
        (error) => {
          this.errorMessage = 'Error al obtener el formulario. Intente de nuevo más tarde.';
          console.error('Error en el componente al obtener el formulario:', error);
        }
      );
    }
  }

}
