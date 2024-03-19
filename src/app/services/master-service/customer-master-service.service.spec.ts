import { TestBed } from '@angular/core/testing';

import { CustomerMasterServiceService } from './customer-master-service.service';

describe('CustomerMasterServiceService', () => {
  let service: CustomerMasterServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerMasterServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
