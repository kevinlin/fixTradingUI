import {ApplicationRef, Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {AppComponent} from '../../app.component';
import {IntradayTradingParameter} from '../../model/intraday-trading-parameter';
import {TradingStrategy} from '../../model/trading-strategy';
import {IntradayTradingParameterService} from '../../service/intraday-trading-parameter.service';
import {TradingStrategyService} from '../../service/trading-strategy.service';
import {ToastsManager} from '../../toast/toasts-manager.service';

@Component({
  selector: 'app-intraday-trading-parameter-detail',
  templateUrl: './intraday-trading-parameter-detail.component.html',
  styleUrls: ['./intraday-trading-parameter-detail.component.css']
})
export class IntradayTradingParameterDetailComponent implements OnInit {

  @Input() parameter: IntradayTradingParameter;
  private allStrategies: Observable<TradingStrategy[]>;

  constructor(private prameterService: IntradayTradingParameterService, private strategyService: TradingStrategyService, private toastr: ToastsManager, private appRef: ApplicationRef) {
    this.toastr.setRootViewContainerRef((appRef.components[0].instance as AppComponent).viewRef);
  }

  ngOnInit() {
    this.allStrategies = this.strategyService.activeStrategiesSubject;
  }

  saveParameter() {
    this.prameterService.save(this.parameter).subscribe(savedParameter => {
      this.parameter = savedParameter;

      this.toastr.success('Intraday Trading Parameter: \'' + this.parameter.tradingStrategy.name + '\'' + ' saved.');
    });
  }

  cancelChanges() {
    this.parameter = null;
  }


}
