import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalAsistentesPorActividadesComponent } from './total-asistentes-por-actividades.component';

describe('TotalAsistentesPorActividadesComponent', () => {
  let component: TotalAsistentesPorActividadesComponent;
  let fixture: ComponentFixture<TotalAsistentesPorActividadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TotalAsistentesPorActividadesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TotalAsistentesPorActividadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
