import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ColaboradorService } from '../../../../infrastructure/services/colaborador/colaborador.service';
import { HttpResponse } from '@angular/common/http';
import { colaboradoresResponse, colaboradorResponse, colaboradoresPageResponse } from '../../../../infrastructure/helpers/interfaces/colaborador.interface';

import { ColaboradorDto } from '../../../../infrastructure/dto/colaborador.dto';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../modules/material/material/material.module';
import { User } from '../../../../domain/models/user.models';
import { Colaborador } from '../../../../infrastructure/helpers/interfaces/colaborador.interface';
import Swal  from 'sweetalert2';
@Component({
  selector: 'app-gestionar-colaboradores',
  standalone: true,
  imports: [CommonModule, MaterialModule
  ],
  templateUrl: './gestionar-colaboradores.component.html',
  styleUrl: './gestionar-colaboradores.component.css'
})
export class GestionarColaboradoresComponent implements OnInit{

 colaboradores: Colaborador[] = [];
 errorMessage: string = '';
page = 1; // Inicializar la página actual
pageSize = 5; // Establecer el tamaño de página
totalColaboradores: number = 0;
loading = false;
totalPaginas: number = 4; // Variable para el total de páginas


  constructor(private router: Router,
    private colaboradorService: ColaboradorService
  ){}
  ngOnInit(): void {
   this.obtenerColaboradores();
  }
 // método para obtener los colaboradores
 obtenerColaboradores(): void {
  this.loading = true;
  this.colaboradorService.obtenerColaboradoresConRol(this.page, this.pageSize).subscribe({
    next: (response: colaboradoresPageResponse) => {
      if(response && response.colaboradores.length > 0){
        this.colaboradores = response.colaboradores.map(res => ({
          idColaborador: res.idColaborador,
          nombreColaborador: res.nombreColaborador,
          nombreUsuario: res.nombreUsuario,
          rol: res.rol,
          estado: res.estado,
           // Convertir fechaCreacion usando una función de formato personalizada
           fechaCreacion: this.formatearFecha(res.fechaCreacion),
         // Manejar 'Sin modificaciones' para fechaModificacion
         fechaModificacion: res.fechaModificacion === "Sin modificaciones" ? res.fechaModificacion : this.formatearFecha(res.fechaModificacion)
      }));
      this.totalColaboradores = response.total;
      this.totalPaginas = response.totalPaginas;
}else {
  this.errorMessage = 'no se encontraron colaboradores';
}
console.log('Respuesta recibida del servidor:', response);

console.log('Colaboradores recibidos:', this.colaboradores); // Verifica la respuesta
       this.loading = false;
},
    error: (error) => {
      console.error('Error al obtener colaboradores', error);
      this.errorMessage = 'Error al cargar colaboradores. Intenta más tarde.';
      this.loading = false;
    }
  });
 }
/// Función para formatear las fechas en un formato manejable-not implementado
formatearFecha(fecha: string): string {
  try {
    const opciones: Intl.DateTimeFormatOptions = {
      year: 'numeric', month: '2-digit', day: '2-digit',
      hour: '2-digit', minute: '2-digit', second: '2-digit',
      hour12: false
    };
    // Intenta crear un objeto Date usando la fecha original
    const fechaFormateada = new Date(fecha).toLocaleString('en-GB', opciones);
    return fechaFormateada !== 'Invalid Date' ? fechaFormateada : 'Fecha inválida';
  } catch (error) {
    return 'Fecha inválida';
  }
}
  irACrearColaborador(): void {
  this.router.navigate(['/usuarios/crear-colaborador'])
  }

  irACrearRol(): void {
    this.router.navigate(['/usuarios/roles'])
  }

  //Método para desactivar un colaborador

  desactivarColaborador(idColaborador: string): void {
    this.colaboradorService.desactivarColaborador(idColaborador).subscribe({
      next: (response) => {
        Swal.fire({
          icon: 'success',
          title: 'Colaborador Deshabilitado',
          text: response.msg, // Mensaje de éxito
          confirmButtonText: 'Aceptar'
        });

        console.log(response.msg);
        //actualiza la lista de colaboradores
        this.obtenerColaboradores();
      },
      error: (error) => {
        this.errorMessage = error.error.msg;
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: this.errorMessage,
          confirmButtonText: 'Aceptar'
        });
      }
    })
  }
editarColaborador(colaborador: Colaborador): void{
  this.router.navigate(['/usuarios/actualizar-colaborador', colaborador.idColaborador]);
}


}
