import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs/index';
import { Direction } from '../../model/Direction';
import { Instrument } from '../../model/instrument';
import { TradingStrategy } from '../../model/trading-strategy';
import { InstrumentService } from '../../service/instrument.service';
import { TradingStrategyService } from '../../service/trading-strategy.service';

@Component({
  selector: 'app-trading-strategy-detail',
  templateUrl: './trading-strategy-detail.component.html',
  styleUrls: ['./trading-strategy-detail.component.css']
})
export class TradingStrategyDetailComponent implements OnInit {

  @Input() selectedStrategy: TradingStrategy;

  allInstruments: Observable<Instrument[]>;
  Direction = Direction;
  DirectionValues = Object.values(Direction).filter(e => typeof(e) == "string");

  constructor(private instrumentService: InstrumentService, private tradingStrategyService: TradingStrategyService, private snackBar: MatSnackBar) {
    this.allInstruments = this.instrumentService.getAllInstruments();
  }

  ngOnInit() {
  }

  saveStrategy() {
    this.tradingStrategyService.save(this.selectedStrategy).subscribe(result => {
      this.selectedStrategy = result;
      this.snackBar.open('Trading Strategy: \'' + this.selectedStrategy.name + '\'', 'saved', { duration: 3000 });
    })
  }

  cancelChanges() {
    this.selectedStrategy = null;
  }

}
