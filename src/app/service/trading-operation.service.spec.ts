import { inject, TestBed } from '@angular/core/testing';

import { TradingOperationService } from './trading-operation.service';

describe('TradingOperationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TradingOperationService]
    });
  });

  it('should be created', inject([TradingOperationService], (service: TradingOperationService) => {
    expect(service).toBeTruthy();
  }));
});
