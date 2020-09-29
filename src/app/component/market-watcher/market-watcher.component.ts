import {AfterViewInit, ApplicationRef, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {AppComponent} from '../../app.component';
import {MarketData} from '../../model/market-data';
import {MarketDataService} from '../../service/market-data.service';
import {ToastsManager} from '../../toast/toasts-manager.service';

@Component({
  selector: 'app-market-watcher',
  templateUrl: './market-watcher.component.html',
  styleUrls: ['./market-watcher.component.css']
})
export class MarketWatcherComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  dataSource: MatTableDataSource<MarketData>;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['symbol', 'topBidTime', 'topBidSize', 'topBidPrice', 'topAskPrice', 'topAskSize', 'topAskTime', 'unsubscribe'];

  constructor(private marketDataService: MarketDataService, private toastr: ToastsManager, private appRef: ApplicationRef) {
    this.toastr.setRootViewContainerRef((appRef.components[0].instance as AppComponent).viewRef);
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource([]);
    this.marketDataService.latestMarketDataSubject.subscribe(latestMarketData => this.dataSource.data = latestMarketData);
    this.marketDataService.refreshAll();
  }

  /**
   * Set the paginator and sort after the view init since this component will be able to query its view for the initialized paginator and sort.
   */
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  unsubscribe(marketData: MarketData) {
    this.marketDataService.unsubscribe(marketData.symbol).subscribe(() => {
      // this.snackBar.open('Market Data for: \'' + marketData.symbol + '\'', 'unsubscribed', { duration: 3000 });
      this.toastr.success('Market Data for: \'' + marketData.symbol + '\' unsubscribed');
    });
  }


}
