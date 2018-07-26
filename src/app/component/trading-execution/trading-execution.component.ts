import { Component, OnInit, ViewChild } from '@angular/core';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { MatPaginator, MatSnackBar, MatSort } from '@angular/material';

import { MarketDataService } from '../../service/market-data.service';
import { StompClientService } from '../../service/stomp-client.service';
import { BaseComponent } from '../base-component';
import { MarketDataTableDataSource } from './market-data-table-data-source';

@Component({
  selector: 'trading-execution',
  templateUrl: './trading-execution.component.html',
  styleUrls: ['./trading-execution.component.css']
})
export class TradingExecutionComponent extends BaseComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  marketDataTableDataSource: MarketDataTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  marketDataTableDisplayedColumns = ['symbol', 'topBidTime', 'topBidSize', 'topBidPrice', 'topAskPrice', 'topAskSize', 'topAskTime'];

  constructor(protected stompClient: StompClientService, protected snackBar: MatSnackBar, private marketDataService: MarketDataService, private stompClientService: StompClientService) {
    super(stompClient, snackBar);
    this.marketDataService.refreshAll();
  }

  ngOnInit() {
    this.marketDataTableDataSource = new MarketDataTableDataSource(this.marketDataService, this.paginator, this.sort);
  }

}
