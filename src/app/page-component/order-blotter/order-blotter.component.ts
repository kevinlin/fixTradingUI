import {AfterViewInit, ApplicationRef, Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {Order} from '../../model/order';
import {OrderService} from '../../service/order.service';
import {StompClientService} from '../../service/stomp-client.service';
import {ToastsManager} from '../../toast/toasts-manager.service';

import {BasePageComponent} from '../base-page-component';

@Component({
  selector: 'app-order-blotter',
  templateUrl: './order-blotter.component.html',
  styleUrls: ['./order-blotter.component.css'],
})
export class OrderBlotterComponent extends BasePageComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  dataSource: MatTableDataSource<Order>;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['date', 'strategy', 'symbol', 'clOrdID', 'orderID', 'side', 'price', 'size', 'status', 'transactTime', 'text'];

  queryDate: Date;
  isLoading = false;

  constructor(protected stompClient: StompClientService, protected toastr: ToastsManager, protected appRef: ApplicationRef, protected dialog: MatDialog, private orderService: OrderService) {
    super(stompClient, toastr, appRef, dialog);
  }

  ngOnInit() {
    this.baseOnInit();
    this.dataSource = new MatTableDataSource([]);
    this.orderService.historyOrderSubject.subscribe(orders => {
      this.dataSource.data = orders;
    });
  }

  /**
   * Set the paginator and sort after the view init since this component will be able to query its view for the initialized paginator and sort.
   */
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  public queryOrders() {
    this.isLoading = true;
    this.orderService.queryOrdersByDate(this.queryDate).subscribe(() => this.isLoading = false);
  }

}
