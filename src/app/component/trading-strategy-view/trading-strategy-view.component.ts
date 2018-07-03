import { Component, Input, OnInit } from '@angular/core';
import { TradingStrategy } from '../../model/trading-strategy';

@Component({
  selector: 'app-trading-strategy-view',
  templateUrl: './trading-strategy-view.component.html',
  styleUrls: ['./trading-strategy-view.component.css']
})
export class TradingStrategyViewComponent implements OnInit {

  @Input() selectedStrategy: TradingStrategy;

  constructor() {
  }

  ngOnInit() {
  }

}
