import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { plainToClass } from 'class-transformer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { TradingExecution } from '../model/trading-execution';
import { TradingOperation } from '../model/trading-operation';

@Injectable({
  providedIn: 'root'
})
export class TradingExecutionService {

  constructor(private httpClient: HttpClient) {
  }

  private baseUrl = '/api/tradingExecution';

  public findBy(tradingOperation: TradingOperation): Observable<TradingExecution[]> {
    return this.httpClient.get<TradingExecution[]>(this.baseUrl + '/tradingOperation/' + tradingOperation.id).pipe(
      map(executions => plainToClass(TradingExecution, executions))
    );
  }

  public saveAll(executionsToSave: TradingExecution[]): Observable<TradingExecution[]> {
    return this.httpClient.post<TradingExecution[]>(this.baseUrl, executionsToSave).pipe(
      map(executions => plainToClass(TradingExecution, executions))
    );
  }

}
