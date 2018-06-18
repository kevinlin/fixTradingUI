import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs/index';

import { TradingStrategy } from '../model/trading-strategy';

@Injectable({
  providedIn: 'root'
})
export class TradingStrategyService {

  dataChanged = new Subject<TradingStrategy>();

  constructor(private httpClient: HttpClient) {
  }

  private tradingStrategyUrl = '/api/tradingStrategy';

  public findAll(): Observable<TradingStrategy[]> {
    return this.httpClient.get<TradingStrategy[]>(this.tradingStrategyUrl + '/all');
  }

  public findById(id: number): Observable<TradingStrategy> {
    return this.httpClient.get<TradingStrategy>(this.tradingStrategyUrl + '/' + id);
  }

  public delete(tradingStrategy: TradingStrategy): Observable<TradingStrategy> {
    const observable = this.httpClient.delete<TradingStrategy>(this.tradingStrategyUrl + '/' + tradingStrategy.id);
    observable.subscribe(result => {
      this.dataChanged.next(tradingStrategy);
    });
    return observable;
  }

  public save(tradingStrategy: TradingStrategy): Observable<TradingStrategy> {
    const observable = this.httpClient.post<TradingStrategy>(this.tradingStrategyUrl, tradingStrategy);
    observable.subscribe(result => {
      this.dataChanged.next(tradingStrategy);
    });
    return observable;
  }

}
