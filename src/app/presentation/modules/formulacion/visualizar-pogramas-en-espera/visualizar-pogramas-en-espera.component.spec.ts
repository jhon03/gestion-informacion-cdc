import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizarPogramasEnEsperaComponent } from './visualizar-pogramas-en-espera.component';

describe('VisualizarPogramasEnEsperaComponent', () => {
  let component: VisualizarPogramasEnEsperaComponent;
  let fixture: ComponentFixture<VisualizarPogramasEnEsperaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisualizarPogramasEnEsperaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisualizarPogramasEnEsperaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
