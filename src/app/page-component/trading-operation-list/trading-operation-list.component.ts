import {AfterViewInit, ApplicationRef, Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {Observable} from 'rxjs/internal/Observable';
import {TradingOperation} from '../../model/trading-operation';

import {TradingStrategy} from '../../model/trading-strategy';
import {StompClientService} from '../../service/stomp-client.service';
import {TradingOperationService} from '../../service/trading-operation.service';
import {TradingStrategyService} from '../../service/trading-strategy.service';
import {ToastsManager} from '../../toast/toasts-manager.service';
import {BasePageComponent} from '../base-page-component';

@Component({
  selector: 'app-trading-execution-list',
  templateUrl: './trading-operation-list.component.html',
  styleUrls: ['./trading-operation-list.component.css']
})
export class TradingOperationListComponent extends BasePageComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  allStrategies: Observable<TradingStrategy[]>;
  selectedStrategy: TradingStrategy;
  selectedOperation: TradingOperation;
  dataSource: MatTableDataSource<TradingOperation>;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'strategy', 'date', 'direction', 'operationType', 'conditional', 'position', 'state', 'action'];

  constructor(protected stompClient: StompClientService, protected toastr: ToastsManager, protected appRef: ApplicationRef, protected dialog: MatDialog,
              private strategyService: TradingStrategyService, private operationService: TradingOperationService) {
    super(stompClient, toastr, appRef, dialog);
    this.allStrategies = strategyService.uncompletedStrategiesSubject;
  }

  ngOnInit() {
    this.baseOnInit();
    this.dataSource = new MatTableDataSource([]);
    this.operationService.dataSubject.subscribe(newData => {
      this.dataSource.data = newData.filter(operation => !this.selectedStrategy || operation.tradingStrategy.id === this.selectedStrategy.id);
    });
  }

  /**
   * Set the paginator and sort after the view init since this component will be able to query its view for the initialized paginator and sort.
   */
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  selectedStrategyChanged() {
    this.selectedOperation = null;
    this.dataSource.data = this.dataSource.data.filter(operation => !this.selectedStrategy || operation.tradingStrategy.id === this.selectedStrategy.id);
  }

  newOperation() {
    this.selectedOperation = new TradingOperation();
    this.selectedOperation.tradingStrategy = this.selectedStrategy;
    this.selectedOperation.conditional = false;
    this.selectedOperation.greaterThan = true;
  }

  edit(toEdit: TradingOperation) {
    this.selectedOperation = toEdit;
    this.selectedStrategy = toEdit.tradingStrategy;
  }

  delete(toDelete: TradingOperation) {
    if (this.selectedOperation === toDelete) {
      this.selectedOperation = null;
    }

    this.operationService.delete(toDelete).subscribe(() => {
      // this.snackBar.open('Trading Execution: \'' + toDelete.tradingStrategy.name + '\'' + '-' + toDelete.date, 'deleted', { duration: 3000 });
      this.toastr.success('Trading Operation: \'' + toDelete.tradingStrategy.name + '\'' + '-' + toDelete.date + ' deleted.');
    });
  }

  suspend(toSuspend: TradingOperation) {
    this.operationService.suspend(toSuspend).subscribe(() => {
      // this.toastr.success('Trading Operation: \'' + toSuspend.tradingStrategy.name + '\'' + '-' + toSuspend.date + ' suspended.');
    });
  }

  resume(toResume: TradingOperation) {
    this.operationService.resume(toResume).subscribe(() => {
      // this.toastr.success('Trading Operation: \'' + toResume.tradingStrategy.name + '\'' + '-' + toResume.date + ' resumed.');
    });
  }

}
