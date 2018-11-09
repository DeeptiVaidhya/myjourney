import { TestBed, inject } from '@angular/core/testing';

import { ProCtcaeService } from './pro-ctcae.service';

describe('ProCtcaeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProCtcaeService]
    });
  });

  it('should be created', inject([ProCtcaeService], (service: ProCtcaeService) => {
    expect(service).toBeTruthy();
  }));
});
