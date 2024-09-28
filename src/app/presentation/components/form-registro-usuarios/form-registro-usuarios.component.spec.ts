import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormRegistroUsuariosComponent } from './form-registro-usuarios.component';

describe('FormRegistroUsuariosComponent', () => {
  let component: FormRegistroUsuariosComponent;
  let fixture: ComponentFixture<FormRegistroUsuariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormRegistroUsuariosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormRegistroUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
