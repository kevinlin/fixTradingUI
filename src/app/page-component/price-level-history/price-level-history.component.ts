import {ApplicationRef, Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {HotTableRegisterer} from '@handsontable-pro/angular';
import {Observable} from 'rxjs';
import {StrategyPriceLevel} from '../../model/strategy-price-level';
import {TradingStrategy} from '../../model/trading-strategy';
import {StompClientService} from '../../service/stomp-client.service';
import {StrategyPriceLevelService} from '../../service/strategy-price-level.service';
import {TradingStrategyService} from '../../service/trading-strategy.service';
import {ToastsManager} from '../../toast/toasts-manager.service';
import {BasePageComponent} from '../base-page-component';

@Component({
  selector: 'app-price-level-history',
  templateUrl: './price-level-history.component.html',
  styleUrls: ['./price-level-history.component.css']
})
export class PriceLevelHistoryComponent extends BasePageComponent implements OnInit, OnDestroy {

  isLoading = false;
  allStrategies: Observable<TradingStrategy[]>;
  selectedStrategy: TradingStrategy;
  priceLevelIntervals = [1, 2, 3, 5, 10, 15, 30];
  selectedInterval: number;
  historyPriceLevels: StrategyPriceLevel[];
  startDate: Date;
  endDate: Date;

  hotId = 'historyPriceLevels';
  columns = [
    {
      title: '策略名',
      data: 'tradingStrategy.name',
      type: 'text'
    },
    {
      title: '时间戳',
      data: 'timestamp',
      type: 'text'
    },
    {
      title: '成交价差',
      data: 'tradePriceLevel',
      type: 'numeric',
      format: '0,0'
    },
    {
      title: '做多价差',
      data: 'longPriceLevel',
      type: 'numeric',
      format: '0,0'
    },
    {
      title: '做空价差',
      data: 'shortPriceLevel',
      type: 'numeric',
      format: '0,0'
    }
  ];
  options = {
    className: 'htCenter htMiddle',
    columnSorting: false,
    contextMenu: true,
    height: 600,
    manualColumnResize: true,
    observeChanges: true,
    readOnly: true,
    rowHeaders: false,
    startRows: 10,
    stretchH: 'all'
  };

  constructor(protected stompClient: StompClientService, protected toastr: ToastsManager, protected appRef: ApplicationRef, protected dialog: MatDialog,
              private strategyService: TradingStrategyService, private strategyPriceLevelService: StrategyPriceLevelService, private hotRegisterer: HotTableRegisterer) {
    super(stompClient, toastr, appRef, dialog);
    this.allStrategies = strategyService.dataSubject;
  }

  ngOnInit() {
    this.baseOnInit();
  }

  queryPriceLevels() {
    this.isLoading = true;
    this.strategyPriceLevelService.getHistoryPriceLevels(this.selectedStrategy, this.selectedInterval, this.startDate, this.endDate).subscribe(priceLevels => {
      this.historyPriceLevels = priceLevels;
      this.isLoading = false;
    });
  }

  exportCSV() {
    this.hotRegisterer
      .getInstance(this.hotId)
      .getPlugin('exportFile')
      .downloadFile('csv', {
        columnHeaders: true,
        filename: 'historyPriceLevels_[YYYY][MM][DD]'
      });
  }

}
