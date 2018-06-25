import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatSort } from '@angular/material';
import { merge, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { TradingExecution } from '../../model/trading-execution';
import { TradingStrategy } from '../../model/trading-strategy';
import { TradingExecutionService } from '../../service/trading-execution.service';

/**
 * Data source for the TradingExecutionList view. This class should encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class TradingExecutionListDataSource extends DataSource<TradingExecution> {
  data: TradingExecution[] = [];

  constructor(private selectedStratgy: TradingStrategy, private tradingExecutionService: TradingExecutionService, private paginator: MatPaginator, private sort: MatSort) {
    super();
    this.tradingExecutionService.dataSubject.subscribe(newData => {
      this.data = newData.filter(execution => {
        return !this.selectedStratgy || execution.tradingStrategy.id === this.selectedStratgy.id;
      });
    });
  }

  /**
   * Connect this data source to the table. The table will only update when the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<TradingExecution[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      this.tradingExecutionService.dataSubject,
      this.paginator.page,
      this.sort.sortChange
    ];

    // Set the paginators length
    this.paginator.length = this.data.length;

    return merge(...dataMutations).pipe(
      map(() => {
          return this.getPagedData(this.getSortedData([...this.data]));
        }
      ));
  }

  /**
   * Called when the table is being destroyed. Use this function, to clean up any open connections or free any held resources that were set up during connect.
   */
  disconnect() {
  }

  /**
   * Paginate the data (client-side). If you're using server-side pagination, this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: TradingExecution[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting, this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: TradingExecution[]) {
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
        case 'date':
          return compare(a.date, b.date, isAsc);
        case 'executionAction':
          return compare(a.executionAction, b.executionAction, isAsc);
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
