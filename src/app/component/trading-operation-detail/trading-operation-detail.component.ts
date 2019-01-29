import {ApplicationRef, Component, Input, OnInit} from '@angular/core';
import {MatRadioChange, MatSelectChange} from '@angular/material';

import {AppComponent} from '../../app.component';
import {Direction} from '../../model/enum/direction.enum';
import {OperationType} from '../../model/enum/operation-type.enum';
import {OrderSide} from '../../model/enum/order-side.enum';
import {TradingExecution} from '../../model/trading-execution';
import {TradingOperation} from '../../model/trading-operation';
import {TradingExecutionService} from '../../service/trading-execution.service';
import {TradingOperationService} from '../../service/trading-operation.service';
import {ToastsManager} from '../../toast/toasts-manager.service';

@Component({
  selector: 'app-trading-execution-detail',
  templateUrl: './trading-operation-detail.component.html',
  styleUrls: ['./trading-operation-detail.component.css']
})
export class TradingOperationDetailComponent implements OnInit {

  @Input() operation: TradingOperation;

  operationTypeValues: any[];
  directionValues: any[];
  overPriceLevelValues = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  constructor(private operationService: TradingOperationService, private executionService: TradingExecutionService, private toastr: ToastsManager, private appRef: ApplicationRef) {
    this.toastr.setRootViewContainerRef((appRef.components[0].instance as AppComponent).viewRef);
  }

  ngOnInit() {
    this.operationTypeValues = Object.values(OperationType)
      .filter(e => typeof (e) === 'string')
      .filter(type => {
        if (this.operation.tradingStrategy && this.operation.tradingStrategy.isInPosition) {
          return type !== 'TRANSFER';
        }
        return true;
      });
    this.directionValues = Object.values(Direction)
      .filter(e => typeof (e) === 'string')
      .filter(direction => {
        return direction !== 'NEUTRAL';
      });

    // Initialize executions for every contract
    if (this.operation.id) {
      this.executionService.findBy(this.operation).subscribe(executions => {
        this.updateExecutions(executions);
      });
    }
  }

  displayLabelForOpType(opType: string): string {
    if (opType === 'OPEN') {
      return '建仓';
    } else if (opType === 'CLOSE') {
      return '平仓';
    } else if (opType === 'CLOSE_TODAY') {
      return '今平';
    } else if (opType === 'TRANSFER') {
      return '移仓';
    }
  }

  operationTypeChange($event: MatSelectChange) {
    if ($event.value === 'CLOSE' || $event.value === 'CLOSE_TODAY') {
      this.operation.direction = this.operation.tradingStrategy.positionDirection === Direction.LONG ? Direction.SHORT : Direction.LONG;
    }
  }

  directionChange($event: MatRadioChange) {
    this.operation.direction = $event.value;

    const strategy = this.operation.tradingStrategy;
    const isLong = (this.operation.direction === Direction.LONG) === (this.operation.operationType === OperationType.OPEN);
    this.operation.contract1Side = (strategy.contract1Coefficient > 0) === isLong ? OrderSide.BID : OrderSide.ASK;
    this.operation.contract1Executions = this.fillWithDefault([], strategy.contract1Symbol, this.operation.contract1Side);

    this.operation.contract2Side = (strategy.contract2Coefficient > 0) === isLong ? OrderSide.BID : OrderSide.ASK;
    this.operation.contract2Executions = this.fillWithDefault([], strategy.contract2Symbol, this.operation.contract2Side);

    if (strategy.contract3Symbol) {
      this.operation.contract3Side = (strategy.contract3Coefficient > 0) === isLong ? OrderSide.BID : OrderSide.ASK;
      this.operation.contract3Executions = this.fillWithDefault([], strategy.contract3Symbol, this.operation.contract3Side);
    }
    if (strategy.contract4Symbol) {
      this.operation.contract4Side = (strategy.contract4Coefficient > 0) === isLong ? OrderSide.BID : OrderSide.ASK;
      this.operation.contract4Executions = this.fillWithDefault([], strategy.contract4Symbol, this.operation.contract4Side);
    }
    if (strategy.contract5Symbol) {
      this.operation.contract5Side = (strategy.contract5Coefficient > 0) === isLong ? OrderSide.BID : OrderSide.ASK;
      this.operation.contract5Executions = this.fillWithDefault([], strategy.contract5Symbol, this.operation.contract5Side);
    }
    if (strategy.contract6Symbol) {
      this.operation.contract6Side = (strategy.contract6Coefficient > 0) === isLong ? OrderSide.BID : OrderSide.ASK;
    }
    this.operation.contract6Executions = this.fillWithDefault([], strategy.contract6Symbol, this.operation.contract6Side);
  }

