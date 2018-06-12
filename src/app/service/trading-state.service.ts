import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { TradingState } from '../model/trading-state';

@Injectable()
export class TradingStateService {

  constructor(private httpClient: HttpClient) {
  }

  private tradingStateUrl = '/api/tradingState';

  public getTradingState(): Observable<TradingState> {
    return this.httpClient.get<TradingState>(this.tradingStateUrl);
  }

  public updateExchangeRate(exchangeRate: number, isShort: boolean): Observable<TradingState> {
    const paramName = isShort ? 'shortExchangeRate' : 'longExchangeRate';
    return this.httpClient.get<TradingState>(this.tradingStateUrl + '/update?' + paramName + '=' + exchangeRate);
  }

  public openShort(size: number): Observable<TradingState> {
    return this.httpClient.get<TradingState>(this.tradingStateUrl + '/openShort?size=' + size);
  }

  public closeShort(size: number): Observable<TradingState> {
    return this.httpClient.get<TradingState>(this.tradingStateUrl + '/closeShort?size=' + size);
  }

  public stopShortLoss(): Observable<TradingState> {
    return this.httpClient.get<TradingState>(this.tradingStateUrl + '/stopShortLoss');
  }

  public openShortAgain(size: number): Observable<TradingState> {
    return this.httpClient.get<TradingState>(this.tradingStateUrl + '/openShortAgain?size=' + size);
  }

  public openLong(size: number): Observable<TradingState> {
    return this.httpClient.get<TradingState>(this.tradingStateUrl + '/openLong?size=' + size);
  }

  public closeLong(size: number): Observable<TradingState> {
    return this.httpClient.get<TradingState>(this.tradingStateUrl + '/closeLong?size=' + size);
  }

  public stopLongLoss(): Observable<TradingState> {
    return this.httpClient.get<TradingState>(this.tradingStateUrl + '/stopLongLoss');
  }

  public openLongAgain(size: number): Observable<TradingState> {
    return this.httpClient.get<TradingState>(this.tradingStateUrl + '/openLongAgain?size=' + size);
  }

}
