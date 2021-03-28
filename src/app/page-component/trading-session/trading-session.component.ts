import {ApplicationRef, Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Observable} from 'rxjs';

import {Instrument} from '../../model/instrument';
import {TradingSession} from '../../model/trading-session';
import {InstrumentService} from '../../service/instrument.service';
import {StompClientService} from '../../service/stomp-client.service';
import {TradingSessionService} from '../../service/trading-session.service';
import {ToastsManager} from '../../toast/toasts-manager.service';
import {BasePageComponent} from '../base-page-component';

@Component({
  selector: 'app-trading-session',
  templateUrl: './trading-session.component.html',
  styleUrls: ['./trading-session.component.css']
})
export class TradingSessionComponent extends BasePageComponent implements OnInit {

  constructor(protected stompClient: StompClientService, protected toastr: ToastsManager, protected appRef: ApplicationRef, protected dialog: MatDialog,
              private instrumentService: InstrumentService, private tradingSessionService: TradingSessionService) {
    super(stompClient, toastr, appRef, dialog);
  }

  allInstruments: Observable<Instrument[]>;
  tradingSession: TradingSession;

  ngOnInit() {
    console.log('TradingSessionComponent onInit()->');
    this.baseOnInit();
    this.loading = true;
    this.allInstruments = this.instrumentService.getAllInstruments();
    this.tradingSession = <TradingSession> {
      lhsInstrument: { symbol: null },
      rhsInstrument: { symbol: null }
    };
    this.tradingSessionService.getTradingSession().subscribe(session => {
      console.log('Current session: ');
      console.log(session);
      if (session == null) {
        session = <TradingSession> {
          lhsInstrument: { symbol: null },
          rhsInstrument: { symbol: null },
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
    // this.snackBar.open('Trading Session', session.sessionState, { duration: 3000 });
    this.toastr.info('Trading Session ' + session.sessionState);
  }

}
