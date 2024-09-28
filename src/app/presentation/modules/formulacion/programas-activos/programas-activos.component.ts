import { Component, OnInit } from '@angular/core';
import { ProgramaService } from '../../../../infrastructure/services/programa/programa.service';
import Swal from 'sweetalert2';
import { ProgramaDto } from '../../../../infrastructure/dto/programa.dto';
import { MatTableDataSource } from '@angular/material/table';
import { MaterialModule } from '../../material/material/material.module';
@Component({
  selector: 'app-programas-activos',
  standalone: true,
  imports: [
    MaterialModule
  ],
  templateUrl: './programas-activos.component.html',
  styleUrl: './programas-activos.component.css'
})
export class ProgramasActivosComponent implements OnInit{

  displayedColumns: string[] = ['nombrePrograma', 'estado', 'informacion', 'fechaCreacion', 'nombreColaboradorResponsable'];
  dataSource: MatTableDataSource<ProgramaDto> = new MatTableDataSource();
  objectoKeys = Object.keys

  programas: ProgramaDto[] = [];
  page = 1;
  pageSize = 10;
  totalPages: number = 0;

constructor( private programaService: ProgramaService, 
  ){}


  ngOnInit(): void {
    this.obtenerProgramasActivos(this.page);
  }
  obtenerProgramasActivos(page: number): void {
    this.programaService.obtenerProgramas(page, this.pageSize).subscribe({
      next: (res) => {
        this.programas = res.programas || [];
        this.dataSource.data = this.programas;  // Se asigna la data a la MatTableDataSource
        const paginaInfo = res.pagina || '';
        const totalPages = parseInt(paginaInfo.split('de')[1].trim(), 10);
        this.totalPages = totalPages;

        if( res.tokenAccessRenovado){
          sessionStorage.setItem('tokenAcesso', res.tokenAccessRenovado);
        }
        const msg = res.msg || '';
        Swal.fire('Informacion', msg, 'info');
      },

      error: (err) => {
        Swal.fire('Error', 'No se pudieron obtener los programas', 'error');
        console.error(err);
      },
    });
  }
  // Navegación de la paginación
  cambiarPagina(nuevaPagina: number): void {
    if (nuevaPagina > 0 && nuevaPagina <= this.totalPages) {
      this.page = nuevaPagina;
      this.obtenerProgramasActivos(this.page);
    } else {
      Swal.fire('Aviso', 'No hay más páginas disponibles', 'info');
    }

  }

}
