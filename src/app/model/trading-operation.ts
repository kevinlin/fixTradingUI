import { Direction } from './enum/direction.enum';
import { OperationState } from './enum/operation-state.enum';
import { OperationType } from './enum/operation-type.enum';
import { OrderSide } from './enum/order-side.enum';
import { TradingExecution } from './trading-execution';
import { TradingStrategy } from './trading-strategy';

export class TradingOperation {
  // Operation details
  id: number;
  tradingStrategy: TradingStrategy;
  date: Date;
  direction: Direction;
  operationType: OperationType;
  operationState: OperationState;

  // Execution details
  // To delete start >>
  totalBatches: number;
  remainingBatches: number;
  unitsPerBatch: number;
  startTime: Date;
  interval: number;
  // To delete >>end
  contract1Side: OrderSide;
  contract1Executions: TradingExecution[];
  contract1Lots: number;
  contract2Side: OrderSide;
  contract2Executions: TradingExecution[];
  contract2Lots: number;
  contract3Side: OrderSide;
  contract3Executions: TradingExecution[];
  contract3Lots: number;

  constructor() {
    this.operationState = OperationState.PENDING;
  }

  public isActive(): boolean {
    return this.operationState !== OperationState.PENDING;
  }

}
