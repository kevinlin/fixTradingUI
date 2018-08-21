import { inject, TestBed } from '@angular/core/testing';

import { TradingExecutionService } from './trading-execution.service';

describe('TradingExecutionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TradingExecutionService]
    });
  });

  it('should be created', inject([TradingExecutionService], (service: TradingExecutionService) => {
    expect(service).toBeTruthy();
  }));
});
