import {Injectable, OnDestroy} from '@angular/core';
import {StompService, StompState} from '@stomp/ng2-stompjs';
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

  constructor(private stompService: StompService) {
    this.stompService.state
      .pipe(map((state: number) => StompState[state]))
      .subscribe((status: string) => {
        console.log(`Stomp connection status: ${status}`);
      });

    this.stompService.initAndConnect();
    this.notificationObservable = this.stompService.subscribe('/topic/notification');
    this.alertObservable = this.stompService.subscribe('/topic/alert');
    this.latestMarketDataObservable = this.stompService.subscribe('/topic/marketData/all');
    this.todayOrdersDataObservable = this.stompService.subscribe('/topic/order/today');
    this.tradingStateObservable = this.stompService.subscribe('/topic/tradingState');
    this.tradingParametersObservable = this.stompService.subscribe('/topic/tradingParameters');
  }

  ngOnDestroy() {
    if (this.stompService.connected()) {
      this.stompService.disconnect();
    }
  }

}
