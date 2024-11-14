import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarColaboradorComponent } from './actualizar-colaborador.component';

describe('ActualizarColaboradorComponent', () => {
  let component: ActualizarColaboradorComponent;
  let fixture: ComponentFixture<ActualizarColaboradorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActualizarColaboradorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActualizarColaboradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
