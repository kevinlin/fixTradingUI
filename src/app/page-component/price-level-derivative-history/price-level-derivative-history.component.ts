import {ApplicationRef, Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {HotTableRegisterer} from '@handsontable-pro/angular';
import {Observable} from 'rxjs';
import {PriceLevelDerivative} from '../../model/price-level-derivative';
import {TradingStrategy} from '../../model/trading-strategy';
import {PriceLevelDerivativeService} from '../../service/price-level-derivative.service';
import {StompClientService} from '../../service/stomp-client.service';
import {TradingStrategyService} from '../../service/trading-strategy.service';
import {ToastsManager} from '../../toast/toasts-manager.service';
import {BasePageComponent} from '../base-page-component';

@Component({
  selector: 'app-price-level-derivative-history',
  templateUrl: './price-level-derivative-history.component.html',
  styleUrls: ['./price-level-derivative-history.component.css']
})
export class PriceLevelDerivativeHistoryComponent extends BasePageComponent implements OnInit {

  isLoading = false;
  allStrategies: Observable<TradingStrategy[]>;
  selectedStrategy: TradingStrategy;
  priceLevelDerivativeHistory: PriceLevelDerivative[];

  hotId = 'priceLevelDerivativeHistory';
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
      title: '均值参数1',
      data: 'mean1',
      type: 'numeric',
      format: '0,0'
    },
    {
      title: '均值参数2',
      data: 'mean2',
      type: 'numeric',
      format: '0,0'
    },
    {
      title: '均值差',
      data: 'meanSpread',
      type: 'numeric',
      format: '0,0'
    },
    {
      title: '标准差参数',
      data: 'meanSpreadStdDev',
      type: 'numeric',
      format: '0,0'
    },
    {
      title: '均值参数',
      data: 'meanSpreadAverage',
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
              private strategyService: TradingStrategyService, private priceLevelDerivativeService: PriceLevelDerivativeService, private hotRegisterer: HotTableRegisterer) {
    super(stompClient, toastr, appRef, dialog);
    this.allStrategies = strategyService.dataSubject;
  }

  ngOnInit() {
    this.baseOnInit();
  }

  queryPriceLevelDerivativeHistory() {
    this.isLoading = true;
    this.priceLevelDerivativeService.getPriceLevelDerivativeHistory(this.selectedStrategy).subscribe(priceLevelDrivativeHistory => {
      this.priceLevelDerivativeHistory = priceLevelDrivativeHistory;
      this.isLoading = false;
    });
  }

  exportCSV() {
    this.hotRegisterer
      .getInstance(this.hotId)
      .getPlugin('exportFile')
      .downloadFile('csv', {
        columnHeaders: true,
        filename: 'priceLevelDerivativeHistory_[YYYY][MM][DD]'
      });
  }

}
