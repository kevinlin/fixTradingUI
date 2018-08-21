import { Component, Input, OnInit } from '@angular/core';
import { MatRadioChange, MatSelectChange, MatSnackBar } from '@angular/material';

import { Direction } from '../../model/enum/direction.enum';
import { OperationType } from '../../model/enum/operation-type.enum';
import { OrderSide } from '../../model/enum/order-side.enum';
import { TradingExecution } from "../../model/trading-execution";
import { TradingOperation } from '../../model/trading-operation';
import { TradingExecutionService } from '../../service/trading-execution.service';
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

  constructor(private operationService: TradingOperationService, private executionService: TradingExecutionService, private snackBar: MatSnackBar) {
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

    this.executionService.findBy(this.selectedOperation).subscribe(executions => {
      this.updateExecutions(executions);
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

    const strategy = this.selectedOperation.tradingStrategy;
    this.selectedOperation.contract1Side = (strategy.contract1Coefficient > 0) == this.isLongPosition() ? OrderSide.BID : OrderSide.ASK;
    this.selectedOperation.contract2Side = (strategy.contract2Coefficient > 0) == this.isLongPosition() ? OrderSide.BID : OrderSide.ASK;
    this.selectedOperation.contract3Side = (strategy.contract3Coefficient > 0) == this.isLongPosition() ? OrderSide.BID : OrderSide.ASK;
    this.initializeExecutions();
  }

  saveOperation() {
    const executionsToSave = this.selectedOperation.contract1Executions.slice();
    if (this.selectedOperation.contract2Executions) {
      executionsToSave.concat(this.selectedOperation.contract2Executions.slice());
    }
    if (this.selectedOperation.contract2Executions) {
      executionsToSave.concat(this.selectedOperation.contract3Executions.slice());
    }

    this.operationService.save(this.selectedOperation).subscribe(result => {
      this.selectedOperation = result;
      executionsToSave.forEach(execution => {
        execution.operationId = result.id
      });
      this.executionService.saveAll(executionsToSave).subscribe(result => {
        this.updateExecutions(result);
        this.snackBar.open('Trading Operation: \'' + this.selectedOperation.tradingStrategy.name + '\'' + '-'
          + this.selectedOperation.date, 'saved', { duration: 3000 });
      });
    })
  }

  cancelChanges() {
    this.selectedOperation = null;
  }

  private isLongPosition(): boolean {
    return (this.selectedOperation.direction == Direction.LONG) == (this.selectedOperation.operationType == OperationType.OPEN);
  }

  private initializeExecutions() {
    const strategy = this.selectedOperation.tradingStrategy;
    this.selectedOperation.contract1Executions = this.fillWithDefault([], strategy.contract1Symbol, this.selectedOperation.contract1Side);
    this.selectedOperation.contract2Executions = this.fillWithDefault([], strategy.contract2Symbol, this.selectedOperation.contract2Side);
    this.selectedOperation.contract3Executions = this.fillWithDefault([], strategy.contract3Symbol, this.selectedOperation.contract3Side);
  }

  private updateExecutions(executions: TradingExecution[]) {
    const groupedExecutions = this.groupBySymbol(executions);
    const strategy = this.selectedOperation.tradingStrategy;
    const compareStartTime = (a, b) => (a.startTime.getTime() - b.startTime.getTime());
    const contract1Executions = groupedExecutions[strategy.contract1Symbol].sort(compareStartTime);
    const contract2Executions = groupedExecutions[strategy.contract2Symbol].sort(compareStartTime);
    const contract3Executions = groupedExecutions[strategy.contract3Symbol].sort(compareStartTime);
    this.selectedOperation.contract1Executions = this.fillWithDefault(contract1Executions, strategy.contract1Symbol, this.selectedOperation.contract1Side);
    this.selectedOperation.contract2Executions = this.fillWithDefault(contract2Executions, strategy.contract2Symbol, this.selectedOperation.contract2Side);
    this.selectedOperation.contract3Executions = this.fillWithDefault(contract3Executions, strategy.contract3Symbol, this.selectedOperation.contract3Side);
  }

  private fillWithDefault(executions: TradingExecution[], symbol: string, side: OrderSide) {
    for (let i = executions.length; i < 20; i++) {
      executions.push(new TradingExecution(symbol, side));
    }

    return executions;
  }

  private groupBySymbol(executions: TradingExecution[]) {
    return executions.reduce(function (groupBy, execution) {
      const symbol = execution.symbol;
      if (!groupBy[symbol]) {
        groupBy[symbol] = [];
      }
      groupBy[symbol].push(execution);
      return groupBy;
    }, {});
  }

}
