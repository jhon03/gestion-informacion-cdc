import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubirFormatosComponent } from './subir-formatos.component';

describe('SubirFormatosComponent', () => {
  let component: SubirFormatosComponent;
  let fixture: ComponentFixture<SubirFormatosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubirFormatosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubirFormatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
