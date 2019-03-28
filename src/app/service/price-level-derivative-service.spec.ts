import {TestBed} from '@angular/core/testing';

import {PriceLevelDerivativeService} from './price-level-derivative.service';

describe('PriceLevelDerivativeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PriceLevelDerivativeService = TestBed.get(PriceLevelDerivativeService);
    expect(service).toBeTruthy();
  });
});
