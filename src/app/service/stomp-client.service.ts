import { Injectable, OnDestroy } from '@angular/core';
import { StompService, StompState } from '@stomp/ng2-stompjs';
import { Message } from '@stomp/stompjs';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StompClientService implements OnDestroy {

  private notificationSubscription: Observable<Message>;
  private latestMarketDataSubscription: Observable<Message>;
  private tradingStateSubscription: Observable<Message>;
  private tradingParametersSubscription: Observable<Message>;

  constructor(private stompService: StompService) {
    this.stompService.state
      .pipe(map((state: number) => StompState[state]))
      .subscribe((status: string) => {
        console.log(`Stomp connection status: ${status}`);
      });

    this.stompService.initAndConnect();
  }

  ngOnDestroy() {
    if (this.stompService.connected()) {
      this.stompService.disconnect();
    }
  }

  public subscribeNotification(): Observable<Message> {
    if (!this.notificationSubscription) {
      this.stompService.connectObservable.subscribe(e => {
        this.notificationSubscription = this.stompService.subscribe('/topic/notification');
      });
    }
    return this.notificationSubscription;
  }

  public subscribeLatestMarketData(): Observable<Message> {
    if (!this.latestMarketDataSubscription) {
      this.stompService.connectObservable.subscribe(e => {
        this.latestMarketDataSubscription = this.stompService.subscribe('/topic/marketData/all');
      });
    }
    return this.latestMarketDataSubscription;
  }

  public subscribeTradingState(): Observable<Message> {
    if (!this.tradingStateSubscription) {
      this.stompService.connectObservable.subscribe(e => {
        this.tradingStateSubscription = this.stompService.subscribe('/topic/tradingState');
      });
    }
    return this.tradingStateSubscription;
  }

  public subscribeTradingParameters(): Observable<Message> {
    if (!this.tradingParametersSubscription) {
      this.stompService.connectObservable.subscribe(e => {
        this.tradingParametersSubscription = this.stompService.subscribe('/topic/tradingParameters');
      });
    }
    return this.tradingParametersSubscription;
  }

  public send(topic: string, data: any) {
    this.stompService.publish(topic, JSON.stringify(data));
  }

}
