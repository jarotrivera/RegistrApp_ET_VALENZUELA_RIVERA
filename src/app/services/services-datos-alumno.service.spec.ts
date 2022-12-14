import { TestBed } from '@angular/core/testing';

import { ServicesDatosAlumnoService } from './services-datos-alumno.service';

describe('ServicesDatosAlumnoService', () => {
  let service: ServicesDatosAlumnoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicesDatosAlumnoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
