import { Component, OnInit } from '@angular/core';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Message } from '@stomp/stompjs';
import { componentDestroyed } from 'ng2-rx-componentdestroyed';
import { takeUntil } from 'rxjs/operators';

import { TradingParameters } from '../../model/trading-parameters';
import { ParametersService } from '../../service/parameters.service';
import { StompClientService } from '../../service/stomp-client.service';
import { BaseComponent } from '../base-component';

@Component({
  selector: 'app-parameters',
  templateUrl: './parameters.component.html',
  styleUrls: ['./parameters.component.css']
})
export class ParametersComponent extends BaseComponent implements OnInit, OnDestroy {

  constructor(protected stompClient: StompClientService, protected snackBar: MatSnackBar, protected dialog: MatDialog, private parametersService: ParametersService) {
    super(stompClient, snackBar, dialog);
  }

  tradingParameters: TradingParameters;

  ngOnInit() {
    console.log('ParametersComponent onInit()->');
    this.baseOnInit();

    this.tradingParameters = <TradingParameters>{};
    this.parametersService.getParameters().subscribe(parameters => {
      this.tradingParameters = parameters;
    });
    this.stompClient.subscribeTradingParameters()
      .pipe(takeUntil(componentDestroyed(this)))
      .subscribe((message: Message) => {
        const parameters = JSON.parse(message.body);
        console.log(parameters);
        this.tradingParameters = parameters;
        this.snackBar.open('Trading Parameters', 'changed', { duration: 3000 });
      });
  }

  ngOnDestroy(): void {
    console.log('ParametersComponent onDestroy()->');
  }

  saveTradingParameters() {
    console.log(this.tradingParameters);
    this.parametersService.updateParameters(this.tradingParameters).subscribe(
      parameters => {
        this.tradingParameters = parameters;
        this.snackBar.open('Trading Parameters', 'successful saved', { duration: 3000 });
      }
    );
  }

}
