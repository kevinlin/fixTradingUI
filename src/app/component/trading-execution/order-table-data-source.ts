import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatSort } from '@angular/material';
import { merge, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Order } from '../../model/order';
import { TradingOperation } from '../../model/trading-operation';
import { OrderService } from '../../service/order.service';

/**
 * Data source for the TradingOperationList view. This class should encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class OrderTableDataSource extends DataSource<Order> {
  data: Order[] = [];

  constructor(private selectedOperation: TradingOperation, private orderService: OrderService, private paginator: MatPaginator, private sort: MatSort) {
    super();
    this.orderService.todayOrdersSubject.subscribe(newData => {
      this.data = newData.filter(order => {
        return !this.selectedOperation || order.tradingOperation.id === this.selectedOperation.id;
      });
    });
    this.orderService.refreshTodayOrders();
  }

  /**
   * Connect this data source to the table. The table will only update when the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<Order[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      this.orderService.todayOrdersSubject,
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
  private getPagedData(data: Order[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting, this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: Order[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'clOrdID':
          return compare(+a.clOrdID, +b.clOrdID, isAsc);
        case 'date':
          return compare(a.date, b.date, isAsc);
        case 'transactTime':
          return compare(a.transactTime, b.transactTime, isAsc);
        case 'side':
          return compare(a.side, b.side, isAsc);
        case 'price':
          return compare(a.price, b.price, isAsc);
        case 'size':
          return compare(a.size, b.size, isAsc);
        case 'status':
          return compare(a.ordStatus, b.ordStatus, isAsc);
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
