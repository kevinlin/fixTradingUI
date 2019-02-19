import {TestBed} from '@angular/core/testing';

import {StrategyPriceLevelService} from './strategy-price-level.service';

describe('StrategyPriceLevelService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StrategyPriceLevelService = TestBed.get(StrategyPriceLevelService);
    expect(service).toBeTruthy();
  });
});
