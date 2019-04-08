import {ApplicationRef, Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSort} from '@angular/material';
import {Observable} from 'rxjs/internal/Observable';
import {TradingOperation} from '../../model/trading-operation';

import {TradingStrategy} from '../../model/trading-strategy';
import {StompClientService} from '../../service/stomp-client.service';
import {TradingOperationService} from '../../service/trading-operation.service';
import {TradingStrategyService} from '../../service/trading-strategy.service';
import {ToastsManager} from '../../toast/toasts-manager.service';
import {BasePageComponent} from '../base-page-component';
import {TradingOperationListDataSource} from './trading-operation-list-data-source';

@Component({
  selector: 'app-trading-execution-list',
  templateUrl: './trading-operation-list.component.html',
  styleUrls: ['./trading-operation-list.component.css']
})
export class TradingOperationListComponent extends BasePageComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  allStrategies: Observable<TradingStrategy[]>;
  selectedStrategy: TradingStrategy;
  selectedOperation: TradingOperation;
  dataSource: TradingOperationListDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'strategy', 'date', 'direction', 'operationType', 'conditional', 'position', 'state', 'action'];

  constructor(protected stompClient: StompClientService, protected toastr: ToastsManager, protected appRef: ApplicationRef, protected dialog: MatDialog,
              private strategyService: TradingStrategyService, private operationService: TradingOperationService) {
    super(stompClient, toastr, appRef, dialog);
    this.allStrategies = strategyService.dataSubject;
  }

  ngOnInit() {
    this.baseOnInit();
    this.dataSource = new TradingOperationListDataSource(this.selectedStrategy, this.operationService, this.paginator, this.sort);
  }

  selectedStrategyChanged() {
    this.dataSource = new TradingOperationListDataSource(this.selectedStrategy, this.operationService, this.paginator, this.sort);
    this.selectedOperation = null;
  }

  newOperation() {
    this.selectedOperation = new TradingOperation();
    this.selectedOperation.tradingStrategy = this.selectedStrategy;
    this.selectedOperation.conditional = false;
    this.selectedOperation.greaterThan = true;
	this.selectedOperation.passive = false;
  }

  edit(toEdit: TradingOperation) {
    this.selectedOperation = toEdit;
    this.selectedStrategy = toEdit.tradingStrategy;
  }

  delete(toDelete: TradingOperation) {
    if (this.selectedOperation === toDelete) {
      this.selectedOperation = null;
    }

    this.operationService.delete(toDelete).subscribe(result => {
      // this.snackBar.open('Trading Execution: \'' + toDelete.tradingStrategy.name + '\'' + '-' + toDelete.date, 'deleted', { duration: 3000 });
      this.toastr.success('Trading Operation: \'' + toDelete.tradingStrategy.name + '\'' + '-' + toDelete.date + ' deleted.');
    });
  }

  suspend(toSuspend: TradingOperation) {
    this.operationService.suspend(toSuspend).subscribe(result => {
      // this.toastr.success('Trading Operation: \'' + toSuspend.tradingStrategy.name + '\'' + '-' + toSuspend.date + ' suspended.');
    });
  }

  resume(toResume: TradingOperation) {
    this.operationService.resume(toResume).subscribe(result => {
      // this.toastr.success('Trading Operation: \'' + toResume.tradingStrategy.name + '\'' + '-' + toResume.date + ' resumed.');
    });
  }

}
