import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Message} from '@stomp/stompjs';
import {BehaviorSubject, Observable} from 'rxjs';
import {shareReplay, tap} from 'rxjs/operators';

import {MarketData} from '../model/market-data';
import {StompClientService} from './stomp-client.service';

@Injectable({
  providedIn: 'root'
})
export class MarketDataService {

  public latestMarketDataSubject = new BehaviorSubject<MarketData[]>([]);

  private marketDataUrl = '/api/marketData';

  constructor(private httpClient: HttpClient, private stompClientService: StompClientService) {
    stompClientService.subscribeLatestMarketData()
      .subscribe((message: Message) => {
        const latestMarketData = JSON.parse(message.body);
        console.log('MarketDataService.latestMarketData:', latestMarketData);
        this.latestMarketDataSubject.next(latestMarketData);
      });
  }

  public getAll(): Observable<MarketData[]> {
    return this.httpClient.get<MarketData[]>(this.marketDataUrl + '/todayAll').pipe(shareReplay(1));
  }

  public refreshAll() {
    this.getAll().subscribe(result => {
      console.log('MarketDataService.refreshAll()->', result);
      this.latestMarketDataSubject.next(result);
    });
  }

  public subscribe(symbol: String) {
    return this.httpClient.get<MarketData[]>(this.marketDataUrl + '/subscription/' + symbol).pipe(
      tap(() => {
        this.refreshAll();
      })
    );
  }

  public unsubscribe(symbol: String) {
    return this.httpClient.delete<MarketData[]>(this.marketDataUrl + '/subscription/' + symbol).pipe(
      tap(() => {
        this.refreshAll();
      })
    );
  }

}
