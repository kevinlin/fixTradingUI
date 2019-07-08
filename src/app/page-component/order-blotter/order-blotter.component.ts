import {ApplicationRef, Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSort} from '@angular/material';
import {OrderService} from '../../service/order.service';
import {StompClientService} from '../../service/stomp-client.service';
import {ToastsManager} from '../../toast/toasts-manager.service';

import {BasePageComponent} from '../base-page-component';
import {BaseOrderBlotterDatasource} from './base-order-blotter-datasource';

class OrderBlotterDataSource extends BaseOrderBlotterDatasource {
  constructor(private orderService: OrderService, protected paginator: MatPaginator, protected sort: MatSort) {
    super(orderService.historyOrderSubject, paginator, sort);
  }
}

@Component({
  selector: 'app-order-blotter',
  templateUrl: './order-blotter.component.html',
  styleUrls: ['./order-blotter.component.css'],
})
export class OrderBlotterComponent extends BasePageComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  dataSource: OrderBlotterDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['date', 'strategy', 'symbol', 'clOrdID', 'orderID', 'side', 'price', 'size', 'status', 'transactTime', 'text'];

  queryDate: Date;
  isLoading = false;

  constructor(protected stompClient: StompClientService, protected toastr: ToastsManager, protected appRef: ApplicationRef, protected dialog: MatDialog, private orderService: OrderService) {
    super(stompClient, toastr, appRef, dialog);
  }

  ngOnInit() {
    this.baseOnInit();
    this.dataSource = new OrderBlotterDataSource(this.orderService, this.paginator, this.sort);
  }

  public queryOrders() {
    this.isLoading = true;
    this.orderService.queryOrdersByDate(this.queryDate).subscribe(() => this.isLoading = false);
  }

}
