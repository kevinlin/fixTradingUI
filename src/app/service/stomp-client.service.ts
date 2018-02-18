import {Injectable, OnDestroy} from '@angular/core';
import {environment} from '../../environments/environment';
import {StompService} from './stomp.service';

@Injectable()
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
      if (this.tradingStateSubscription && this.tradingStateSubscription.unsubscribe) {
        this.tradingStateSubscription.unsubscribe();
      }
      if (this.tradingParametersSubscription && this.tradingParametersSubscription.unsubscribe) {
        this.tradingParametersSubscription.unsubscribe();
      }

      this.stomp.disconnect().then(() => {
        console.log('Stomp client disconnected');
      });
    }
  }

  public subscribeNotification(callback: any) {
    if (!this.connected) {
      this.stomp.after('init').then(() => {
        this.doSubscribeNotification(callback);
      });
    } else {
      if (this.notificationSubscription && this.notificationSubscription.unsubscribe) {
        this.notificationSubscription.unsubscribe();
      }
      this.doSubscribeNotification(callback);
    }
  }

  private doSubscribeNotification(callback: any) {
    this.notificationSubscription = this.stomp.subscribe('/topic/notification', callback);
  }

  public subscribeTradingState(callback: any) {
    if (!this.connected) {
      this.stomp.after('init').then(() => {
        this.doSubscribeTradingState(callback);
      });
    } else {
      if (this.tradingStateSubscription && this.tradingStateSubscription.unsubscribe) {
        this.tradingStateSubscription.unsubscribe();
      }
      this.doSubscribeTradingState(callback);
    }
  }

  private doSubscribeTradingState(callback: any) {
    this.tradingStateSubscription = this.stomp.subscribe('/topic/tradingState', callback);
  }

  public subscribeTradingParameters(callback: any) {
    if (!this.connected) {
      this.stomp.after('init').then(() => {
        this.doSubscribeTradingParameters(callback);
      });
    } else {
      if (this.tradingParametersSubscription && this.tradingParametersSubscription.unsubscribe) {
        this.tradingParametersSubscription.unsubscribe();
      }
      this.doSubscribeTradingParameters(callback);
    }
  }

  private doSubscribeTradingParameters(callback: any) {
    this.tradingParametersSubscription = this.stomp.subscribe('/topic/tradingParameters', callback);
  }

  public send(topic: string, data: any) {
    this.stomp.send(topic, data);
  }

}
