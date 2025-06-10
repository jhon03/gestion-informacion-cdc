import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportesCaracterizacionPoblacionalComponent } from './reportes-caracterizacion-poblacional.component';

describe('ReportesCaracterizacionPoblacionalComponent', () => {
  let component: ReportesCaracterizacionPoblacionalComponent;
  let fixture: ComponentFixture<ReportesCaracterizacionPoblacionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportesCaracterizacionPoblacionalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportesCaracterizacionPoblacionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
