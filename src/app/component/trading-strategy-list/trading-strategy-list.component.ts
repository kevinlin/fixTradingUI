import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { TradingStrategyListDataSource } from './trading-strategy-list-datasource';

@Component({
  selector: 'trading-strategy-list',
  templateUrl: './trading-strategy-list.component.html',
  styleUrls: ['./trading-strategy-list.component.css']
})
export class TradingStrategyListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: TradingStrategyListDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name'];

  ngOnInit() {
    this.dataSource = new TradingStrategyListDataSource(this.paginator, this.sort);
  }
}
