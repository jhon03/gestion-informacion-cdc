import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormatoRegistroProgramaComponent } from './formato-registro-programa.component';

describe('FormatoRegistroProgramaComponent', () => {
  let component: FormatoRegistroProgramaComponent;
  let fixture: ComponentFixture<FormatoRegistroProgramaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormatoRegistroProgramaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormatoRegistroProgramaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
