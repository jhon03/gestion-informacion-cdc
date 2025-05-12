import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerNecesidadesRegistradasComponent } from './ver-necesidades-registradas.component';

describe('VerNecesidadesRegistradasComponent', () => {
  let component: VerNecesidadesRegistradasComponent;
  let fixture: ComponentFixture<VerNecesidadesRegistradasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerNecesidadesRegistradasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerNecesidadesRegistradasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
