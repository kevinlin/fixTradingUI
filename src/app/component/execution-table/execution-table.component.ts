import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';

import {TradingExecution} from '../../model/trading-execution';

@Component({
  selector: 'app-execution-table',
  templateUrl: './execution-table.component.html',
  styleUrls: ['./execution-table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExecutionTableComponent implements OnInit {

  @Input() symbol: string;
  @Input() executions: TradingExecution[];
  @Input() overPriceLevel: number;
  @Input() strategyLots: number;
  @Input() operationLots: number;

  columns = [
    {
      title: '合约',
      data: 'symbol',
      type: 'text',
      readOnly: true
    },
    {
      title: '方向',
      data: 'side',
      type: 'dropdown',
      strict: true,
      source: ['BID', 'ASK']
    },
    {
      title: '时间',
      data: 'time',
      type: 'time',
      timeFormat: 'HH:mm:ss',
      correctFormat: true
    },
    {
      title: '手数',
      data: 'lots',
      type: 'numeric',
      format: '0,0'
    },
    {
      title: '价格',
      data: 'fixedPrice',
      type: 'numeric',
      format: '0,0'
    },
    {
      title: '状态',
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
    this.columns[4].readOnly = !!this.overPriceLevel;
  }

  sumLots() {
    if (!this.executions) {
      return 0;
    }

    return this.executions.filter(e => e.lots).map(e => e.lots).reduce((l1, l2) => l1 + l2, 0);
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
  }

  onAfterCreateRow = (index: number) => {
    console.log('onAfterCreateRow()->index: ' + index);
    const template = index === 0 ? this.executions[this.executions.length - 1] : this.executions[0];
    this.executions.splice(index, 1, new TradingExecution(template.symbol, template.side));
  }

}
