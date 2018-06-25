import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSnackBar, MatSort } from '@angular/material';
import { Observable } from 'rxjs/internal/Observable';
import { TradingExecution } from '../../model/trading-execution';

import { TradingStrategy } from '../../model/trading-strategy';
import { TradingExecutionService } from '../../service/trading-execution.service';
import { TradingStrategyService } from '../../service/trading-strategy.service';
import { TradingExecutionListDataSource } from './trading-execution-list-datasource';

@Component({
  selector: 'trading-execution-list',
  templateUrl: './trading-execution-list.component.html',
  styleUrls: ['./trading-execution-list.component.css']
})
export class TradingExecutionListComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  private allStrategies: Observable<TradingStrategy[]>;
  private selectedStrategy: TradingStrategy;
  private selectedExecution: TradingExecution;
  dataSource: TradingExecutionListDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'strategy', 'date', 'executionAction', 'action'];

  constructor(private tradingStrategyService: TradingStrategyService, private tradingExecutionService: TradingExecutionService, private snackBar: MatSnackBar) {
    this.allStrategies = tradingStrategyService.findAll();
  }

  ngOnInit() {
    this.dataSource = new TradingExecutionListDataSource(this.selectedStrategy, this.tradingExecutionService, this.paginator, this.sort);
  }

  selectedStrategyChanged() {
    this.dataSource = new TradingExecutionListDataSource(this.selectedStrategy, this.tradingExecutionService, this.paginator, this.sort);
  }

  newExecution() {
    this.selectedExecution = new TradingExecution();
    this.selectedExecution.tradingStrategy = this.selectedStrategy;
  }

  editExecution(toEdit: TradingExecution) {
    this.selectedExecution = toEdit;
  }

  deleteExecution(toDelete: TradingExecution) {
    if (this.selectedExecution === toDelete) {
      this.selectedExecution = null;
    }

    this.tradingExecutionService.delete(toDelete).subscribe(result => {
      this.snackBar.open('Trading Execution: \'' + toDelete.tradingStrategy.name + '\'' + '-' + toDelete.date, 'deleted', { duration: 3000 });
    });
  }

}
