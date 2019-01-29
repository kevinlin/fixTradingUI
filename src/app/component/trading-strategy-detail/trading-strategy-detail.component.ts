import {ApplicationRef, Component, Input} from '@angular/core';
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
export class TradingStrategyDetailComponent {

  public static KEY_HISOTRYPRICELEVELS = 'TradingStrategyDetailComponent.historyPriceLevels';

  @Input() selectedStrategy: TradingStrategy;

  allInstruments: Observable<Instrument[]>;
  DirectionValues = Object.values(Direction).filter(e => typeof (e) === 'string');

  hotId = 'historyPriceLevels';
  columns = [
    {
      title: '策略名',
      data: 'name',
      type: 'text'
    },
    {
      title: '时间戳',
      data: 'timestampString',
      type: 'text'
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
    height: 250,
    manualColumnResize: true,
    observeChanges: true,
    readOnly: true,
    rowHeaders: false,
    startRows: 10,
    stretchH: 'all'
  };

  constructor(private appRef: ApplicationRef,
              private hotRegisterer: HotTableRegisterer,
              private instrumentService: InstrumentService,
              private strategyService: TradingStrategyService,
              private toastr: ToastsManager) {
    this.allInstruments = this.instrumentService.getAllInstruments();
    this.toastr.setRootViewContainerRef((appRef.components[0].instance as AppComponent).viewRef);
  }

  onChangeRecordHistory() {
    this.strategyService.toggleRecordHistory(this.selectedStrategy);
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
