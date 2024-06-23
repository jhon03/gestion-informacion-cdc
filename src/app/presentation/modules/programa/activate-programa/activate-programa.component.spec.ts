import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivateProgramaComponent } from './activate-programa.component';

describe('ActivateProgramaComponent', () => {
  let component: ActivateProgramaComponent;
  let fixture: ComponentFixture<ActivateProgramaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActivateProgramaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ActivateProgramaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
