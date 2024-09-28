import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormatoRegistroPorgramaComponent } from './formato-registro-porgrama.component';

describe('FormatoRegistroPorgramaComponent', () => {
  let component: FormatoRegistroPorgramaComponent;
  let fixture: ComponentFixture<FormatoRegistroPorgramaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormatoRegistroPorgramaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormatoRegistroPorgramaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
