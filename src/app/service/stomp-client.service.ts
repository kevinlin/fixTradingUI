import {Injectable, OnDestroy} from '@angular/core';
import {StompService, StompState} from '@stomp/ng2-stompjs';
import {Message} from '@stomp/stompjs';
import {NEVER, Observable} from 'rxjs';
import {map, shareReplay} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StompClientService implements OnDestroy {

  private notificationObservable: Observable<Message>;
  private alertObservable: Observable<Message>;
  private latestMarketDataObservable: Observable<Message>;
  private todayOrdersDataObservable: Observable<Message>;
  private tradingStateObservable: Observable<Message>;
  private tradingParametersObservable: Observable<Message>;

  constructor(private stompService: StompService) {
    this.stompService.state
      .pipe(map((state: number) => StompState[state]))
      .subscribe((status: string) => {
        console.log(`Stomp connection status: ${status}`);
      });

    this.stompService.initAndConnect();
    this.stompService.connectObservable.subscribe(value => {
      this.notificationObservable = this.stompService.subscribe('/topic/notification').pipe(shareReplay(1));
      this.alertObservable = this.stompService.subscribe('/topic/alert').pipe(shareReplay(1));
      this.latestMarketDataObservable = this.stompService.subscribe('/topic/marketData/all').pipe(shareReplay(1));
      this.todayOrdersDataObservable = this.stompService.subscribe('/topic/order/today').pipe(shareReplay(1));
      this.tradingStateObservable = this.stompService.subscribe('/topic/tradingState').pipe(shareReplay(1));
      this.tradingParametersObservable = this.stompService.subscribe('/topic/tradingParameters').pipe(shareReplay(1));
    });
  }

  ngOnDestroy() {
    if (this.stompService.connected()) {
      this.stompService.disconnect();
    }
  }

  public subscribeNotification(): Observable<Message> {
    return this.stompService.connected() ? this.notificationObservable : NEVER;
  }

  public subscribeAlert(): Observable<Message> {
    return this.stompService.connected() ? this.alertObservable : NEVER;
  }

  public subscribeLatestMarketData(): Observable<Message> {
    return this.stompService.connected() ? this.latestMarketDataObservable : NEVER;
  }

  public subscribeTodayOrders(): Observable<Message> {
    return this.stompService.connected() ? this.todayOrdersDataObservable : NEVER;
  }

  public subscribeTradingState(): Observable<Message> {
    return this.stompService.connected() ? this.tradingStateObservable : NEVER;
  }

  public subscribeTradingParameters(): Observable<Message> {
    return this.stompService.connected() ? this.tradingParametersObservable : NEVER;
  }

  public send(topic: string, data: any) {
    this.stompService.publish(topic, JSON.stringify(data));
  }

}
