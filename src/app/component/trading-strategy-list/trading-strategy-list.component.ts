import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSnackBar, MatSort } from '@angular/material';
import { TradingStrategy } from '../../model/trading-strategy';
import { TradingStrategyService } from '../../service/trading-strategy.service';
import { TradingStrategyListDataSource } from './trading-strategy-list-datasource';

@Component({
  selector: 'trading-strategy-list',
  templateUrl: './trading-strategy-list.component.html',
  styleUrls: ['./trading-strategy-list.component.css']
})
export class TradingStrategyListComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public dataSource: TradingStrategyListDataSource;
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name', 'instruments', 'direction', 'state', 'action'];

  selectedStrategy: TradingStrategy;

  constructor(private tradingStrategyService: TradingStrategyService, private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.dataSource = new TradingStrategyListDataSource(this.tradingStrategyService, this.paginator, this.sort);
  }

  newStrategy() {
    this.selectedStrategy = new TradingStrategy();
  }

  editStrategy(toEdit: TradingStrategy) {
    this.selectedStrategy = toEdit;
  }

  deleteStrategy(toDelete: TradingStrategy) {
    if (this.selectedStrategy === toDelete) {
      this.selectedStrategy = null;
    }

    this.tradingStrategyService.delete(toDelete).subscribe(result => {
      this.snackBar.open('Trading Strategy: \'' + toDelete.name + '\'', 'deleted', { duration: 3000 });
    });
  }

}
