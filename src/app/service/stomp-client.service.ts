import {Injectable, OnDestroy} from '@angular/core';
import {InjectableRxStompConfig, RxStompService} from '@stomp/ng2-stompjs';
import {RxStompState} from '@stomp/rx-stomp';
import {Message} from '@stomp/stompjs';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StompClientService implements OnDestroy {

  public notificationObservable: Observable<Message>;
  public alertObservable: Observable<Message>;
  public latestMarketDataObservable: Observable<Message>;
  public todayOrdersDataObservable: Observable<Message>;
  public tradingStateObservable: Observable<Message>;
  public tradingParametersObservable: Observable<Message>;

  constructor(private rxStompService: RxStompService, private rxStompConfig: InjectableRxStompConfig) {
    this.rxStompService.connectionState$
      .pipe(map((state: number) => RxStompState[state]))
      .subscribe((status: string) => {
        console.log(`Stomp connection status: ${status}`);
      });

    this.rxStompService.configure(rxStompConfig);
    this.rxStompService.activate();
    this.notificationObservable = this.rxStompService.watch('/topic/notification');
    this.alertObservable = this.rxStompService.watch('/topic/alert');
    this.latestMarketDataObservable = this.rxStompService.watch('/topic/marketData/all');
    this.todayOrdersDataObservable = this.rxStompService.watch('/topic/order/today');
    this.tradingStateObservable = this.rxStompService.watch('/topic/tradingState');
    this.tradingParametersObservable = this.rxStompService.watch('/topic/tradingParameters');
  }

  ngOnDestroy() {
    if (this.rxStompService.connected()) {
      this.rxStompService.deactivate();
    }
  }

}
