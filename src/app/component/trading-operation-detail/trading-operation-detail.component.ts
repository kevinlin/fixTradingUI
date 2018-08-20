import { Component, Input, OnInit } from '@angular/core';
import { MatRadioChange, MatSelectChange, MatSnackBar } from '@angular/material';

import { Direction } from '../../model/enum/direction.enum';
import { OperationType } from '../../model/enum/operation-type.enum';
import { OrderSide } from '../../model/enum/order-side.enum';
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
  executions1: TradingExecution[];
  executions2: TradingExecution[];
  executions3: TradingExecution[];

  constructor(private tradingOperationService: TradingOperationService, private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.operationTypeValues = Object.values(OperationType)
      .filter(e => typeof(e) == "string")
      .filter(type => {
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

  operationTypeChange($event: MatSelectChange) {
    if ($event.value === 'CLOSE') {
      this.selectedOperation.direction = this.selectedOperation.tradingStrategy.positionDirection === Direction.LONG ? Direction.SHORT : Direction.LONG;
      console.log(this.selectedOperation.direction);
    }
  }

  directionChange($event: MatRadioChange) {
    this.selectedOperation.direction = $event.value;

    const tradingStrategy = this.selectedOperation.tradingStrategy;
    this.selectedOperation.contract1Side = (tradingStrategy.contract1Coefficient > 0) == this.isLongPosition() ? OrderSide.BID : OrderSide.ASK;
    this.selectedOperation.contract2Side = (tradingStrategy.contract2Coefficient > 0) == this.isLongPosition() ? OrderSide.BID : OrderSide.ASK;
    this.selectedOperation.contract3Side = (tradingStrategy.contract3Coefficient > 0) == this.isLongPosition() ? OrderSide.BID : OrderSide.ASK;
    this.initializeExecutions(tradingStrategy);
  }

  private isLongPosition(): boolean {
    return (this.selectedOperation.direction == Direction.LONG) == (this.selectedOperation.operationType == OperationType.OPEN);
  }

  private initializeExecutions(tradingStrategy) {
    this.executions1 = [];
    this.executions2 = [];
    this.executions3 = [];
    for (let i = 0; i < 20; i++) {
      this.executions1.push(new TradingExecution(this.selectedOperation, tradingStrategy.contract1Symbol, this.selectedOperation.contract1Side));
      this.executions2.push(new TradingExecution(this.selectedOperation, tradingStrategy.contract2Symbol, this.selectedOperation.contract2Side));
      this.executions3.push(new TradingExecution(this.selectedOperation, tradingStrategy.contract3Symbol, this.selectedOperation.contract3Side));
    }
  }

  saveOperation() {
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
