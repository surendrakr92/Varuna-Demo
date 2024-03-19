import { TestBed } from '@angular/core/testing';

import { EventMasterService } from './event-master.service';

describe('EventMasterService', () => {
  let service: EventMasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventMasterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
