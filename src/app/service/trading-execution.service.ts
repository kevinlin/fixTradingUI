import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs/index';
import { tap } from 'rxjs/operators';

import { TradingExecution } from '../model/trading-execution';

@Injectable({
  providedIn: 'root'
})
export class TradingExecutionService {

  public dataSubject = new BehaviorSubject<TradingExecution[]>([]);

  constructor(private httpClient: HttpClient) {
    this.refreshData();
  }

  private tradingExecutionUrl = '/api/tradingExecution';

  private refreshData() {
    this.findAll().subscribe(result => {
      this.dataSubject.next(result);
    });
  }

  public findAll(): Observable<TradingExecution[]> {
    return this.httpClient.get<TradingExecution[]>(this.tradingExecutionUrl + '/all');
  }

  public findById(id: number): Observable<TradingExecution> {
    return this.httpClient.get<TradingExecution>(this.tradingExecutionUrl + '/' + id);
  }

  public delete(tradingExecution: TradingExecution): Observable<TradingExecution> {
    return this.httpClient.delete<TradingExecution>(this.tradingExecutionUrl + '/' + tradingExecution.id).pipe(
      tap(data => {
        this.refreshData();
      })
    );
  }

  public save(tradingExecution: TradingExecution): Observable<TradingExecution> {
    return this.httpClient.post<TradingExecution>(this.tradingExecutionUrl, tradingExecution).pipe(
      tap(data => {
        this.refreshData();
      })
    );
  }
}
