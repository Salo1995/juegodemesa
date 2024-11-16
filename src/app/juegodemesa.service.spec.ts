import { TestBed } from '@angular/core/testing';

import { juegodemesaService } from './juegodemesa.service';

describe('AngularService', () => {
  let service: juegodemesaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(juegodemesaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
