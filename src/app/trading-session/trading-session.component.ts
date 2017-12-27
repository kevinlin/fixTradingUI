///<reference path="../../../node_modules/@angular/core/src/metadata/directives.d.ts"/>
import {Component, OnInit} from '@angular/core';
import {TradingSessionService} from '../service/trading-session.service';
import {InstrumentService} from '../service/instrument.service';
import {Instrument} from '../model/instrument';
import {Observable} from 'rxjs/Observable';
import {TradingSession} from '../model/trading-session';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-trading-session',
  templateUrl: './trading-session.component.html',
  styleUrls: ['./trading-session.component.css']
})
export class TradingSessionComponent implements OnInit {

  constructor(private instrumentService: InstrumentService, private tradingSessionService: TradingSessionService, private snackBar: MatSnackBar) {
  }

  private loading: boolean;
  private sgxInstruments: Observable<Instrument[]>;
  private dceInstruments: Observable<Instrument[]>;
  private tradingSession: TradingSession;

  ngOnInit() {
    this.loading = true;
    this.sgxInstruments = this.instrumentService.getInstruments('SGX');
    this.dceInstruments = this.instrumentService.getInstruments('DCE');
    this.tradingSession = <TradingSession> {
      sgxInstrument: {symbol: null},
      dceInstrument: {symbol: null}
    };
    this.tradingSessionService.getTradingSession().subscribe(session => {
      console.log('Current session: ' + session);
      if (session == null) {
        session = <TradingSession> {
          sgxInstrument: {symbol: null},
          dceInstrument: {symbol: null}
        };
      }
      this.tradingSession = session;
      this.loading = false;
    });
  }

  startSession(): void {
    this.tradingSessionService.startTradingSession(this.tradingSession).subscribe(session => {
      console.log('Session started: ' + session);
      this.tradingSession = session;
      this.snackBar.open('Trading Session', 'started', {duration: 3000});
    }, error => {
      console.log(error);
      this.snackBar.open('Error occurred', error.error.message, {duration: 3000});
    });
  }

  stopSession(): void {
    this.tradingSessionService.stopTradingSession().subscribe(session => {
      console.log('Session stopped: ' + session);
      this.tradingSession = session;
      this.snackBar.open('Trading Session', 'stopped', {duration: 3000});
    }, error => {
      console.log(error);
      this.snackBar.open('Error occurred', error.error.message, {duration: 3000});
    });
  }
}
