import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroProgramaComponent } from './registro-programa.component';

describe('RegistroProgramaComponent', () => {
  let component: RegistroProgramaComponent;
  let fixture: ComponentFixture<RegistroProgramaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroProgramaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegistroProgramaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
