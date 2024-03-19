import { TestBed } from '@angular/core/testing';

import { ProfilesSharedService } from './profiles-shared.service';

describe('ProfilesSharedService', () => {
  let service: ProfilesSharedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfilesSharedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
