import {AfterViewInit, ApplicationRef, Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {plainToClass} from 'class-transformer';

import {TradingStrategy} from '../../model/trading-strategy';
import {StompClientService} from '../../service/stomp-client.service';
import {TradingStrategyService} from '../../service/trading-strategy.service';
import {ToastsManager} from '../../toast/toasts-manager.service';
import {BasePageComponent} from '../base-page-component';

@Component({
  selector: 'app-trading-strategy-list',
  templateUrl: './trading-strategy-list.component.html',
  styleUrls: ['./trading-strategy-list.component.css']
})
export class TradingStrategyListComponent extends BasePageComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  public dataSource: MatTableDataSource<TradingStrategy>;
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name', 'contracts', 'longPriceLevel', 'shortPriceLevel', 'state', 'positionDirection', 'position', 'marketDirection', 'action'];

  selectedStrategy: TradingStrategy;

  constructor(protected stompClient: StompClientService, protected toastr: ToastsManager, protected appRef: ApplicationRef, protected dialog: MatDialog,
              private tradingStrategyService: TradingStrategyService) {
    super(stompClient, toastr, appRef, dialog);
  }

  ngOnInit() {
    this.baseOnInit();
    this.dataSource = new MatTableDataSource([]);
    this.tradingStrategyService.dataSubject.subscribe(newData => {
      this.dataSource.data = newData;
    });
  }

  /**
   * Set the paginator and sort after the view init since this component will be able to query its view for the initialized paginator and sort.
   */
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
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

    this.tradingStrategyService.delete(toDelete).subscribe(() => {
      // this.snackBar.open('Trading Strategy: \'' + toDelete.name + '\'', 'deleted', { duration: 3000 });
      this.toastr.success('Trading Strategy: \'' + toDelete.name + '\' deleted.');
    });
  }

}
