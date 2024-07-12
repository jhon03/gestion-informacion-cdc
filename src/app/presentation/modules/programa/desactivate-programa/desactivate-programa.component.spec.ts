import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesactivateProgramaComponent } from './desactivate-programa.component';

describe('DesactivateProgramaComponent', () => {
  let component: DesactivateProgramaComponent;
  let fixture: ComponentFixture<DesactivateProgramaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DesactivateProgramaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DesactivateProgramaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
