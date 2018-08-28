import { Component, OnInit, ViewChild } from '@angular/core';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { MatDialog, MatPaginator, MatSnackBar, MatSort } from '@angular/material';

import { TradingOperation } from '../../model/trading-operation';
import { MarketDataService } from '../../service/market-data.service';
import { OrderService } from '../../service/order.service';
import { StompClientService } from '../../service/stomp-client.service';
import { BaseComponent } from '../base-component';
import { MarketDataTableDataSource } from './market-data-table-data-source';
import { OrderTableDataSource } from './order-table-data-source';

@Component({
  selector: 'trading-execution',
  templateUrl: './trading-execution.component.html',
  styleUrls: ['./trading-execution.component.css']
})
export class TradingExecutionComponent extends BaseComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) marketWatcherPaginator: MatPaginator;
  @ViewChild(MatSort) marketWatcherSort: MatSort;
  @ViewChild(MatPaginator) orderBlotterPaginator: MatPaginator;
  @ViewChild(MatSort) orderBlotterSort: MatSort;

  marketWatcherDataSource: MarketDataTableDataSource;
  orderBlotterDataSource: OrderTableDataSource;
  selectedOperation: TradingOperation;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  marketWatcherDisplayedColumns = ['symbol', 'topBidTime', 'topBidSize', 'topBidPrice', 'topAskPrice', 'topAskSize', 'topAskTime'];
  orderBlotterDisplayedColumns = ['date', 'strategy', 'symbol', 'clOrdID', 'orderID', 'side', 'price', 'size', 'status', 'text', 'transactTime'];

  constructor(protected stompClient: StompClientService, protected snackBar: MatSnackBar, protected dialog: MatDialog, private marketDataService: MarketDataService, private orderService: OrderService) {
    super(stompClient, snackBar, dialog);
    this.marketDataService.refreshAll();
    this.orderService.refreshTodayOrders();
  }

  ngOnInit() {
    this.marketWatcherDataSource = new MarketDataTableDataSource(this.marketDataService, this.marketWatcherPaginator, this.marketWatcherSort);
    this.orderBlotterDataSource = new OrderTableDataSource(this.selectedOperation, this.orderService, this.orderBlotterPaginator, this.orderBlotterSort);
  }

}
