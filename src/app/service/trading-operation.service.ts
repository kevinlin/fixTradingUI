import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { plainToClass } from 'class-transformer';
import { BehaviorSubject, Observable } from 'rxjs/index';
import { tap } from 'rxjs/operators';

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

  public findById(id: number): Observable<TradingOperation> {
    return this.httpClient.get<TradingOperation>(this.tradingExecutionUrl + '/' + id);
  }

  public delete(tradingExecution: TradingOperation): Observable<TradingOperation> {
    return this.httpClient.delete<TradingOperation>(this.tradingExecutionUrl + '/' + tradingExecution.id).pipe(
      tap(data => {
        this.refreshData();
      })
    );
  }

  public save(tradingExecution: TradingOperation): Observable<TradingOperation> {
    return this.httpClient.post<TradingOperation>(this.tradingExecutionUrl, tradingExecution).pipe(
      tap(data => {
        this.refreshData();
      })
    );
  }
}
