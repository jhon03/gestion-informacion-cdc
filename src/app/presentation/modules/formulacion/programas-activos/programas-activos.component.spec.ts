import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramasActivosComponent } from './programas-activos.component';

describe('ProgramasActivosComponent', () => {
  let component: ProgramasActivosComponent;
  let fixture: ComponentFixture<ProgramasActivosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgramasActivosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProgramasActivosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
