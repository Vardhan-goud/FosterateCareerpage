import { TestBed } from '@angular/core/testing';

import { AllcontactsdataService } from './allcontactsdata.service';

describe('AllcontactsdataService', () => {
  let service: AllcontactsdataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AllcontactsdataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
