import {Component, OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material';

import {TradingParameters} from '../../model/trading-parameters';
import {ParametersService} from '../../service/parameters.service';
import {StompClientService} from '../../service/stomp-client.service';

@Component({
  selector: 'app-parameters',
  templateUrl: './parameters.component.html',
  styleUrls: ['./parameters.component.css']
})
export class ParametersComponent implements OnInit {

  constructor(private parametersService: ParametersService, private stompClient: StompClientService, private snackBar: MatSnackBar) {
  }

  tradingParameters: TradingParameters;

  ngOnInit() {
    this.tradingParameters = <TradingParameters>{};
    this.parametersService.getParameters().subscribe(parameters => {
      this.tradingParameters = parameters;
    });
    this.stompClient.subscribeTradingParameters(parameters => {
      this.snackBar.open('Trading Parameters', 'changed', {duration: 3000});
      console.log(parameters);
      this.tradingParameters = parameters;
    });
  }

  saveTradingParameters() {
    console.log(this.tradingParameters);
    this.parametersService.updateParameters(this.tradingParameters).subscribe(
      parameters => {
        this.tradingParameters = parameters;
        this.snackBar.open('Trading Parameters', 'successful saved', {duration: 3000});
      }
    );
  }

}
