import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionarColaboradoresComponent } from './gestionar-colaboradores.component';

describe('GestionarColaboradoresComponent', () => {
  let component: GestionarColaboradoresComponent;
  let fixture: ComponentFixture<GestionarColaboradoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionarColaboradoresComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionarColaboradoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
