import { TestBed } from '@angular/core/testing';

import { SlotsApiService } from './slots-api.service';

describe('SlotsApiService', () => {
  let service: SlotsApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SlotsApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
