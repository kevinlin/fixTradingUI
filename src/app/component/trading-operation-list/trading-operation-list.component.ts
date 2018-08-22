import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSnackBar, MatSort } from '@angular/material';
import { Observable } from 'rxjs/internal/Observable';
import { TradingOperation } from '../../model/trading-operation';

import { TradingStrategy } from '../../model/trading-strategy';
import { StompClientService } from '../../service/stomp-client.service';
import { TradingOperationService } from '../../service/trading-operation.service';
import { TradingStrategyService } from '../../service/trading-strategy.service';
import { BaseComponent } from '../base-component';
import { TradingOperationListDataSource } from './trading-operation-list-data-source';

@Component({
  selector: 'trading-execution-list',
  templateUrl: './trading-operation-list.component.html',
  styleUrls: ['./trading-operation-list.component.css']
})
export class TradingOperationListComponent extends BaseComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  allStrategies: Observable<TradingStrategy[]>;
  selectedStrategy: TradingStrategy;
  selectedOperation: TradingOperation;
  dataSource: TradingOperationListDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'strategy', 'date', 'direction', 'operationType', 'state', 'action'];

  constructor(protected stompClient: StompClientService, protected snackBar: MatSnackBar, private tradingStrategyService: TradingStrategyService,
              private tradingOperationService: TradingOperationService) {
    super(stompClient, snackBar);
    this.allStrategies = tradingStrategyService.dataSubject;
  }

  ngOnInit() {
    this.baseOnInit();
    this.dataSource = new TradingOperationListDataSource(this.selectedStrategy, this.tradingOperationService, this.paginator, this.sort);
  }

  selectedStrategyChanged() {
    this.dataSource = new TradingOperationListDataSource(this.selectedStrategy, this.tradingOperationService, this.paginator, this.sort);
    this.selectedOperation = null;
  }

  newExecution() {
    this.selectedOperation = new TradingOperation();
    this.selectedOperation.tradingStrategy = this.selectedStrategy;
  }

  editExecution(toEdit: TradingOperation) {
    this.selectedOperation = toEdit;
    this.selectedStrategy = toEdit.tradingStrategy;
  }

  deleteExecution(toDelete: TradingOperation) {
    if (this.selectedOperation === toDelete) {
      this.selectedOperation = null;
    }

    this.tradingOperationService.delete(toDelete).subscribe(result => {
      this.snackBar.open('Trading Execution: \'' + toDelete.tradingStrategy.name + '\'' + '-' + toDelete.date, 'deleted', { duration: 3000 });
    });
  }

}
