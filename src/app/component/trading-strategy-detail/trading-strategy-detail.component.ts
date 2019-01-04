import {ApplicationRef, Component, Input, OnInit} from '@angular/core';
import {HotTableRegisterer} from '@handsontable-pro/angular';
import {Observable} from 'rxjs';

import {AppComponent} from '../../app.component';
import {Direction} from '../../model/enum/direction.enum';
import {Instrument} from '../../model/instrument';
import {TradingStrategy} from '../../model/trading-strategy';
import {InstrumentService} from '../../service/instrument.service';
import {TradingStrategyService} from '../../service/trading-strategy.service';
import {ToastsManager} from '../../toast/toasts-manager.service';

@Component({
  selector: 'app-trading-strategy-detail',
  templateUrl: './trading-strategy-detail.component.html',
  styleUrls: ['./trading-strategy-detail.component.css']
})
export class TradingStrategyDetailComponent implements OnInit {

  @Input() selectedStrategy: TradingStrategy;

  allInstruments: Observable<Instrument[]>;
  DirectionValues = Object.values(Direction).filter(e => typeof (e) === 'string');

  recordHistory = false;
  historyPriceLevels = [];
  hotId = 'historyPriceLevels';
  columns = [
    {
      title: '策略名',
      data: 'name',
      type: 'text',
      readOnly: true
    },
    {
      title: '时间',
      data: 'timestamp',
      type: 'time',
      timeFormat: 'HH:mm:ss',
      correctFormat: true
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
    height: 250,
    rowHeaders: false,
    stretchH: 'all',
    startRows: 10,
    columnSorting: false,
    contextMenu: true,
    className: 'htCenter htMiddle',
    observeChanges: true,
    readOnly: false
  };

  constructor(private appRef: ApplicationRef,
              private hotRegisterer: HotTableRegisterer,
              private instrumentService: InstrumentService,
              private strategyService: TradingStrategyService,
              private toastr: ToastsManager) {
    this.allInstruments = this.instrumentService.getAllInstruments();
    this.toastr.setRootViewContainerRef((appRef.components[0].instance as AppComponent).viewRef);
  }

  ngOnInit() {
    this.strategyService.dataSubject.subscribe(strategies => {
      if (this.recordHistory) {
        const latestStrategy = strategies.find(stg => stg.name === this.selectedStrategy.name);
        if (latestStrategy && latestStrategy.timestamp !== this.selectedStrategy.timestamp) {
          this.historyPriceLevels.push({
            name: latestStrategy.name,
            timestamp: latestStrategy.timestamp,
            longPriceLevel: latestStrategy.longPriceLevel,
            shortPriceLevel: latestStrategy.shortPriceLevel
          });
        }
      }
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

  saveStrategy() {
    this.strategyService.save(this.selectedStrategy).subscribe(result => {
      this.selectedStrategy = result;
      // this.snackBar.open('Trading Strategy: \'' + this.selectedStrategy.name + '\'', 'saved', { duration: 3000 });
      this.toastr.success('Trading Strategy: \'' + this.selectedStrategy.name + '\' saved');
    });
  }

  cancelChanges() {
    this.selectedStrategy = null;
  }

}
