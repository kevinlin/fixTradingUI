import { inject, TestBed } from '@angular/core/testing';

import { TradingStrategyService } from './trading-strategy.service';

describe('TradingStrategyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TradingStrategyService]
    });
  });

  it('should be created', inject([TradingStrategyService], (service: TradingStrategyService) => {
    expect(service).toBeTruthy();
  }));
});
