import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroParticipantesComponent } from './registro-participantes.component';

describe('RegistroParticipantesComponent', () => {
  let component: RegistroParticipantesComponent;
  let fixture: ComponentFixture<RegistroParticipantesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroParticipantesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroParticipantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
