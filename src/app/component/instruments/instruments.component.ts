import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Instrument} from '../../model/instrument';
import {InstrumentService} from '../../service/instrument.service';

@Component({
  selector: 'app-instruments',
  templateUrl: './instruments.component.html',
  styleUrls: ['./instruments.component.css']
})
export class InstrumentsComponent implements OnInit {

  constructor(private instrumentService: InstrumentService) {
  }

  public sgxInstruments: Observable<Instrument[]>;
  public dceInstruments: Observable<Instrument[]>;
  public selectedSgxInstrument: Instrument;
  public selectedDceInstrument: Instrument;

  ngOnInit() {
    this.sgxInstruments = this.instrumentService.getInstruments('SGX');
    this.dceInstruments = this.instrumentService.getInstruments('DCE');
  }

}
