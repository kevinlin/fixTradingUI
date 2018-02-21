import {Component, OnInit} from '@angular/core';
import {OnDestroy} from '@angular/core/src/metadata/lifecycle_hooks';
import {MatSnackBar} from '@angular/material';
import {Observable} from 'rxjs/Observable';

import {Instrument} from '../../model/instrument';
import {TradingSession} from '../../model/trading-session';
import {InstrumentService} from '../../service/instrument.service';
import {StompClientService} from '../../service/stomp-client.service';
import {TradingSessionService} from '../../service/trading-session.service';
import {BaseComponent} from '../base-component';

@Component({
  selector: 'app-trading-session',
  templateUrl: './trading-session.component.html',
  styleUrls: ['./trading-session.component.css']
})
export class TradingSessionComponent extends BaseComponent implements OnInit, OnDestroy {

  constructor(stompClient: StompClientService, snackBar: MatSnackBar, private instrumentService: InstrumentService, private tradingSessionService: TradingSessionService) {
    super(stompClient, snackBar);
  }

  sgxInstruments: Observable<Instrument[]>;
  dceInstruments: Observable<Instrument[]>;
  tradingSession: TradingSession;

  ngOnInit() {
    console.log('TradingSessionComponent onInit()->');
    this.baseOnInit();
    this.loading = true;
    this.sgxInstruments = this.instrumentService.getInstruments('SGX');
    this.dceInstruments = this.instrumentService.getInstruments('DCE');
    this.tradingSession = <TradingSession> {
      sgxInstrument: {symbol: null},
      dceInstrument: {symbol: null}
    };
    this.tradingSessionService.getTradingSession().subscribe(session => {
      console.log('Current session: ');
      console.log(session);
      if (session == null) {
        session = <TradingSession> {
          sgxInstrument: {symbol: null},
          dceInstrument: {symbol: null},
          date: this.dateToYMD(new Date())
        };
      } else if (session.sessionState === 'STOP') {
        session.date = this.dateToYMD(new Date());
      }
      this.tradingSession = session;
      this.loading = false;
    }, error => {
      this.handleHttpError(error);
    });
  }

  ngOnDestroy(): void {
    console.log('TradingSessionComponent onDestroy()->');
    this.baseOnDestroy();
  }

  startSession(): void {
    this.tradingSessionService.startTradingSession(this.tradingSession).subscribe(session => {
      this.onTradingSessionChange(session);
    }, error => {
      this.handleHttpError(error);
    });
  }

  stopSession(): void {
    this.tradingSessionService.stopTradingSession().subscribe(session => {
      this.onTradingSessionChange(session);
    }, error => {
      this.handleHttpError(error);
    });
  }

  private dateToYMD(date: Date): string {
    const d = date.getDate();
    const m = date.getMonth() + 1;
    const y = date.getFullYear();
    return '' + y + '-' + (m <= 9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
  }

  private onTradingSessionChange(session: TradingSession) {
    console.log(session);
    this.tradingSession = session;
    this.snackBar.open('Trading Session', session.sessionState, {duration: 3000});
  }

}
