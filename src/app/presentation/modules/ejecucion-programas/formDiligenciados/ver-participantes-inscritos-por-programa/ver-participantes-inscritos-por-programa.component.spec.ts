import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerParticipantesInscritosPorProgramaComponent } from './ver-participantes-inscritos-por-programa.component';

describe('VerParticipantesInscritosPorProgramaComponent', () => {
  let component: VerParticipantesInscritosPorProgramaComponent;
  let fixture: ComponentFixture<VerParticipantesInscritosPorProgramaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerParticipantesInscritosPorProgramaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerParticipantesInscritosPorProgramaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
