import {Component, Input, OnInit} from '@angular/core';
import {Instrument} from '../../model/instrument';
import {InstrumentService} from '../../service/instrument.service';

@Component({
  selector: 'app-instrument-details',
  templateUrl: './instrument-details.component.html',
  styleUrls: ['./instrument-details.component.css']
})
export class InstrumentDetailsComponent implements OnInit {

  @Input() instrument: Instrument;

  constructor(private instrumentService: InstrumentService) {
  }

  ngOnInit(): void {
  }

  onHiddenToggle() {
    console.log('onHiddenToggle()->', this.instrument.symbol, this.instrument.hidden);
    if (this.instrument.hidden) {
      this.instrumentService.hideInstrument(this.instrument.symbol).subscribe(() => {
      });
    } else {
      this.instrumentService.unhideInstrument(this.instrument.symbol).subscribe(() => {
      });
    }
  }

}
