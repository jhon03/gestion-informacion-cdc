import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrarAsistenciasComponent } from './administrar-asistencias.component';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

describe('VerTotalAsistenciasComponent', () => {
  let component: AdministrarAsistenciasComponent;
  let fixture: ComponentFixture<AdministrarAsistenciasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdministrarAsistenciasComponent],
      imports: [
        FormsModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AdministrarAsistenciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create el componente correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('should show error when input is empty', () => {
    component.nombreActividad = '';
    component.buscarAsistencias();
    expect(component.error).toBe('Debe ingresar un nombre de actividad.');
  });
});
