import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EscenarioProblemaComponent } from './escenario-problema.component';

describe('EscenarioProblemaComponent', () => {
  let component: EscenarioProblemaComponent;
  let fixture: ComponentFixture<EscenarioProblemaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EscenarioProblemaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EscenarioProblemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
