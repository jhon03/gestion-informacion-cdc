import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormRegistroParticipantesComponent } from './form-registro-participantes.component';

describe('FormRegistroParticipantesComponent', () => {
  let component: FormRegistroParticipantesComponent;
  let fixture: ComponentFixture<FormRegistroParticipantesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormRegistroParticipantesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormRegistroParticipantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
