import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';

import { ExecutionAction } from '../../model/execution-action';
import { TradingExecution } from '../../model/trading-execution';
import { TradingExecutionService } from '../../service/trading-execution.service';

@Component({
  selector: 'app-trading-execution-detail',
  templateUrl: './trading-execution-detail.component.html',
  styleUrls: ['./trading-execution-detail.component.css']
})
export class TradingExecutionDetailComponent implements OnInit {

  @Input() selectedExecution: TradingExecution;

  ExecutionActionValues = Object.values(ExecutionAction).filter(e => typeof(e) == "string");

  constructor(private tradingExecutionService: TradingExecutionService, private snackBar: MatSnackBar) {
  }

  ngOnInit() {
  }

  saveExecution() {
    this.tradingExecutionService.save(this.selectedExecution).subscribe(result => {
      this.selectedExecution = result;
      this.snackBar.open('Trading Execution: \'' + this.selectedExecution.tradingStrategy.name + '\'' + '-' + this.selectedExecution.date, 'saved', { duration: 3000 });
    })
  }

  cancelChanges() {
    this.selectedExecution = null;
  }

}
