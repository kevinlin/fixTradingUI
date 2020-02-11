import {AfterViewInit, ApplicationRef, Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {IntradayTradingParameter} from '../../model/intraday-trading-parameter';
import {TradingStrategy} from '../../model/trading-strategy';
import {IntradayTradingParameterService} from '../../service/intraday-trading-parameter.service';
import {StompClientService} from '../../service/stomp-client.service';
import {ToastsManager} from '../../toast/toasts-manager.service';

import {BasePageComponent} from '../base-page-component';

@Component({
  selector: 'app-intraday-trading-parameter-list',
  templateUrl: './intraday-trading-parameter-list.component.html',
  styleUrls: ['./intraday-trading-parameter-list.component.css']
})
export class IntradayTradingParameterListComponent extends BasePageComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  selectedStrategy: TradingStrategy;
  selectedParameter: IntradayTradingParameter;
  dataSource: MatTableDataSource<IntradayTradingParameter>;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'tradingStrategy', 'interval', 'mean1Count', 'mean2Count', 'meanSpreadAverageCount', 'meanSpreadStdDevCount', 'action'];

  constructor(protected stompClient: StompClientService, protected toastr: ToastsManager, protected appRef: ApplicationRef, protected dialog: MatDialog,
              private parameterService: IntradayTradingParameterService) {
    super(stompClient, toastr, appRef, dialog);
  }

  ngOnInit() {
    this.baseOnInit();
    this.dataSource = new MatTableDataSource([]);
    this.parameterService.dataSubject.subscribe(newData => this.dataSource.data = newData);
    this.parameterService.refreshData();
  }

  /**
   * Set the paginator and sort after the view init since this component will be able to query its view for the initialized paginator and sort.
   */
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  newParameter() {
    this.selectedParameter = new IntradayTradingParameter();
  }

  edit(toEdit: IntradayTradingParameter) {
    this.selectedParameter = toEdit;
  }

  delete(toDelete: IntradayTradingParameter) {
    if (this.selectedParameter === toDelete) {
      this.selectedParameter = null;
    }

    this.parameterService.delete(toDelete).subscribe(() => {
      this.toastr.success('Intraday Trading Parameter for: \'' + toDelete.tradingStrategy.name + '\'  deleted.');
    });
  }

}
