import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { plainToClass } from 'class-transformer';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { TradingStrategy } from '../model/trading-strategy';

@Injectable({
  providedIn: 'root'
})
export class TradingStrategyService {

  public dataSubject = new BehaviorSubject<TradingStrategy[]>([]);

  constructor(private httpClient: HttpClient) {
    this.refreshData();
  }

  private tradingStrategyUrl = '/api/tradingStrategy';

  private refreshData() {
    this.findAll().subscribe(result => {
      this.dataSubject.next(result.map(ts => plainToClass(TradingStrategy, ts)));
    });
  }

  public findAll(): Observable<TradingStrategy[]> {
    return this.httpClient.get<TradingStrategy[]>(this.tradingStrategyUrl + '/all');
  }

  public delete(tradingStrategy: TradingStrategy): Observable<TradingStrategy> {
    return this.httpClient.delete<TradingStrategy>(this.tradingStrategyUrl + '/' + tradingStrategy.id).pipe(
      tap(data => {
        this.refreshData();
      })
    );
  }

  public save(tradingStrategy: TradingStrategy): Observable<TradingStrategy> {
    return this.httpClient.post<TradingStrategy>(this.tradingStrategyUrl, tradingStrategy).pipe(
      tap(data => this.refreshData()),
      map(data => plainToClass(TradingStrategy, data))
    );
  }

}
