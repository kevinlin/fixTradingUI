import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {TradingParameters} from '../model/trading-parameters';

@Injectable({
  providedIn: 'root'
})
export class ParametersService {

  constructor(private httpClient: HttpClient) {
  }

  private parametersUrl = '/api/parameters';

  public getParameters(): Observable<TradingParameters> {
    return this.httpClient.get<TradingParameters>(this.parametersUrl);
  }

  public updateParameters(tradingParameters: TradingParameters): Observable<TradingParameters> {
    return this.httpClient.put<TradingParameters>(this.parametersUrl, tradingParameters);
  }

}
