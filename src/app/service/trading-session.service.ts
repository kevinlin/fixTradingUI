import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {TradingSession} from '../model/trading-session';

@Injectable({
  providedIn: 'root'
})
export class TradingSessionService {

  constructor(private httpClient: HttpClient) {
  }

  private tradingSessionUrl = '/api/tradingSession';

  public getTradingSession(): Observable<TradingSession> {
    return this.httpClient.get<TradingSession>(this.tradingSessionUrl);
  }

  public startTradingSession(tradingSession: TradingSession): Observable<TradingSession> {
    return this.httpClient.post<TradingSession>(this.tradingSessionUrl, tradingSession);
  }

  public stopTradingSession(): Observable<TradingSession> {
    return this.httpClient.get<TradingSession>(this.tradingSessionUrl + '/stop');
  }

}
