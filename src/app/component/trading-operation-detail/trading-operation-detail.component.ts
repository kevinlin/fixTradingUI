import { ApplicationRef, Component, Input, OnInit } from '@angular/core';
import { MatRadioChange, MatSelectChange } from '@angular/material';

import { AppComponent } from '../../app.component';
import { Direction } from '../../model/enum/direction.enum';
import { OperationType } from '../../model/enum/operation-type.enum';
import { OrderSide } from '../../model/enum/order-side.enum';
import { TradingExecution } from "../../model/trading-execution";
import { TradingOperation } from '../../model/trading-operation';
import { TradingExecutionService } from '../../service/trading-execution.service';
import { TradingOperationService } from '../../service/trading-operation.service';
import { ToastsManager } from '../../toast/toasts-manager.service';

@Component({
  selector: 'app-trading-execution-detail',
  templateUrl: './trading-operation-detail.component.html',
  styleUrls: ['./trading-operation-detail.component.css']
})
export class TradingOperationDetailComponent implements OnInit {

  @Input() selectedOperation: TradingOperation;

  operationTypeValues: any[];
  directionValues: any[];

  constructor(private operationService: TradingOperationService, private executionService: TradingExecutionService, private toastr: ToastsManager, private appRef: ApplicationRef) {
    this.toastr.setRootViewContainerRef((appRef.components[0].instance as AppComponent).viewRef);
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

    // Initialize executions for every contract
    if (this.selectedOperation.id) {
      this.executionService.findBy(this.selectedOperation).subscribe(executions => {
        this.updateExecutions(executions);
      });
    }
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
    const isLong = (this.selectedOperation.direction == Direction.LONG) == (this.selectedOperation.operationType == OperationType.OPEN);
    this.selectedOperation.contract1Side = (strategy.contract1Coefficient > 0) == isLong ? OrderSide.BID : OrderSide.ASK;
    this.selectedOperation.contract1Executions = this.fillWithDefault([], strategy.contract1Symbol, this.selectedOperation.contract1Side);

    this.selectedOperation.contract2Side = (strategy.contract2Coefficient > 0) == isLong ? OrderSide.BID : OrderSide.ASK;
    this.selectedOperation.contract2Executions = this.fillWithDefault([], strategy.contract2Symbol, this.selectedOperation.contract2Side);

    if (strategy.contract3Symbol) {
      this.selectedOperation.contract3Side = (strategy.contract3Coefficient > 0) == isLong ? OrderSide.BID : OrderSide.ASK;
      this.selectedOperation.contract3Executions = this.fillWithDefault([], strategy.contract3Symbol, this.selectedOperation.contract3Side);
    }
    if (strategy.contract4Symbol) {
      this.selectedOperation.contract4Side = (strategy.contract4Coefficient > 0) == isLong ? OrderSide.BID : OrderSide.ASK;
      this.selectedOperation.contract4Executions = this.fillWithDefault([], strategy.contract4Symbol, this.selectedOperation.contract4Side);
    }
    if (strategy.contract5Symbol) {
      this.selectedOperation.contract5Side = (strategy.contract5Coefficient > 0) == isLong ? OrderSide.BID : OrderSide.ASK;
      this.selectedOperation.contract5Executions = this.fillWithDefault([], strategy.contract5Symbol, this.selectedOperation.contract5Side);
    }
    if (strategy.contract6Symbol) {
      this.selectedOperation.contract6Side = (strategy.contract6Coefficient > 0) == isLong ? OrderSide.BID : OrderSide.ASK;
    }
    this.selectedOperation.contract6Executions = this.fillWithDefault([], strategy.contract6Symbol, this.selectedOperation.contract6Side);
  }

  saveOperation() {
    let executionsToSave = this.selectedOperation.contract1Executions.slice();
    executionsToSave = executionsToSave.concat(this.selectedOperation.contract2Executions.slice());
    if (this.selectedOperation.contract3Executions) {
      executionsToSave = executionsToSave.concat(this.selectedOperation.contract3Executions.slice());
    }
    if (this.selectedOperation.contract4Executions) {
      executionsToSave = executionsToSave.concat(this.selectedOperation.contract4Executions.slice());
    }
    if (this.selectedOperation.contract5Executions) {
      executionsToSave = executionsToSave.concat(this.selectedOperation.contract5Executions.slice());
    }
    if (this.selectedOperation.contract6Executions) {
      executionsToSave = executionsToSave.concat(this.selectedOperation.contract6Executions.slice());
    }
    executionsToSave = executionsToSave.filter(e => e.time && e.lots).sort((a, b) => (a.time > b.time ? 1 : -1));

    this.operationService.save(this.selectedOperation).subscribe(result => {
      this.selectedOperation = result;
      executionsToSave.forEach(execution => {
        execution.operationId = result.id
      });
      this.executionService.saveAll(executionsToSave).subscribe(result => {
        this.updateExecutions(result);
        // this.snackBar.open('Trading Operation: \'' + this.selectedOperation.tradingStrategy.name + '\'' + '-' + this.selectedOperation.date, 'saved', { duration: 3000 });
        this.toastr.success('Trading Operation: \'' + this.selectedOperation.tradingStrategy.name + '\'' + '-' + this.selectedOperation.date + ' saved.');
      });
    })
  }

  cancelChanges() {
    this.selectedOperation = null;
  }

  private updateExecutions(executions: TradingExecution[]) {
    const groupedExecutions = this.groupBySymbol(executions);
    const strategy = this.selectedOperation.tradingStrategy;
    this.selectedOperation.contract1Executions = this.fillWithDefault(groupedExecutions[strategy.contract1Symbol], strategy.contract1Symbol, this.selectedOperation.contract1Side);
    this.selectedOperation.contract2Executions = this.fillWithDefault(groupedExecutions[strategy.contract2Symbol], strategy.contract2Symbol, this.selectedOperation.contract2Side);
    if (strategy.contract3Symbol) {
      this.selectedOperation.contract3Executions = this.fillWithDefault(groupedExecutions[strategy.contract3Symbol], strategy.contract3Symbol, this.selectedOperation.contract3Side);
    }
    if (strategy.contract4Symbol) {
      this.selectedOperation.contract4Executions = this.fillWithDefault(groupedExecutions[strategy.contract4Symbol], strategy.contract4Symbol, this.selectedOperation.contract4Side);
    }
    if (strategy.contract5Symbol) {
      this.selectedOperation.contract5Executions = this.fillWithDefault(groupedExecutions[strategy.contract5Symbol], strategy.contract5Symbol, this.selectedOperation.contract5Side);
    }
    if (strategy.contract6Symbol) {
      this.selectedOperation.contract6Executions = this.fillWithDefault(groupedExecutions[strategy.contract6Symbol], strategy.contract6Symbol, this.selectedOperation.contract6Side);
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

}
