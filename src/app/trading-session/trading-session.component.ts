import {Component, OnInit} from '@angular/core';
import {TradingSessionService} from '../service/trading-session.service';
import {InstrumentService} from '../service/instrument.service';
import {Instrument} from '../model/instrument';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-trading-session',
  templateUrl: './trading-session.component.html',
  styleUrls: ['./trading-session.component.css']
})
export class TradingSessionComponent implements OnInit {

  constructor(private instrumentService: InstrumentService, private tradingSessionService: TradingSessionService) {
  }

  private sgxInstruments: Observable<Instrument[]>;
  private dceInstruments: Observable<Instrument[]>;
  private selectedSgxInstrument: Instrument;
  private selectedDceInstrument: Instrument;
  private date: Date;
  private exchangeRate: number;

  ngOnInit() {
    this.sgxInstruments = this.instrumentService.getInstruments('SGX');
    this.dceInstruments = this.instrumentService.getInstruments('DCE');
  }

}
