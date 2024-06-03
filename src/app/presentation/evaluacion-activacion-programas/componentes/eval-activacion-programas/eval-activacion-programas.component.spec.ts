import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvalActivacionProgramasComponent } from './eval-activacion-programas.component';

describe('EvalActivacionProgramasComponent', () => {
  let component: EvalActivacionProgramasComponent;
  let fixture: ComponentFixture<EvalActivacionProgramasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EvalActivacionProgramasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EvalActivacionProgramasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
