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
  public activeStrategiesSubject = new BehaviorSubject<TradingStrategy[]>([]);
  public recordHistory: boolean;
  public historyPriceLevels = [];
  public strategyToRecord: string;
  public strategyTimestampString: string;

  constructor(private httpClient: HttpClient, private marketDataService: MarketDataService) {
    this.refreshData();
    this.marketDataService.latestMarketDataSubject.subscribe(marketDataList => {
      const marketDataMap = new Map(marketDataList.map(md => [md.symbol, md] as [string, MarketData]));
      this.data.forEach(strategy => this.calculateLivePrice(strategy, marketDataMap));
      this.dataSubject.next(this.data);
      this.activeStrategiesSubject.next(this.data.filter(strategy => strategy.isActive()));
    });

    this.dataSubject.subscribe(strategies => {
      if (this.recordHistory) {
        const latestStrategy = strategies.find(stg => stg.name === this.strategyToRecord);
        if (latestStrategy && latestStrategy.timestampString !== this.strategyTimestampString) {
          this.historyPriceLevels.push({
            name: latestStrategy.name,
            timestampString: latestStrategy.timestampString,
            longPriceLevel: latestStrategy.longPriceLevel,
            shortPriceLevel: latestStrategy.shortPriceLevel
          });
          this.strategyTimestampString = latestStrategy.timestampString;
        }
      }
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
    const marketData1 = mdMap.get(strategy.contract1Symbol);
    const marketData2 = mdMap.get(strategy.contract2Symbol);
    const marketData3 = mdMap.get(strategy.contract3Symbol);
    const marketData4 = mdMap.get(strategy.contract4Symbol);
    const marketData5 = mdMap.get(strategy.contract5Symbol);
    const marketData6 = mdMap.get(strategy.contract6Symbol);

    if (!mdMap.has(strategy.contract1Symbol) || marketData1.bestBid.price === 0 || marketData1.bestAsk.price === 0) {
      return;
    }
    if (!mdMap.has(strategy.contract2Symbol) || marketData2.bestBid.price === 0 || marketData2.bestAsk.price === 0) {
      return;
    }
    if (strategy.contract3Symbol && (!marketData3 || marketData3.bestBid.price === 0 || marketData3.bestAsk.price === 0)) {
      return;
    }
    if (strategy.contract4Symbol && (!marketData4 || marketData4.bestBid.price === 0 || marketData4.bestAsk.price === 0)) {
      return;
    }
    if (strategy.contract5Symbol && (!marketData5 || marketData5.bestBid.price === 0 || marketData5.bestAsk.price === 0)) {
      return;
    }
    if (strategy.contract6Symbol && (!marketData6 || marketData6.bestBid.price === 0 || marketData6.bestAsk.price === 0)) {
      return;
    }

    // Bid/Ask price use the opposite side
    const symbol1Ask = marketData1.bestBid.price;
    const symbol1Bid = marketData1.bestAsk.price;
    const symbol2Ask = marketData2.bestBid.price;
    const symbol2Bid = marketData2.bestAsk.price;
    const symbol3Ask = strategy.contract3Symbol ? marketData3.bestBid.price : 0;
    const symbol3Bid = strategy.contract3Symbol ? marketData3.bestAsk.price : 0;
    const symbol4Ask = strategy.contract4Symbol ? marketData4.bestBid.price : 0;
    const symbol4Bid = strategy.contract4Symbol ? marketData4.bestAsk.price : 0;
    const symbol5Ask = strategy.contract5Symbol ? marketData5.bestBid.price : 0;
    const symbol5Bid = strategy.contract5Symbol ? marketData5.bestAsk.price : 0;
    const symbol6Ask = strategy.contract6Symbol ? marketData6.bestBid.price : 0;
    const symbol6Bid = strategy.contract6Symbol ? marketData6.bestAsk.price : 0;

    const newLongPriceLevel = symbol1Bid * strategy.contract1Coefficient
      + ((strategy.contract2Coefficient > 0 ? symbol2Bid : symbol2Ask) * strategy.contract2Coefficient)
      + ((strategy.contract3Coefficient > 0 ? symbol3Bid : symbol3Ask) * strategy.contract3Coefficient)
      + ((strategy.contract4Coefficient > 0 ? symbol4Bid : symbol4Ask) * strategy.contract4Coefficient)
      + ((strategy.contract5Coefficient > 0 ? symbol5Bid : symbol5Ask) * strategy.contract5Coefficient)
      + ((strategy.contract6Coefficient > 0 ? symbol6Bid : symbol6Ask) * strategy.contract6Coefficient)
      + strategy.constantFactor;
    const newShortPriceLevel = symbol1Ask * strategy.contract1Coefficient
      + ((strategy.contract2Coefficient < 0 ? symbol2Bid : symbol2Ask) * strategy.contract2Coefficient)
      + ((strategy.contract3Coefficient < 0 ? symbol3Bid : symbol3Ask) * strategy.contract3Coefficient)
      + ((strategy.contract4Coefficient < 0 ? symbol4Bid : symbol4Ask) * strategy.contract4Coefficient)
      + ((strategy.contract5Coefficient < 0 ? symbol5Bid : symbol5Ask) * strategy.contract5Coefficient)
      + ((strategy.contract6Coefficient < 0 ? symbol6Bid : symbol6Ask) * strategy.contract6Coefficient)
      + strategy.constantFactor;

    if (strategy.longPriceLevel !== newLongPriceLevel || strategy.shortPriceLevel !== newShortPriceLevel) {
      strategy.timestamp = new Date();
      strategy.timestampString = (strategy.timestamp).toLocaleString();
      if (strategy.longPriceLevel !== newLongPriceLevel) {
        strategy.longPriceLevelTrend = (newLongPriceLevel > strategy.longPriceLevel) ? 1 : (newLongPriceLevel < strategy.longPriceLevel) ? -1 : 0;
        strategy.longPriceLevel = newLongPriceLevel;
      }
      if (strategy.shortPriceLevel !== newShortPriceLevel) {
        strategy.shortPriceLevelTrend = (newShortPriceLevel > strategy.shortPriceLevel) ? 1 : (newShortPriceLevel < strategy.shortPriceLevel) ? -1 : 0;
        strategy.shortPriceLevel = newShortPriceLevel;
      }
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

  public toggleRecordHistory(strategy: TradingStrategy) {
    this.recordHistory = !this.recordHistory;

    if (this.recordHistory) {
      this.strategyToRecord = strategy.name;
      this.strategyTimestampString = strategy.timestampString;
      this.historyPriceLevels = [];
    }
  }

}
