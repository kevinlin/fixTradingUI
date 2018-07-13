import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { plainToClass } from 'class-transformer';
import { BehaviorSubject, Observable } from 'rxjs/index';
import { map, tap } from 'rxjs/operators';

import { TradingOperation } from '../model/trading-operation';

@Injectable({
  providedIn: 'root'
})
export class TradingOperationService {

  public dataSubject = new BehaviorSubject<TradingOperation[]>([]);

  constructor(private httpClient: HttpClient) {
    this.refreshData();
  }

  private tradingExecutionUrl = '/api/tradingOperation';

  private refreshData() {
    this.findAll().subscribe(result => {
      this.dataSubject.next(result.map(to => plainToClass(TradingOperation, to)));
    });
  }

  public findAll(): Observable<TradingOperation[]> {
    return this.httpClient.get<TradingOperation[]>(this.tradingExecutionUrl + '/all');
  }

  public delete(tradingOperation: TradingOperation): Observable<TradingOperation> {
    return this.httpClient.delete<TradingOperation>(this.tradingExecutionUrl + '/' + tradingOperation.id).pipe(
      tap(data => {
        this.refreshData();
      })
    );
  }

  public save(tradingOpearation: TradingOperation): Observable<TradingOperation> {
    return this.httpClient.post<TradingOperation>(this.tradingExecutionUrl, tradingOpearation).pipe(
      tap(data => this.refreshData()),
      map(data => plainToClass(TradingOperation, data))
    );
  }
}
