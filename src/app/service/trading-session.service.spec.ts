import {inject, TestBed} from '@angular/core/testing';

import {TradingSessionService} from './trading-session.service';

describe('TradingSessionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TradingSessionService]
    });
  });

  it('should be created', inject([TradingSessionService], (service: TradingSessionService) => {
    expect(service).toBeTruthy();
  }));
});
