import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { MarketDataService } from '../../service/market-data.service';
import { MarketWatcherDataSource } from './market-watcher-data-source';

@Component({
  selector: 'app-market-watcher',
  templateUrl: './market-watcher.component.html',
  styleUrls: ['./market-watcher.component.css']
})
export class MarketWatcherComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource: MarketWatcherDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['symbol', 'topBidTime', 'topBidSize', 'topBidPrice', 'topAskPrice', 'topAskSize', 'topAskTime'];

  constructor(private marketDataService: MarketDataService) {
    this.marketDataService.refreshAll();
  }

  ngOnInit() {
    this.dataSource = new MarketWatcherDataSource(this.marketDataService, this.paginator, this.sort);
  }

}
