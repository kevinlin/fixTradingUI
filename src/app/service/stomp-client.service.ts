import {Injectable, OnDestroy} from '@angular/core';
import {environment} from '../../environments/environment';
import {StompService} from './stomp.service';

@Injectable({
  providedIn: 'root'
})
export class StompClientService implements OnDestroy {

  private connected = false;
  private notificationSubscription: any;
  private tradingStateSubscription: any;
  private tradingParametersSubscription: any;

  constructor(private stomp: StompService) {
    // configuration
    stomp.configure({
      host: '/stomp',
      debug: !environment.production,
      queue: {'init': false}
    });

    // start connection
    stomp.startConnect().then(() => {
      stomp.done('init');
      this.connected = true;
      console.log('Stomp client connected');
    });
  }

  ngOnDestroy() {
    if (this.connected) {
      this.stomp.disconnect().then(() => {
        console.log('Stomp client disconnected');
      });
    }
  }

  public subscribeNotification(callback: any): any {
    if (!this.connected) {
      this.stomp.after('init').then(() => {
        this.doSubscribeNotification(callback);
      });
    } else {
      this.doSubscribeNotification(callback);
    }

    return this.notificationSubscription;
  }

  private doSubscribeNotification(callback: any) {
    this.notificationSubscription = this.stomp.subscribe('/topic/notification', callback);
  }

  public unsubscribeNotification() {
    if (this.notificationSubscription && this.notificationSubscription.unsubscribe) {
      this.notificationSubscription.unsubscribe();
    }
  }

  public subscribeTradingState(callback: any): any {
    if (!this.connected) {
      this.stomp.after('init').then(() => {
        this.doSubscribeTradingState(callback);
      });
    } else {
      this.doSubscribeTradingState(callback);
    }

    return this.tradingStateSubscription;
  }

  private doSubscribeTradingState(callback: any) {
    this.tradingStateSubscription = this.stomp.subscribe('/topic/tradingState', callback);
  }

  public unsubscribeTradingState() {
    if (this.tradingStateSubscription && this.tradingStateSubscription.unsubscribe) {
      this.tradingStateSubscription.unsubscribe();
    }
  }

  public subscribeTradingParameters(callback: any): any {
    if (!this.connected) {
      this.stomp.after('init').then(() => {
        this.doSubscribeTradingParameters(callback);
      });
    } else {
      this.doSubscribeTradingParameters(callback);
    }

    return this.tradingParametersSubscription;
  }

  private doSubscribeTradingParameters(callback: any) {
    this.tradingParametersSubscription = this.stomp.subscribe('/topic/tradingParameters', callback);
  }

  public unsubscribeTradingParameters() {
    if (this.tradingParametersSubscription && this.tradingParametersSubscription.unsubscribe) {
      this.tradingParametersSubscription.unsubscribe();
    }
  }

  public send(topic: string, data: any) {
    this.stomp.send(topic, data);
  }

}
