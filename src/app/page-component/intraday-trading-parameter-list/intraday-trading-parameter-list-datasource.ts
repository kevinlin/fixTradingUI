import {DataSource} from '@angular/cdk/collections';
import {MatPaginator, MatSort} from '@angular/material';
import {merge, Observable, of as observableOf} from 'rxjs';
import {map} from 'rxjs/operators';

import {IntradayTradingParameter} from '../../model/intraday-trading-parameter';
import {IntradayTradingParameterService} from '../../service/intraday-trading-parameter.service';

/**
 * Data source for the IntradayTradingParameterList view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class IntradayTradingParameterListDataSource extends DataSource<IntradayTradingParameter> {
  data: IntradayTradingParameter[] = [];

  constructor(private parameterService: IntradayTradingParameterService, private paginator: MatPaginator, private sort: MatSort) {
    super();
    this.parameterService.dataSubject.subscribe(newData => this.data = newData);
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<IntradayTradingParameter[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    // Set the paginator's length
    this.paginator.length = this.data.length;

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {
  }

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: IntradayTradingParameter[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: IntradayTradingParameter[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'id':
          return compare(+a.id, +b.id, isAsc);
        case 'strategy':
          return compare(a.tradingStrategy.name, b.tradingStrategy.name, isAsc);
        case 'interval':
          return compare(a.interval, b.interval, isAsc);
        case 'mean1Count':
          return compare(a.mean1Count, b.mean1Count, isAsc);
        case 'mean2Count':
          return compare(a.mean2Count, b.mean2Count, isAsc);
        case 'meanSpreadAverageCount':
          return compare(a.meanSpreadAverageCount, b.meanSpreadAverageCount, isAsc);
        case 'meanSpreadStdDevCount':
          return compare(a.meanSpreadStdDevCount, b.meanSpreadStdDevCount, isAsc);
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
