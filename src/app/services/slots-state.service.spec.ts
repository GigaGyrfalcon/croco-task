import { TestBed } from '@angular/core/testing';

import { SlotsStateService } from './slots-state.service';

describe('SlotsStateService', () => {
  let service: SlotsStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SlotsStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
