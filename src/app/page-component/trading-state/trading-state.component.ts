import {ApplicationRef, Component, OnInit} from '@angular/core';
import {OnDestroy} from '@angular/core/src/metadata/lifecycle_hooks';
import {MatDialog} from '@angular/material';
import {Message} from '@stomp/stompjs';
import {componentDestroyed} from '@w11k/ngx-componentdestroyed';
import {takeUntil} from 'rxjs/operators';

import {TradingParameters} from '../../model/trading-parameters';
import {TradingState} from '../../model/trading-state';
import {ParametersService} from '../../service/parameters.service';
import {StompClientService} from '../../service/stomp-client.service';
import {TradingSessionService} from '../../service/trading-session.service';
import {TradingStateService} from '../../service/trading-state.service';
import {ToastsManager} from '../../toast/toasts-manager.service';
import {BasePageComponent} from '../base-page-component';

@Component({
  selector: 'app-trading-state',
  templateUrl: './trading-state.component.html',
  styleUrls: ['./trading-state.component.css']
})
export class TradingStateComponent extends BasePageComponent implements OnInit, OnDestroy {

  tradingState: TradingState;
  tradingParameters: TradingParameters;
  proposedShortSize: number;
  proposedLongSize: number;
  shortSize: number;
  longSize: number;

  constructor(protected stompClient: StompClientService, protected toastr: ToastsManager, protected appRef: ApplicationRef, protected dialog: MatDialog,
              private tradingSessionService: TradingSessionService, private tradingStateService: TradingStateService, private parametersService: ParametersService) {
    super(stompClient, toastr, appRef, dialog);
  }

  ngOnInit() {
    console.log('TradingStateComponent onInit()->');
    this.baseOnInit();
    this.loading = true;
    this.tradingParameters = <TradingParameters>{};

    this.tradingSessionService.getTradingSession().subscribe(session => {
      console.log('Current session: ');
      console.log(session);
      if (session != null) {
        this.loadTradingState();
        this.parametersService.getParameters().subscribe(parameters => {
          this.tradingParameters = parameters;
        });

        this.stompClient.tradingStateObservable
          .pipe(takeUntil(componentDestroyed(this)))
          .subscribe((message: Message) => {
            const state = JSON.parse(message.body);
            this.onTradingStateChange(state);
            // this.snackBar.open('Trading State', 'changed', { duration: 3000 });
            this.toastr.info('Trading State changed.');
          });
        this.stompClient.tradingParametersObservable
          .pipe(takeUntil(componentDestroyed(this)))
          .subscribe((message: Message) => {
            this.tradingParameters = JSON.parse(message.body);
            // this.snackBar.open('Trading Parameters', 'changed', { duration: 3000 });
            this.toastr.info('Trading Parameters changed.');
          });
      } else {
        this.loading = false;
      }
    }, error => {
      this.handleHttpError(error);
    });
  }

  ngOnDestroy(): void {
    console.log('TradingStateComponent onDestroy()->');
  }

  onKeyupShortExchangeRate(event: any) {
    const exchangeRate = event.target.value;
    console.log('ShortExchangeRate changed: ' + exchangeRate);
    this.tradingStateService.updateExchangeRate(exchangeRate, true).subscribe(state => {
      this.onTradingStateChange(state);
    }, error => {
      this.handleHttpError(error);
    });
  }

  onKeyupLongExchangeRate(event: any) {
    const exchangeRate = event.target.value;
    console.log('LongExchangeRate changed: ' + exchangeRate);
    this.tradingStateService.updateExchangeRate(exchangeRate, false).subscribe(state => {
      this.onTradingStateChange(state);
    }, error => {
      this.handleHttpError(error);
    });
  }

  openShort() {
    this.loading = true;
    this.tradingStateService.openShort(this.shortSize).subscribe(state => {
      this.onTradingStateChange(state);
    }, error => {
      this.handleHttpError(error);
    });
  }

  closeShort() {
    this.loading = true;
    this.tradingStateService.closeShort(this.shortSize).subscribe(state => {
      this.onTradingStateChange(state);
    }, error => {
      this.handleHttpError(error);
    });
  }

  stopShortLoss() {
    this.loading = true;
    this.tradingStateService.stopShortLoss().subscribe(state => {
      this.onTradingStateChange(state);
    }, error => {
      this.handleHttpError(error);
    });
  }

  openShortAgain() {
    this.loading = true;
    this.tradingStateService.openShortAgain(this.shortSize).subscribe(state => {
      this.onTradingStateChange(state);
    }, error => {
      this.handleHttpError(error);
    });
  }

  openLong() {
    this.loading = true;
    this.tradingStateService.openLong(this.longSize).subscribe(state => {
      this.onTradingStateChange(state);
    }, error => {
      this.handleHttpError(error);
    });
  }

  closeLong() {
    this.loading = true;
    this.tradingStateService.closeLong(this.longSize).subscribe(state => {
      this.onTradingStateChange(state);
    }, error => {
      this.handleHttpError(error);
    });
  }

  stopLongLoss() {
    this.loading = true;
    this.tradingStateService.stopLongLoss().subscribe(state => {
      this.onTradingStateChange(state);
    }, error => {
      this.handleHttpError(error);
    });
  }

  openLongAgain() {
    this.loading = true;
    this.tradingStateService.openLongAgain(this.longSize).subscribe(state => {
      this.onTradingStateChange(state);
    }, error => {
      this.handleHttpError(error);
    });
  }

  private loadTradingState() {
    this.tradingStateService.getTradingState().subscribe(state => {
      this.onTradingStateChange(state);
    }, error => {
      this.handleHttpError(error);
    });
  }

  private onTradingStateChange(state) {
    console.log(state);
    if (!state) {
      return;
    }
    this.tradingState = state;
    if (state.lhsBestBid && state.rhsBestAsk) {
      this.proposedShortSize = Math.min(state.lhsBestBid.size, state.rhsBestAsk.size);
    }
    if (state.lhsBestAsk && state.rhsBestBid) {
      this.proposedLongSize = Math.min(state.lhsBestAsk.size, state.rhsBestBid.size);
    }
    this.loading = false;
  }

  lookupTradingAction(action: string): string {
    if (action === 'NONE') {
      return '初始';
    } else if (action === 'SHORT') {
      return '做空建仓';
    } else if (action === 'LONG') {
      return '做多建仓';
    } else if (action === 'CLOSE_SHORT') {
      return '做空平仓';
    } else if (action === 'CLOSE_LONG') {
      return '做多平仓';
    } else if (action === 'STOP_SHORT_LOSS') {
      return '做空止损';
    } else if (action === 'STOP_LONG_LOSS') {
      return '做多止损';
    } else if (action === 'SHORT_AGAIN') {
      return '做空止损后再建仓';
    } else if (action === 'LONG_AGAIN') {
      return '做多止损后再建仓';
    }
  }

}
