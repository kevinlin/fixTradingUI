import { Component, OnInit, ViewChild } from '@angular/core';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { MatDialog, MatPaginator, MatSnackBar, MatSort } from '@angular/material';

import { TradingOperation } from '../../model/trading-operation';
import { OrderService } from '../../service/order.service';
import { StompClientService } from '../../service/stomp-client.service';
import { BaseComponent } from '../base-component';
import { OrderBlotterDataSource } from './order-blotter-data-source';

@Component({
  selector: 'trading-execution',
  templateUrl: './trading-execution.component.html',
  styleUrls: ['./trading-execution.component.css']
})
export class TradingExecutionComponent extends BaseComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) orderBlotterPaginator: MatPaginator;
  @ViewChild(MatSort) orderBlotterSort: MatSort;

  orderBlotterDataSource: OrderBlotterDataSource;
  selectedOperation: TradingOperation;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  orderBlotterDisplayedColumns = ['date', 'strategy', 'symbol', 'clOrdID', 'orderID', 'side', 'price', 'size', 'status', 'text', 'transactTime'];

  constructor(protected stompClient: StompClientService, protected snackBar: MatSnackBar, protected dialog: MatDialog, private orderService: OrderService) {
    super(stompClient, snackBar, dialog);
    this.orderService.refreshTodayOrders();
  }

  ngOnInit() {
    this.orderBlotterDataSource = new OrderBlotterDataSource(this.selectedOperation, this.orderService, this.orderBlotterPaginator, this.orderBlotterSort);
  }

}
