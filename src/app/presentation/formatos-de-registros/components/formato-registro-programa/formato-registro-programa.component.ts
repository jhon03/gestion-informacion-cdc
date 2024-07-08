import { Component, OnInit, inject, model, signal } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { FormatoService } from '../../../../infrastructure/services/formato/formato.service';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';

import { MatButtonToggleModule } from '@angular/material/button-toggle';

export interface DialogData {
  nombre: string;
}

export interface FormDilog {
  nombre2: string;
}
@Component({
  selector: 'app-formato-registro-programa',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatGridListModule,
    MatInputModule,
    MatDialogModule,
    FormsModule,
    MatFormFieldModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './formato-registro-programa.component.html',
  styleUrl: './formato-registro-programa.component.css',
})
export class FormatoRegistroProgramaComponent implements OnInit {
  nombreFormato: string | null = null;

  constructor(
    public dialog: MatDialog,
    private formatoService: FormatoService
  ) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAsignarNombre, {
      width: '250px',
      data: { nombre: this.nombreFormato },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.nombreFormato = result;

        this.formatoService
          .guardarFormato(this.nombreFormato!)
          .subscribe(() => {
            console.log('Formato guardado exitosamente');
          });
      }
    });
  }

  onNoClick(): void {
    const dialogRef = this.dialog.open(FormAddColumna, {
      width: '250px',
      data: { nombre: this.nombreFormato },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.nombreFormato = result;

        this.formatoService
          .guardarFormato(this.nombreFormato!)
          .subscribe(() => {
            console.log('Formato guardado exitosamente');
          });
      }
    });
  }

  nombre() {
    return this.nombreFormato;
  }
  ngOnInit(): void {}
}

@Component({
  selector: 'dialog-asignar-nombre',
  templateUrl: 'dialog-asignar-nombre.html',
  standalone: true,

  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
})
export class DialogAsignarNombre {
  readonly dialogRef = inject(MatDialogRef<DialogAsignarNombre>);
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);
  readonly nombre = model(this.data.nombre);

  onNoClick(): void {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'formaddcolumna',
  templateUrl: 'formaddcolumna.html',
  standalone: true,

  imports: [
    MatButtonToggleModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatIconModule,
  ],
})
export class FormAddColumna {
  readonly dialogRef = inject(MatDialogRef<FormAddColumna>);
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);
  readonly nombre = model(this.data.nombre);

  onNoClick(): void {
    this.dialogRef.close();
  }
}
