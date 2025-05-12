import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarNecesidadesComponent } from './registrar-necesidades.component';

describe('RegistrarNecesidadesComponent', () => {
  let component: RegistrarNecesidadesComponent;
  let fixture: ComponentFixture<RegistrarNecesidadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrarNecesidadesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrarNecesidadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
