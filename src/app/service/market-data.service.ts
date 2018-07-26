import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Message } from '@stomp/stompjs';
import { BehaviorSubject, Observable } from 'rxjs/index';

import { MarketData } from '../model/market-data';
import { StompClientService } from './stomp-client.service';

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
        console.log(latestMarketData);
        this.latestMarketDataSubject.next(latestMarketData);
      });
  }

  public getAll(): Observable<MarketData[]> {
    return this.httpClient.get<MarketData[]>(this.marketDataUrl + '/all');
  }

  public refreshAll() {
    this.getAll().subscribe(result => {
      console.log(result);
      this.latestMarketDataSubject.next(result);
    });
  }
}
