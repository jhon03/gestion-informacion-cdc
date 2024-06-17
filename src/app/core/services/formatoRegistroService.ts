import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { RecordFormat } from '../models/formatoRegistroModel'; 

@Injectable({
  providedIn: 'root'
})
export class RecordFormatService {
  private recordFormats: RecordFormat[] = [];

  constructor() {}

  getRecordFormats(): Observable<RecordFormat[]> {
    return of(this.recordFormats);
  }

  getRecordFormatById(id: string): Observable<RecordFormat> {
    const recordFormat = this.recordFormats.find(format => format.idFormato === id);
    return of(recordFormat);
  }

  createRecordFormat(recordFormat: RecordFormat): Observable<RecordFormat> {
    try {
      this.validarFormato(recordFormat.);
      recordFormat.formato = this.convertirClavesAMayusculas(recordFormat.formato);
      this.recordFormats.push(recordFormat);
      return of(recordFormat);
    } catch (error) {
      return throwError(() => new Error(error.message));
    }
  }

  updateRecordFormat(id: string, updatedFormat: RecordFormat): Observable<RecordFormat> {
    try {
      this.validarFormato(updatedFormat.formato);
      updatedFormat.formato = this.convertirClavesAMayusculas(updatedFormat.formato);
      const index = this.recordFormats.findIndex(format => format.idFormato === id);
      if (index !== -1) {
        this.recordFormats[index] = updatedFormat;
        return of(updatedFormat);
      }
      return throwError(() => new Error('Record format not found'));
    } catch (error) {
      return throwError(() => new Error(error.message));
    }
  }

  deleteRecordFormat(id: string): Observable<void> {
    this.recordFormats = this.recordFormats.filter(format => format.idFormato !== id);
    return of();
  }

  // Helper functions
  private validarFormato(formato: any): void {
    for (let [key, value] of Object.entries(formato)) {
      if (key.includes(' ')) {
        throw new Error(`El campo ${key} no puede tener espacios`);
      }
      if (value !== 'string' && value !== 'number') {
        throw new Error(`Tipo de dato inválido, el campo ${key} debe ser de tipo string o number`);
      }
    }
  }

  private convertirClavesAMayusculas(obj: any): any {
    const nuevoObjeto: any = {};
    for (let [key, value] of Object.entries(obj)) {
      nuevoObjeto[key.toUpperCase()] = value;
    }
    return nuevoObjeto;
  }

  private convertirValuesToUpperCase(obj: any): any {
    const nuevoObjeto: any = {};
    for (let [key, value] of Object.entries(obj)) {
      if (typeof value === 'string' || value instanceof String) {
        nuevoObjeto[key] = value.toUpperCase();
      } else {
        nuevoObjeto[key] = value;
      }
    }
    return nuevoObjeto;
  }

  private compararDatosPersonaWithFormato(formato: any, datos: any = {}): void {
    try {
      for (let [key, tipo] of Object.entries(formato)) {
        if (!(key in datos)) {
          throw new Error(`El campo ${key} es requerido`);
        }
        if (typeof datos[key] !== tipo) {
          throw new Error(`El campo ${key} debe ser de tipo ${tipo}`);
        }
      }

      // Verificar que no hay campos adicionales no permitidos
      for (let key in datos) {
        if (!(key in formato)) {
          throw new Error(`El campo ${key} no está permitido`);
        }
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
