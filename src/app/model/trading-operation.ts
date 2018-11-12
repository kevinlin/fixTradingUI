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
  state: OperationState;

  // Contract execution details
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
  }

  public isPending(): boolean {
    return this.state === OperationState.PENDING;
  }

  public isNotPending(): boolean {
    return this.state !== OperationState.PENDING;
  }

  public isSuspended(): boolean {
    return this.state === OperationState.SUSPENDED;
  }

  public isActive(): boolean {
    return this.state === OperationState.PENDING || this.state === OperationState.IN_PROGRESS;
  }

}
