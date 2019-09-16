import {ApplicationRef, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSort} from '@angular/material';
import {IntradayTradingParameter} from '../../model/intraday-trading-parameter';
import {TradingStrategy} from '../../model/trading-strategy';
import {IntradayTradingParameterService} from '../../service/intraday-trading-parameter.service';
import {StompClientService} from '../../service/stomp-client.service';
import {ToastsManager} from '../../toast/toasts-manager.service';

import {BasePageComponent} from '../base-page-component';
import {IntradayTradingParameterListDataSource} from './intraday-trading-parameter-list-datasource';

@Component({
  selector: 'app-intraday-trading-parameter-list',
  templateUrl: './intraday-trading-parameter-list.component.html',
  styleUrls: ['./intraday-trading-parameter-list.component.css']
})
export class IntradayTradingParameterListComponent extends BasePageComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  selectedStrategy: TradingStrategy;
  selectedParameter: IntradayTradingParameter;
  dataSource: IntradayTradingParameterListDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'tradingStrategy', 'interval', 'mean1Count', 'mean2Count', 'meanSpreadAverageCount', 'meanSpreadStdDevCount', 'action'];

  constructor(protected stompClient: StompClientService, protected toastr: ToastsManager, protected appRef: ApplicationRef, protected dialog: MatDialog,
              private parameterService: IntradayTradingParameterService) {
    super(stompClient, toastr, appRef, dialog);
  }

  ngOnInit() {
    this.baseOnInit();
    this.dataSource = new IntradayTradingParameterListDataSource(this.parameterService, this.paginator, this.sort);
    this.parameterService.refreshData();
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
