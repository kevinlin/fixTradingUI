import {inject, TestBed} from '@angular/core/testing';

import {TradingStateService} from './trading-state.service';

describe('TradingStateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TradingStateService]
    });
  });

  it('should be created', inject([TradingStateService], (service: TradingStateService) => {
    expect(service).toBeTruthy();
  }));
});
