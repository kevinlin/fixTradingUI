import {Direction} from './enum/direction.enum';
import {OperationState} from './enum/operation-state.enum';
import {OperationType} from './enum/operation-type.enum';
import {OrderSide} from './enum/order-side.enum';
import {TradingExecution} from './trading-execution';
import {TradingStrategy} from './trading-strategy';

export class TradingOperation {
  // Operation details
  id: number;
  tradingStrategy: TradingStrategy;
  date: Date;
  direction: Direction;
  operationType: OperationType;
  overPriceLevel: number;

  // Conditional order
  conditional: boolean;
  greaterThan: boolean;
  priceLevelThreshold: number;
  contract1OrderLots: number;
  contract2OrderLots: number;
  contract3OrderLots: number;
  contract4OrderLots: number;
  contract5OrderLots: number;
  contract6OrderLots: number;

  // passive lrder
  passive: boolean;

  // State & contract execution details
  state: OperationState;

  contract1Side: OrderSide;
  contract1Executions: TradingExecution[];
  contract1Lots: number;

  contract2Side: OrderSide;
  contract2Executions: TradingExecution[];
  contract2Lots: number;

  contract3Side: OrderSide;
  contract3Executions: TradingExecution[];
  contract3Lots: number;

  contract4Side: OrderSide;
  contract4Executions: TradingExecution[];
  contract4Lots: number;

  contract5Side: OrderSide;
  contract5Executions: TradingExecution[];
  contract5Lots: number;

  contract6Side: OrderSide;
  contract6Executions: TradingExecution[];
  contract6Lots: number;

  constructor() {
    this.state = OperationState.PENDING;
    this.overPriceLevel = 0;
  }

  public isPending(): boolean {
    return this.state === OperationState.PENDING;
  }

  public isSuspended(): boolean {
    return this.state === OperationState.SUSPENDED;
  }

  public isActive(): boolean {
    return this.state === OperationState.PENDING || this.state === OperationState.IN_PROGRESS;
  }

  public isCompleted(): boolean {
    return this.state === OperationState.COMPLETED || this.state === OperationState.COMPLETED_PROBLEM;
  }

}
