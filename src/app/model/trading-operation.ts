import { Direction } from './enum/direction.enum';
import { OperationState } from './enum/operation-state.enum';
import { OperationType } from './enum/operation-type.enum';
import { OrderSide } from './enum/order-side.enum';
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
  totalBatches: number;
  remainingBatches: number;
  unitsPerBatch: number;
  startTime: Date;
  interval: number;
  contract1Side: OrderSide;
  contract1Lots: number;
  contract2Side: OrderSide;
  contract2Lots: number;
  contract3Side: OrderSide;
  contract3Lots: number;

  constructor() {
    this.operationState = OperationState.PENDING;
  }

  public isActive(): boolean {
    return this.operationState !== OperationState.PENDING;
  }

}
