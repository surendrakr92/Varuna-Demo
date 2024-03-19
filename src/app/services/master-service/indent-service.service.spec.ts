import { TestBed } from '@angular/core/testing';

import { IndentServiceService } from './indent-service.service';

describe('IndentServiceService', () => {
  let service: IndentServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IndentServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
