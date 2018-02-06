import {Component, OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material';
import {TradingParameters} from '../../model/trading-parameters';
import {TradingState} from '../../model/trading-state';
import {ParametersService} from '../../service/parameters.service';
import {TradingSessionService} from '../../service/trading-session.service';
import {TradingStateService} from '../../service/trading-state.service';
import numbro = require('numbro');

@Component({
  selector: 'app-trading-state',
  templateUrl: './trading-state.component.html',
  styleUrls: ['./trading-state.component.css']
})
export class TradingStateComponent implements OnInit {

  constructor(private tradingSessionService: TradingSessionService, private tradingStateService: TradingStateService,
              private parametersService: ParametersService, private snackBar: MatSnackBar) {
  }

  loading: boolean;
  tradingState: TradingState;
  tradingParameters: TradingParameters;
  benchmarkExchangeRate: number;
  shortExchangeRate: number;
  longExchangeRate: number;
  proposedShortSize: number;
  proposedLongSize: number;
  shortSize: number;
  longSize: number;
  myNmbro = numbro;

  ngOnInit() {
    this.loading = true;
    this.tradingParameters = <TradingParameters>{};

    this.tradingSessionService.getTradingSession().subscribe(session => {
      console.log('Current session: ');
      console.log(session);
      if (session != null) {
        this.loadTradingState();
        setInterval(() => {
          this.loadTradingState();
        }, 5000);

        this.parametersService.getParameters().subscribe(parameters => {
          this.tradingParameters = parameters;
        });
      } else {
        this.loading = false;
      }
    }, error => {
      this.handleHttpError(error);
    });
  }

  updateExchangeRate() {
    this.loading = true;
    this.tradingStateService.updateExchangeRate(this.benchmarkExchangeRate).subscribe(state => {
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
    this.tradingState = state;
    if (!this.benchmarkExchangeRate) {
      this.benchmarkExchangeRate = state.benchmarkExchangeRate;
      this.shortExchangeRate = state.benchmarkExchangeRate;
      this.longExchangeRate = state.benchmarkExchangeRate;
    }
    this.proposedShortSize = Math.min(state.sgxBestBidSize, state.dceBestAskSize);
    this.proposedLongSize = Math.min(state.sgxBestAskSize, state.dceBestBidSize);
    this.loading = false;
  }

  private handleHttpError(error) {
    console.log(error);
    const message = error.error ? error.error.message : error.message;
    this.snackBar.open('Error occurred', message, {duration: 3000});
    this.loading = false;
  }

  calculateSgxBestBidPriceInCny(): number {
    if (!this.tradingState.sgxBestBidPrice || !this.shortExchangeRate || !this.tradingParameters.miscellaneousCharge) {
      return 0;
    }
    const sgxBestBidPrice = numbro(this.tradingState.sgxBestBidPrice);
    return sgxBestBidPrice.multiply(1.17).multiply(this.shortExchangeRate).add(this.tradingParameters.miscellaneousCharge).value();
  }

  calculateSgxBestAskPriceInCny(): number {
    if (!this.tradingState.sgxBestAskPrice || !this.longExchangeRate || !this.tradingParameters.miscellaneousCharge) {
      return 0;
    }
    const sgxBestAskPrice = numbro(this.tradingState.sgxBestAskPrice);
    return sgxBestAskPrice.multiply(1.17).multiply(this.longExchangeRate).add(this.tradingParameters.miscellaneousCharge).value();
  }

  lookupTradingAction(action: string): string {
    if (action === 'NONE') {
      return '初始';
    } else if (action === 'SHORT') {
      return '做空建仓';
    } else if (action === 'LONE') {
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
