import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {PriceLevelDerivative} from '../model/price-level-derivative';
import {TradingStrategy} from '../model/trading-strategy';

@Injectable({
  providedIn: 'root'
})
export class PriceLevelDerivativeService {

  private baseUrl = '/api/priceLevelDerivative';

  constructor(private httpClient: HttpClient) {
  }

  public getPriceLevelDerivativeHistory(strategy: TradingStrategy): Observable<PriceLevelDerivative[]> {
    return this.httpClient.get<PriceLevelDerivative[]>(this.baseUrl + '/' + strategy.id);
  }

}
