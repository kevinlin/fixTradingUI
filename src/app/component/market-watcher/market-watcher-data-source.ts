import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatSort } from '@angular/material';
import { merge, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { MarketData } from '../../model/market-data';
import { MarketDataService } from '../../service/market-data.service';

/**
 * Data source for the MarketWatcher view. This class should encapsulate all logic for fetching and manipulating the displayed data (including sorting, pagination, and filtering).
 */
export class MarketWatcherDataSource extends DataSource<MarketData> {
  data: MarketData[] = [];

  constructor(private marketDataService: MarketDataService, private paginator: MatPaginator, private sort: MatSort) {
    super();
    this.marketDataService.latestMarketDataSubject.subscribe(latestMarketData => this.data = latestMarketData);
    this.marketDataService.refreshAll();
  }

  /**
   * Connect this data source to the table. The table will only update when the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<MarketData[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      this.marketDataService.latestMarketDataSubject,
      this.paginator.page,
      this.sort.sortChange
    ];

    // Set the paginators length
    this.paginator.length = this.data.length;

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
  }

  /**
   * Called when the table is being destroyed. Use this function, to clean up any open connections or free any held resources that were set up during connect.
   */
  disconnect() {
  }

  /**
   * Paginate the data (client-side). If you're using server-side pagination, this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: MarketData[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting, this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: MarketData[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'symbol':
          return compare(a.symbol, b.symbol, isAsc);
        case 'topBidPrice':
          return compare(+a.bestBid.price, +b.bestBid.price, isAsc);
        case 'topBidSize':
          return compare(+a.bestBid.size, +b.bestBid.size, isAsc);
        case 'topBidTime':
          return compare(+a.bestBid.timestamp, +b.bestBid.timestamp, isAsc);
        case 'topAskPrice':
          return compare(+a.bestAsk.price, +b.bestAsk.price, isAsc);
        case 'topAskSize':
          return compare(+a.bestAsk.size, +b.bestAsk.size, isAsc);
        case 'topAskTime':
          return compare(+a.bestAsk.timestamp, +b.bestAsk.timestamp, isAsc);
        default:
          return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
