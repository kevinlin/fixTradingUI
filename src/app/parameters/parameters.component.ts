import {Component, OnInit} from '@angular/core';
import {TradingParameters} from '../model/trading-parameters';
import {ParametersService} from '../service/parameters.service';

@Component({
  selector: 'app-parameters',
  templateUrl: './parameters.component.html',
  styleUrls: ['./parameters.component.css']
})
export class ParametersComponent implements OnInit {

  constructor(private parametersService: ParametersService) {
  }

  private tradingParameters: TradingParameters;

  ngOnInit() {
    this.tradingParameters = <TradingParameters>{};
    this.parametersService.getParameters().subscribe(
      parameters => {
        this.tradingParameters = parameters;
      }
    );
  }

  saveTradingParameters() {
    console.log(this.tradingParameters);
    this.parametersService.updateParameters(this.tradingParameters).subscribe(
      parameters => {
        this.tradingParameters = parameters;
      }
    );
  }

}
