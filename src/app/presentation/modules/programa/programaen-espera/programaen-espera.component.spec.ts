import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramaenEsperaComponent } from './programaen-espera.component';

describe('ProgramaenEsperaComponent', () => {
  let component: ProgramaenEsperaComponent;
  let fixture: ComponentFixture<ProgramaenEsperaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgramaenEsperaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProgramaenEsperaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
