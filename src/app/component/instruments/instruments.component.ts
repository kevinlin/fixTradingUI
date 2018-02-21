import {Component, OnInit} from '@angular/core';
import {OnDestroy} from '@angular/core/src/metadata/lifecycle_hooks';
import {MatSnackBar} from '@angular/material';
import {Observable} from 'rxjs/Observable';
import {Instrument} from '../../model/instrument';
import {InstrumentService} from '../../service/instrument.service';
import {StompClientService} from '../../service/stomp-client.service';
import {BaseComponent} from '../base-component';

@Component({
  selector: 'app-instruments',
  templateUrl: './instruments.component.html',
  styleUrls: ['./instruments.component.css']
})
export class InstrumentsComponent extends BaseComponent implements OnInit, OnDestroy {

  constructor(stompClient: StompClientService, snackBar: MatSnackBar, private instrumentService: InstrumentService) {
    super(stompClient, snackBar);
  }

  public sgxInstruments: Observable<Instrument[]>;
  public dceInstruments: Observable<Instrument[]>;
  public selectedSgxInstrument: Instrument;
  public selectedDceInstrument: Instrument;

  ngOnInit() {
    this.baseOnInit();
    console.log('InstrumentsComponent onInit');
    this.sgxInstruments = this.instrumentService.getInstruments('SGX');
    this.dceInstruments = this.instrumentService.getInstruments('DCE');
  }

  ngOnDestroy(): void {
    console.log('InstrumentsComponent onDestroy');
  }

}
