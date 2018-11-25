import {ApplicationRef, Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSort} from '@angular/material';
import {plainToClass} from 'class-transformer';

import {TradingStrategy} from '../../model/trading-strategy';
import {StompClientService} from '../../service/stomp-client.service';
import {TradingStrategyService} from '../../service/trading-strategy.service';
import {ToastsManager} from '../../toast/toasts-manager.service';
import {BasePageComponent} from '../base-page-component';
import {TradingStrategyListDataSource} from './trading-strategy-list-datasource';

@Component({
  selector: 'app-trading-strategy-list',
  templateUrl: './trading-strategy-list.component.html',
  styleUrls: ['./trading-strategy-list.component.css']
})
export class TradingStrategyListComponent extends BasePageComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public dataSource: TradingStrategyListDataSource;
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name', 'contracts', 'state', 'positionDirection', 'marketDirection', 'action'];

  selectedStrategy: TradingStrategy;

  constructor(protected stompClient: StompClientService, protected toastr: ToastsManager, protected appRef: ApplicationRef, protected dialog: MatDialog,
              private tradingStrategyService: TradingStrategyService) {
    super(stompClient, toastr, appRef, dialog);
  }

  ngOnInit() {
    this.baseOnInit();
    this.dataSource = new TradingStrategyListDataSource(this.tradingStrategyService, this.paginator, this.sort);
  }

  newStrategy() {
    this.selectedStrategy = new TradingStrategy();
  }

  editStrategy(toEdit: TradingStrategy) {
    this.selectedStrategy = plainToClass(TradingStrategy, toEdit);
  }

  deleteStrategy(toDelete: TradingStrategy) {
    if (this.selectedStrategy === toDelete) {
      this.selectedStrategy = null;
    }

    this.tradingStrategyService.delete(toDelete).subscribe(result => {
      // this.snackBar.open('Trading Strategy: \'' + toDelete.name + '\'', 'deleted', { duration: 3000 });
      this.toastr.success('Trading Strategy: \'' + toDelete.name + '\' deleted.');
    });
  }

}
