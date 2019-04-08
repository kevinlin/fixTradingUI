import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {plainToClass} from 'class-transformer';
import {BehaviorSubject, Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';

import {IntradayTradingParameter} from '../model/intraday-trading-parameter';

@Injectable({
  providedIn: 'root'
})
export class IntradayTradingParameterService {

  public dataSubject = new BehaviorSubject<IntradayTradingParameter[]>([]);

  private baseUrl = '/api/intradayTradingParameter';

  constructor(private httpClient: HttpClient) {
    this.refreshData();
  }

  public refreshData() {
    this.findAll().subscribe(result => {
      this.dataSubject.next(result);
    });
  }

  public findAll(): Observable<IntradayTradingParameter[]> {
    return this.httpClient.get<IntradayTradingParameter[]>(this.baseUrl + '/');
  }

  public save(parameter: IntradayTradingParameter): Observable<IntradayTradingParameter> {
    return this.httpClient.post<IntradayTradingParameter>(this.baseUrl, parameter).pipe(
      tap(() => this.refreshData()),
      map(data => plainToClass(IntradayTradingParameter, data))
    );
  }

  public delete(parameter: IntradayTradingParameter): Observable<IntradayTradingParameter> {
    return this.httpClient.delete<IntradayTradingParameter>(this.baseUrl + '/' + parameter.id).pipe(
      tap(() => this.refreshData())
    );
  }

}
