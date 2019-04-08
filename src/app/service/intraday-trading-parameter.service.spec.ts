import {TestBed} from '@angular/core/testing';

import {IntradayTradingParameterService} from './intraday-trading-parameter.service';

describe('IntradayTradingParameterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IntradayTradingParameterService = TestBed.get(IntradayTradingParameterService);
    expect(service).toBeTruthy();
  });
});
