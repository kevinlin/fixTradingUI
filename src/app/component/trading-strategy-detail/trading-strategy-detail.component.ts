import { ApplicationRef, Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { AppComponent } from '../../app.component';
import { Direction } from '../../model/enum/direction.enum';
import { Instrument } from '../../model/instrument';
import { TradingStrategy } from '../../model/trading-strategy';
import { InstrumentService } from '../../service/instrument.service';
import { TradingStrategyService } from '../../service/trading-strategy.service';
import { ToastsManager } from '../../toast/toasts-manager.service';

@Component({
  selector: 'app-trading-strategy-detail',
  templateUrl: './trading-strategy-detail.component.html',
  styleUrls: ['./trading-strategy-detail.component.css']
})
export class TradingStrategyDetailComponent implements OnInit {

  @Input() selectedStrategy: TradingStrategy;

  allInstruments: Observable<Instrument[]>;
  DirectionValues = Object.values(Direction).filter(e => typeof(e) == "string");

  constructor(private instrumentService: InstrumentService, private tradingStrategyService: TradingStrategyService, private toastr: ToastsManager, private appRef: ApplicationRef) {
    this.allInstruments = this.instrumentService.getAllInstruments();
    this.toastr.setRootViewContainerRef((appRef.components[0].instance as AppComponent).viewRef);
  }

  ngOnInit() {
  }

  saveStrategy() {
    this.tradingStrategyService.save(this.selectedStrategy).subscribe(result => {
      this.selectedStrategy = result;
      // this.snackBar.open('Trading Strategy: \'' + this.selectedStrategy.name + '\'', 'saved', { duration: 3000 });
      this.toastr.success('Trading Strategy: \'' + this.selectedStrategy.name + '\' saved');
    })
  }

  cancelChanges() {
    this.selectedStrategy = null;
  }

}
