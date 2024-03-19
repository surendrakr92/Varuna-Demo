import { TestBed } from '@angular/core/testing';
import { TicketMasterService } from './ticket-master-service';



describe('TicketMasterService', () => {
  let service: TicketMasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TicketMasterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
