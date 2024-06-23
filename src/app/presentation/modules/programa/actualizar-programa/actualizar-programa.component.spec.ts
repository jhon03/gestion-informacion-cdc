import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarProgramaComponent } from './actualizar-programa.component';

describe('ActualizarProgramaComponent', () => {
  let component: ActualizarProgramaComponent;
  let fixture: ComponentFixture<ActualizarProgramaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActualizarProgramaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ActualizarProgramaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
