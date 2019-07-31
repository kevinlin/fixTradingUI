import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {StrategyPriceLevel} from '../model/strategy-price-level';
import {TradingStrategy} from '../model/trading-strategy';

@Injectable({
  providedIn: 'root'
})
export class StrategyPriceLevelService {

  private strategyPriceLevel = '/api/strategyPriceLevel';

  constructor(private httpClient: HttpClient) {
  }

  public getHistoryPriceLevels(strategy: TradingStrategy, interval: number): Observable<StrategyPriceLevel[]> {
    return this.httpClient.get<StrategyPriceLevel[]>(this.strategyPriceLevel + '/' + strategy.id + '/' + interval);
  }
  public getHistoryPriceLevelsByDateInterval(strategy: TradingStrategy, interval: number, queryStartDate: Date, queryEndDate: Date): Observable<StrategyPriceLevel[]> {
    let strategyPriceLevels: StrategyPriceLevel[];
    let date: Date = queryStartDate;
    strategyPrieLevels = [];
    while(date.getTime() <= queryEndDate.getTime()) {
      strategyPriceLevels = strategyPriceLevels.concat(this.httpClient.get<StrategyPriceLevel[]>(this.strategyPriceLevel + '/' + strategy.id + '/' + interval + '/' + date));
      date.setDate(date.getTime() + 86400000);
    }
    return strategyPriceLevels;
  }
}
