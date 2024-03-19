import { TestBed } from '@angular/core/testing';

import { LoadingServicceService } from './loading-servicce.service';

describe('LoadingServicceService', () => {
  let service: LoadingServicceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadingServicceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
