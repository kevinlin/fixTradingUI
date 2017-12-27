import {Component, OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material';
import {TradingSessionService} from '../../service/trading-session.service';
import {TradingSession} from '../../model/trading-session';

@Component({
  selector: 'app-trading-state',
  templateUrl: './trading-state.component.html',
  styleUrls: ['./trading-state.component.css']
})
export class TradingStateComponent implements OnInit {

  constructor(private tradingSessionService: TradingSessionService, private snackBar: MatSnackBar) {
  }

  private loading: boolean;
  private tradingSession: TradingSession;

  ngOnInit() {
    this.loading = true;

    this.tradingSessionService.getTradingSession().subscribe(session => {
      console.log('Current session: ' + session);
      this.tradingSession = session;
      this.loading = false;
    });
  }

}
