import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Importa si tu servicio usa HttpClient

import { JuegodemesaService } from './juegodemesa.service';

describe('JuegodemesaService', () => {
  let service: JuegodemesaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Importa el módulo de HttpClientTesting si es necesario
      providers: [JuegodemesaService],
    });
    service = TestBed.inject(JuegodemesaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
