import {DataSource} from '@angular/cdk/collections';
import {MatPaginator, MatSort} from '@angular/material';
import {merge, Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {TradingStrategy} from '../../model/trading-strategy';
import {TradingStrategyService} from '../../service/trading-strategy.service';

/**
 * Data source for the TradingStrategyList view. This class should encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class TradingStrategyListDataSource extends DataSource<TradingStrategy> {
  data: TradingStrategy[] = [];

  constructor(private tradingStrategyService: TradingStrategyService, private paginator: MatPaginator, private sort: MatSort) {
    super();
    this.tradingStrategyService.dataSubject.subscribe(newData => {
      this.data = newData;
    });
  }

  /**
   * Connect this data source to the table. The table will only update when the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<TradingStrategy[]> {
    // Combine everything that affects the rendered data into one updatestream for the data-table to consume.
    const dataMutations = [
      this.tradingStrategyService.dataSubject,
      this.paginator.page,
      this.sort.sortChange
    ];

    // Set the paginators length
    this.paginator.length = this.data.length;

    return merge(...dataMutations).pipe(
      map(() => {
        return this.getPagedData(this.getSortedData([...this.data]));
      })
    );
  }

  /**
   * Called when the table is being destroyed. Use this function, to clean up any open connections or free any held resources that were set up during connect.
   */
  disconnect() {
  }

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: TradingStrategy[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting, this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: TradingStrategy[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'id':
          return compare(+a.id, +b.id, isAsc);
        case 'name':
          return compare(a.name, b.name, isAsc);
        case 'contracts':
          return compare(a.contract1Symbol, b.contract1Symbol, isAsc);
        case 'state':
          return compare(a.state, b.state, isAsc);
        case 'positionDirection':
          return compare(a.positionDirection, b.positionDirection, isAsc);
        case 'marketDirection':
          return compare(a.marketDirection, b.marketDirection, isAsc);
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
