import {Component, OnInit} from '@angular/core';
import {InstrumentService} from '../service/instrument.service';
import {Observable} from 'rxjs/Observable';
import {Instrument} from '../model/instrument';

@Component({
  selector: 'app-instruments',
  templateUrl: './instruments.component.html',
  styleUrls: ['./instruments.component.css']
})
export class InstrumentsComponent implements OnInit {

  constructor(private instrumentService: InstrumentService) {
  }

  private sgxInstruments: Observable<Instrument[]>;
  private dceInstruments: Observable<Instrument[]>;
  private selectedSgxInstrument: Instrument;
  private selectedDceInstrument: Instrument;

  ngOnInit() {
    this.sgxInstruments = this.instrumentService.getInstruments('SGX');
    this.dceInstruments = this.instrumentService.getInstruments('DCE');
  }

}
