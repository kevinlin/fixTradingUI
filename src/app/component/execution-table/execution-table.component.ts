import { Component, Input, OnInit } from '@angular/core';
import { TradingExecution } from '../../model/trading-execution';

@Component({
  selector: 'app-execution-table',
  templateUrl: './execution-table.component.html',
  styleUrls: ['./execution-table.component.css']
})
export class ExecutionTableComponent implements OnInit {

  @Input() symbol: string;
  @Input() executions: TradingExecution[];

  columns = [
    {
      title: 'Symbol',
      data: 'symbol',
      type: 'text',
      readOnly: true
    },
    {
      title: 'Side',
      data: 'side',
      type: 'dropdown',
      strict: true,
      source: ['BID', 'ASK']
    },
    {
      title: 'Time',
      data: 'time',
      type: 'time',
      timeFormat: 'h:mm a',
      correctFormat: true
    },
    {
      title: 'Lots',
      data: 'lots',
      type: 'numeric',
      format: '0,0'
    },
    {
      title: 'State',
      data: 'state',
      type: 'text',
      readOnly: true
    }
  ];
  options = {
    height: 488,
    rowHeaders: false,
    stretchH: 'none',
    startRows: 20,
    columnSorting: false,
    contextMenu: true,
    className: 'htCenter htMiddle',
    readOnly: false
  };

  constructor() {
  }

  ngOnInit() {
  }

  // Event handler
  onAfterChange = (hot: any, changes: any, source: any) => {
    console.log('onAfterChange()->', changes, hot, source);
    if (source === 'edit') {
      changes.forEach((change) => {
        const orderChanged: TradingExecution = this.executions[change[0]];
        console.log('onAfterChange()->execution changed: ', orderChanged);
      });
    }
  };

}
