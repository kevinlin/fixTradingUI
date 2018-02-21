import {Component, OnInit} from '@angular/core';
import {OnDestroy} from '@angular/core/src/metadata/lifecycle_hooks';
import {MatSnackBar} from '@angular/material';
import {Notification} from '../../model/notification';

import {TradingParameters} from '../../model/trading-parameters';
import {ParametersService} from '../../service/parameters.service';
import {StompClientService} from '../../service/stomp-client.service';

@Component({
  selector: 'app-parameters',
  templateUrl: './parameters.component.html',
  styleUrls: ['./parameters.component.css']
})
export class ParametersComponent implements OnInit, OnDestroy {

  constructor(private parametersService: ParametersService, private stompClient: StompClientService, private snackBar: MatSnackBar) {
  }

  tradingParameters: TradingParameters;

  ngOnInit() {
    console.log('ParametersComponent onInit');
    this.tradingParameters = <TradingParameters>{};
    this.parametersService.getParameters().subscribe(parameters => {
      this.tradingParameters = parameters;
    });
    this.stompClient.subscribeNotification((notification: Notification) => {
      this.snackBar.open(notification.message, notification.action, {duration: 3000});
    });
    this.stompClient.subscribeTradingParameters(parameters => {
      this.snackBar.open('Trading Parameters', 'changed', {duration: 3000});
      console.log(parameters);
      this.tradingParameters = parameters;
    });
  }

  ngOnDestroy(): void {
    console.log('ParametersComponent onDestroy');
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
