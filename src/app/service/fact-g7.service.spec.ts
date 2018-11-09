import { TestBed, inject } from '@angular/core/testing';

import { FactG7Service } from './fact-g7.service';

describe('FactG7Service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FactG7Service]
    });
  });

  it('should be created', inject([FactG7Service], (service: FactG7Service) => {
    expect(service).toBeTruthy();
  }));
});
