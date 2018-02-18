import {Component, OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material';
import {Observable} from 'rxjs/Observable';
import {Instrument} from '../../model/instrument';
import {Notification} from '../../model/notification';
import {InstrumentService} from '../../service/instrument.service';
import {StompClientService} from '../../service/stomp-client.service';

@Component({
  selector: 'app-instruments',
  templateUrl: './instruments.component.html',
  styleUrls: ['./instruments.component.css']
})
export class InstrumentsComponent implements OnInit {

  constructor(private instrumentService: InstrumentService, private stompClient: StompClientService, private snackBar: MatSnackBar) {
  }

  public sgxInstruments: Observable<Instrument[]>;
  public dceInstruments: Observable<Instrument[]>;
  public selectedSgxInstrument: Instrument;
  public selectedDceInstrument: Instrument;

  ngOnInit() {
    this.sgxInstruments = this.instrumentService.getInstruments('SGX');
    this.dceInstruments = this.instrumentService.getInstruments('DCE');

    this.stompClient.subscribeNotification((notification: Notification) => {
      this.snackBar.open(notification.message, notification.action, {duration: 3000});
    });
  }

}
