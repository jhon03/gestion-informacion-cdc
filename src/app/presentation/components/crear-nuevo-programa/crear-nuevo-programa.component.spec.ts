import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearNuevoProgramaComponent } from './crear-nuevo-programa.component';

describe('CrearNuevoProgramaComponent', () => {
  let component: CrearNuevoProgramaComponent;
  let fixture: ComponentFixture<CrearNuevoProgramaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearNuevoProgramaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearNuevoProgramaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
