import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';

import { Direction } from '../../model/direction.enum';
import { OperationType } from '../../model/operation-type.enum';
import { TradingExecution } from "../../model/trading-execution";
import { TradingOperation } from '../../model/trading-operation';
import { TradingOperationService } from '../../service/trading-operation.service';

@Component({
  selector: 'app-trading-execution-detail',
  templateUrl: './trading-operation-detail.component.html',
  styleUrls: ['./trading-operation-detail.component.css']
})
export class TradingOperationDetailComponent implements OnInit {

  @Input() selectedOperation: TradingOperation;

  operationTypeValues: any[];
  directionValues: any[];
  data: TradingExecution[];

  constructor(private tradingOperationService: TradingOperationService, private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.operationTypeValues = Object.values(OperationType)
      .filter(e => typeof(e) == "string")
      .filter(type => {
        console.info(type);
        if (this.selectedOperation.tradingStrategy && this.selectedOperation.tradingStrategy.isInPosition) {
          return type !== 'TRANSFER'
        }
        return true;
      });
    this.directionValues = Object.values(Direction)
      .filter(e => typeof(e) == "string")
      .filter(direction => {
        return direction !== 'NEUTRAL';
      });
  }

  displayLabelForOpType(opType: string): string {
    if (opType === 'OPEN') {
      return '建仓';
    } else if (opType === 'CLOSE') {
      return '平仓';
    } else if (opType === 'TRANSFER') {
      return '移仓';
    }
  }

  saveExecution() {
    this.tradingOperationService.save(this.selectedOperation).subscribe(result => {
      this.selectedOperation = result;
      this.snackBar.open('Trading Operation: \'' + this.selectedOperation.tradingStrategy.name + '\'' + '-'
        + this.selectedOperation.date, 'saved', { duration: 3000 });
    })
  }

  cancelChanges() {
    this.selectedOperation = null;
  }

}
