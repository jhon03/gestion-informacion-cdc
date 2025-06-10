import { Component, OnInit, ViewChild } from '@angular/core';
import { FormularioProgramaService } from '../../../infrastructure/services/formPrograma/formulario-programa.service';
import { MatTableDataSource } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { ProgramaDto } from '../../../infrastructure/dto/programa.dto';
import { MatSidenav } from '@angular/material/sidenav';
import { Router, RouterModule } from '@angular/router';
import { MaterialModule } from '../../modules/material/material/material.module';
@Component({
  selector: 'app-reportes-caracterizacion-poblacional',
  standalone: true,
  imports: [MaterialModule,
    RouterModule,
    FormsModule
  ],
  templateUrl: './reportes-caracterizacion-poblacional.component.html',
  styleUrl: './reportes-caracterizacion-poblacional.component.css'
})
export class ReportesCaracterizacionPoblacionalComponent implements OnInit{
 nombrePrograma: string = '';
  nombreEdad: Array<{ nombre: string; edad: string }> = [];
nombreEnfermedadParticipantes: Array<{ nombre: string; enfermedad: string }> = [];

nivelEducativoPorEdad: {
  nombre: string;
  edad: string;
  nivelEducativoPadre: string;
  nivelEducativoMadre: string;
}[] = [];
 dataSource: MatTableDataSource<ProgramaDto> = new MatTableDataSource();
@ViewChild('sidenav') sidenav!: MatSidenav;

constructor(private formularioService: FormularioProgramaService, private router: Router){}

ngOnInit(): void {
this.buscarFormularioPrograma();
}
  buscarFormularioPrograma(){
   if (!this.nombrePrograma.trim()) return;

    this.formularioService.obtenerFormPrograma(this.nombrePrograma.trim())
      .subscribe(response => {
            const formulario = response.formulario;

        if (formulario?.valoresDiligenciados) {
          this.nivelEducativoPorEdad = response.formulario.valoresDiligenciados.map(entry => {
            const valores = entry.valores;
            const nombre = valores.find(v => v.nombreCampo === 'Nombre completo del niño(a)')?.valor || '';
            const edadPadre = valores.find(v => v.nombreCampo === 'Edad del padre')?.valor || '';
            const edadMadre = valores.find(v => v.nombreCampo === 'Edad de la madre')?.valor || '';
            const nivelPadre = valores.find(v => v.nombreCampo === 'Nivel educativo del padre')?.valor || '';
            const nivelMadre = valores.find(v => v.nombreCampo === 'Nivel educativo de la madre')?.valor || '';

            return {
              nombre: nombre,
              edad: `Padre: ${edadPadre} / Madre: ${edadMadre}`,
              nivelEducativoPadre: nivelPadre,
              nivelEducativoMadre: nivelMadre
            };
          });
  // Nueva tabla: Nombre del niño y edad
          this.nombreEdad = formulario.valoresDiligenciados.map(entry => {
            const valores = entry.valores;
            const nombre = valores.find(v => v.nombreCampo === 'Nombre completo del niño(a)')?.valor || '';
            const edad = valores.find(v => v.nombreCampo === 'Fecha de nacimiento (o edad)')?.valor || '';

            return { nombre, edad };
          });

  // Tabla 3: Nombre y enfermedad del participante
          this.nombreEnfermedadParticipantes = formulario.valoresDiligenciados.map(entry => {
            const valores = entry.valores;
            const nombre = valores.find(v => v.nombreCampo === 'Nombre del participante')?.valor || '';
            const enfermedad = valores.find(v => v.nombreCampo === '¿Tiene alguna enfermedad?')?.valor || '';
            return { nombre, enfermedad };
          });
        }
      });

    }
}
