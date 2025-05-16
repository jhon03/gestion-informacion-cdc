import { Component, OnInit } from '@angular/core';
import { NecesidadService } from '../../../../infrastructure/services/RegistroNecesidades/necesidad.service';
import { responseNecesidad } from '../../../../infrastructure/helpers/interfaces/necesidad.interface';
import { CommonModule } from '@angular/common';
import { NecesidadDTO } from '../../../../infrastructure/dto/necesidad.dto';
import { FormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ConfirmDialogComponent } from './confirm-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import * as jwt_decode from 'jwt-decode';
import { AuthenticacionService } from '../../../../infrastructure/services/authenticacion/authenticacion.service';
import { Router, RouterModule } from '@angular/router';
@Component({
  selector: 'app-ver-necesidades-registradas',
  standalone: true,
  imports: [CommonModule, FormsModule, MatSnackBarModule, MatDialogModule, MatButtonModule, RouterModule],
  templateUrl: './ver-necesidades-registradas.component.html',
  styleUrl: './ver-necesidades-registradas.component.css'
})
export class VerNecesidadesRegistradasComponent implements OnInit{

  registros: responseNecesidad['registro'][] = [];
  cargando: boolean = true;
  modoEdicion: { [id: string]: boolean } = {};
  userRole: string = ' ';

  crearProgramaActivo: { [registroId: string]: { [necesidadIndex: number]: boolean}}= {};
  constructor(private necesidadService: NecesidadService, private snackBar: MatSnackBar,
    private dialog: MatDialog, private authService: AuthenticacionService, private router: Router) {}
  ngOnInit(): void {
    this.getUserRole();
    this.obtenerRegistros();
  }
// función para cambiar al modo edición-actualizar
  activarEdicion(idRegistro: string): void {
    this.modoEdicion[idRegistro] = true;
  }

  obtenerRegistros(): void {
    this.necesidadService.obtenerRegistrosNecesidad().subscribe({
      next: (resp) => {
        this.registros = resp.registros;
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error al obtener registros:', err);
        this.cargando = false;
      }
    });
  }
  async eliminarRegistro(id: string): Promise<void> {
    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      data: { mensaje: '¿Está seguro de eliminar este registro?' }
    });

    const confirmado = await confirmDialog.afterClosed().toPromise();
    if (confirmado) {
      this.necesidadService.eliminarRegistro(id).subscribe({
        next: () => {
          this.snackBar.open('Registro eliminado con éxito', 'Cerrar', { duration: 3000 });
          this.registros = this.registros.filter(r => r._id !== id);
        },
        error: (err) => {
          console.error('Error al eliminar el registro:', err);
          this.snackBar.open('Error al eliminar el registro', 'Cerrar', { duration: 3000 });
        }
      });
    }
  }
  async actualizarRegistro(idRegistro: string): Promise<void> {
    const registro = this.registros.find(r => r._id === idRegistro);
    if (!registro) return;

    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      data: { mensaje: '¿Desea guardar los cambios de este registro?' }
    });

    const confirmado = await confirmDialog.afterClosed().toPromise();
    if (confirmado) {
      this.necesidadService.actualizarRegistro(idRegistro, { necesidades: registro.necesidades }).subscribe({
        next: (resp) => {
          this.snackBar.open(resp.message, 'Cerrar', { duration: 3000 });
          this.modoEdicion[idRegistro] = false;
          this.obtenerRegistros();
        },
        error: (err) => {
          console.error('Error al actualizar el registro:', err);
          this.snackBar.open(err.error?.message || 'Ocurrió un error al actualizar', 'Cerrar', { duration: 3000 });
        }
      });
    }
}
getUserRole(): void {
  this.userRole = this.authService.getUserRole();
  console.log('user Role: ', this.userRole);

}


}