  saveOperation() {
    let executionsToSave: TradingExecution[];
    if (!this.operation.conditional) {
      executionsToSave = this.operation.contract1Executions.slice();
      executionsToSave = executionsToSave.concat(this.operation.contract2Executions.slice());
      if (this.operation.contract3Executions) {
        executionsToSave = executionsToSave.concat(this.operation.contract3Executions.slice());
      }
      if (this.operation.contract4Executions) {
        executionsToSave = executionsToSave.concat(this.operation.contract4Executions.slice());
      }
      if (this.operation.contract5Executions) {
        executionsToSave = executionsToSave.concat(this.operation.contract5Executions.slice());
      }
      if (this.operation.contract6Executions) {
        executionsToSave = executionsToSave.concat(this.operation.contract6Executions.slice());
      }
      executionsToSave = executionsToSave.filter(e => e.time && e.lots).sort((a, b) => (a.time > b.time ? 1 : -1));
    }

    this.operationService.save(this.operation).subscribe(savedOperation => {
      this.operation = savedOperation;

      if (!this.operation.conditional) {
        executionsToSave.forEach(execution => {
          execution.operationId = this.operation.id;
        });

        this.executionService.saveAll(executionsToSave).subscribe(savedExecutions => {
          this.updateExecutions(savedExecutions);
        });
      }

      // this.snackBar.open('Trading Operation: \'' + this.operation.tradingStrategy.name + '\'' + '-' + this.operation.date, 'saved', { duration: 3000 });
      this.toastr.success('Trading Operation: \'' + this.operation.tradingStrategy.name + '\'' + '-' + this.operation.date + ' saved.');
    });
  }

  cancelChanges() {
    this.operation = null;
  }

  private updateExecutions(executions: TradingExecution[]) {
    const groupedExecutions = this.groupBySymbol(executions);
    const strategy = this.operation.tradingStrategy;
    this.operation.contract1Executions = this.fillWithDefault(groupedExecutions[strategy.contract1Symbol], strategy.contract1Symbol, this.operation.contract1Side);
    this.operation.contract2Executions = this.fillWithDefault(groupedExecutions[strategy.contract2Symbol], strategy.contract2Symbol, this.operation.contract2Side);
    if (strategy.contract3Symbol) {
      this.operation.contract3Executions = this.fillWithDefault(groupedExecutions[strategy.contract3Symbol], strategy.contract3Symbol, this.operation.contract3Side);
    }
    if (strategy.contract4Symbol) {
      this.operation.contract4Executions = this.fillWithDefault(groupedExecutions[strategy.contract4Symbol], strategy.contract4Symbol, this.operation.contract4Side);
    }
    if (strategy.contract5Symbol) {
      this.operation.contract5Executions = this.fillWithDefault(groupedExecutions[strategy.contract5Symbol], strategy.contract5Symbol, this.operation.contract5Side);
    }
    if (strategy.contract6Symbol) {
      this.operation.contract6Executions = this.fillWithDefault(groupedExecutions[strategy.contract6Symbol], strategy.contract6Symbol, this.operation.contract6Side);
    }
  }

  private fillWithDefault(executions: TradingExecution[], symbol: string, side: OrderSide) {
    if (!executions) {
      executions = [];
    }
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

  conditionalIsNull() {
    return this.operation.conditional === null;
  }

  getThresholdSign() {
    if (this.operation.direction === null || this.operation.direction === Direction.NEUTRAL || this.operation.operationType === null || this.operation.operationType === OperationType.TRANSFER) {
      return '?';
    }

    return (this.operation.direction === Direction.LONG) === (this.operation.operationType === OperationType.OPEN) ? '>' : '<';
  }

}
