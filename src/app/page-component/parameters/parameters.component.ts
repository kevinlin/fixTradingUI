import {ApplicationRef, Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Message} from '@stomp/stompjs';
import {takeUntil} from 'rxjs/operators';

import {TradingParameters} from '../../model/trading-parameters';
import {ParametersService} from '../../service/parameters.service';
import {StompClientService} from '../../service/stomp-client.service';
import {ToastsManager} from '../../toast/toasts-manager.service';
import {BasePageComponent} from '../base-page-component';

@Component({
  selector: 'app-parameters',
  templateUrl: './parameters.component.html',
  styleUrls: ['./parameters.component.css']
})
export class ParametersComponent extends BasePageComponent implements OnInit, OnDestroy {

  constructor(protected stompClient: StompClientService, protected toastr: ToastsManager, protected appRef: ApplicationRef, protected dialog: MatDialog,
              private parametersService: ParametersService) {
    super(stompClient, toastr, appRef, dialog);
  }

  tradingParameters: TradingParameters;

  ngOnInit() {
    console.log('ParametersComponent onInit()->');
    this.baseOnInit();

    this.tradingParameters = <TradingParameters>{};
    this.parametersService.getParameters().subscribe(parameters => {
      this.tradingParameters = parameters;
    });
    this.stompClient.tradingParametersObservable
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((message: Message) => {
        const parameters = JSON.parse(message.body);
        console.log(parameters);
        this.tradingParameters = parameters;
        // this.snackBar.open('Trading Parameters', 'changed', { duration: 3000 });
        this.toastr.info('Trading Parameters changed.');
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
        // this.snackBar.open('Trading Parameters', 'successful saved', { duration: 3000 });
        this.toastr.success('Trading Parameters saved.');
      }
    );
  }

}
