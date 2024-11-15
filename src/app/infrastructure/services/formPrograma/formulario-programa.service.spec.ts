import { TestBed } from '@angular/core/testing';

import { FormularioProgramaService } from './formulario-programa.service';

describe('FormularioProgramaService', () => {
  let service: FormularioProgramaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormularioProgramaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
