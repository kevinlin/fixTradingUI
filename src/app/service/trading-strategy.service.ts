import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {plainToClass} from 'class-transformer';
import {BehaviorSubject, Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {MarketData} from '../model/market-data';

import {TradingStrategy} from '../model/trading-strategy';
import {MarketDataService} from './market-data.service';

@Injectable({
  providedIn: 'root'
})
export class TradingStrategyService {

  private data: TradingStrategy[] = [];
  public dataSubject = new BehaviorSubject<TradingStrategy[]>([]);

  constructor(private httpClient: HttpClient, private marketDataService: MarketDataService) {
    this.refreshData();
    this.marketDataService.latestMarketDataSubject.subscribe(marketDataList => {
      const marketDataMap = new Map(marketDataList.map(md => [md.symbol, md] as [string, MarketData]));
      this.data.forEach(strategy => this.calculateLivePrice(strategy, marketDataMap));
      this.dataSubject.next(this.data);
    });
  }

  private tradingStrategyUrl = '/api/tradingStrategy';

  private refreshData() {
    this.findAll().subscribe(result => {
      this.data = result.map(ts => plainToClass(TradingStrategy, ts));
      this.dataSubject.next(this.data);
    });
  }

  private calculateLivePrice(strategy: TradingStrategy, mdMap: Map<string, MarketData>) {
    const symbol1 = strategy.contract1Symbol;
    const symbol2 = strategy.contract2Symbol;
    const symbol3 = strategy.contract3Symbol;
    const symbol4 = strategy.contract4Symbol;
    const symbol5 = strategy.contract5Symbol;
    const symbol6 = strategy.contract6Symbol;

    if (mdMap.has(symbol1) && mdMap.has(symbol2) && (symbol3 !== null === mdMap.has(symbol3))
      && (symbol4 !== null === mdMap.has(symbol4)) && (symbol5 !== null === mdMap.has(symbol5)) && (symbol6 !== null === mdMap.has(symbol6))) {
      // Bid/Ask price use the opposite side
      const symbol1Ask = mdMap.get(symbol1).bestBid.price;
      const symbol1Bid = mdMap.get(symbol1).bestAsk.price;
      const symbol2Ask = mdMap.get(symbol2).bestBid.price;
      const symbol2Bid = mdMap.get(symbol2).bestAsk.price;
      const symbol3Ask = symbol3 ? mdMap.get(symbol3).bestBid.price : 0;
      const symbol3Bid = symbol3 ? mdMap.get(symbol3).bestAsk.price : 0;
      const symbol4Ask = symbol4 ? mdMap.get(symbol4).bestBid.price : 0;
      const symbol4Bid = symbol4 ? mdMap.get(symbol4).bestAsk.price : 0;
      const symbol5Ask = symbol5 ? mdMap.get(symbol5).bestBid.price : 0;
      const symbol5Bid = symbol5 ? mdMap.get(symbol5).bestAsk.price : 0;
      const symbol6Ask = symbol6 ? mdMap.get(symbol6).bestBid.price : 0;
      const symbol6Bid = symbol6 ? mdMap.get(symbol6).bestAsk.price : 0;

      strategy.longLivePrice = symbol1Bid * strategy.contract1Coefficient
        + ((strategy.contract2Coefficient > 0 ? symbol2Bid : symbol2Ask) * strategy.contract2Coefficient)
        + ((strategy.contract3Coefficient > 0 ? symbol3Bid : symbol3Ask) * strategy.contract3Coefficient)
        + ((strategy.contract4Coefficient > 0 ? symbol4Bid : symbol4Ask) * strategy.contract4Coefficient)
        + ((strategy.contract5Coefficient > 0 ? symbol5Bid : symbol5Ask) * strategy.contract5Coefficient)
        + ((strategy.contract6Coefficient > 0 ? symbol6Bid : symbol6Ask) * strategy.contract6Coefficient)
        + strategy.constantFactor;
      strategy.shortLivePrice = symbol1Ask * strategy.contract1Coefficient
        + ((strategy.contract2Coefficient < 0 ? symbol2Bid : symbol2Ask) * strategy.contract2Coefficient)
        + ((strategy.contract3Coefficient < 0 ? symbol3Bid : symbol3Ask) * strategy.contract3Coefficient)
        + ((strategy.contract4Coefficient < 0 ? symbol4Bid : symbol4Ask) * strategy.contract4Coefficient)
        + ((strategy.contract5Coefficient < 0 ? symbol5Bid : symbol5Ask) * strategy.contract5Coefficient)
        + ((strategy.contract6Coefficient < 0 ? symbol6Bid : symbol6Ask) * strategy.contract6Coefficient)
        + strategy.constantFactor;
    }
  }

  public findAll(): Observable<TradingStrategy[]> {
    return this.httpClient.get<TradingStrategy[]>(this.tradingStrategyUrl + '/all');
  }

  public delete(tradingStrategy: TradingStrategy): Observable<TradingStrategy> {
    return this.httpClient.delete<TradingStrategy>(this.tradingStrategyUrl + '/' + tradingStrategy.id).pipe(
      tap(() => this.refreshData())
    );
  }

  public save(tradingStrategy: TradingStrategy): Observable<TradingStrategy> {
    return this.httpClient.post<TradingStrategy>(this.tradingStrategyUrl, tradingStrategy).pipe(
      tap(() => this.refreshData()),
      map(data => plainToClass(TradingStrategy, data))
    );
  }

}
