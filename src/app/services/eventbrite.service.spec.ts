import { TestBed } from '@angular/core/testing';

import { EventbriteService } from './eventbrite.service';

describe('EventbriteService', () => {
  let service: EventbriteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventbriteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
