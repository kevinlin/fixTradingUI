import {ApplicationRef, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort} from '@angular/material';
import {AppComponent} from '../../app.component';
import {MarketData} from '../../model/market-data';
import {MarketDataService} from '../../service/market-data.service';
import {ToastsManager} from '../../toast/toasts-manager.service';
import {MarketWatcherDataSource} from './market-watcher-data-source';

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
  displayedColumns = ['symbol', 'topBidTime', 'topBidSize', 'topBidPrice', 'topAskPrice', 'topAskSize', 'topAskTime', 'unsubscribe'];

  constructor(private marketDataService: MarketDataService, private toastr: ToastsManager, private appRef: ApplicationRef) {
    this.toastr.setRootViewContainerRef((appRef.components[0].instance as AppComponent).viewRef);
  }

  ngOnInit() {
    this.dataSource = new MarketWatcherDataSource(this.marketDataService, this.paginator, this.sort);
  }

  unsubscribe(marketData: MarketData) {
    this.marketDataService.unsubscribe(marketData.symbol).subscribe(result => {
      // this.snackBar.open('Market Data for: \'' + marketData.symbol + '\'', 'unsubscribed', { duration: 3000 });
      this.toastr.success('Market Data for: \'' + marketData.symbol + '\' unsubscribed');
    });
  }


}
