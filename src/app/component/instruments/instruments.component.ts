import { ApplicationRef, Component, OnInit } from '@angular/core';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { MatDialog } from '@angular/material';
import { Observable } from 'rxjs';
import { Instrument } from '../../model/instrument';
import { InstrumentService } from '../../service/instrument.service';
import { StompClientService } from '../../service/stomp-client.service';
import { ToastsManager } from '../../toast/toasts-manager.service';
import { BaseComponent } from '../base-component';

@Component({
  selector: 'app-instruments',
  templateUrl: './instruments.component.html',
  styleUrls: ['./instruments.component.css']
})
export class InstrumentsComponent extends BaseComponent implements OnInit, OnDestroy {

  constructor(protected stompClient: StompClientService, protected toastr: ToastsManager, protected appRef: ApplicationRef, protected dialog: MatDialog, private instrumentService: InstrumentService) {
    super(stompClient, toastr, appRef, dialog);
  }

  public shfeInstruments: Observable<Instrument[]>;
  public dceInstruments: Observable<Instrument[]>;
  public selectedShfeInstrument: Instrument;
  public selectedDceInstrument: Instrument;

  ngOnInit() {
    console.log('InstrumentsComponent onInit()->');
    this.baseOnInit();
    this.shfeInstruments = this.instrumentService.getInstruments('SHFE');
    this.dceInstruments = this.instrumentService.getInstruments('DCE');
  }

  ngOnDestroy(): void {
    console.log('InstrumentsComponent onDestroy()->');
  }

}
