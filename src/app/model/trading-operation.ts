import { Direction } from './direction.enum';
import { OperationType } from './operation-type.enum';
import { TradingStrategy } from './trading-strategy';

export class TradingOperation {
  // Operation details
  id: number;
  tradingStrategy: TradingStrategy;
  date: Date;
  direction: Direction;
  operationType: OperationType;
  operationState: string;

  // Execution details
  totalBatches: number;
  remainingBatches: number;
  unitsPerBatch: number;
  startTime: Date;
  interval: number;
  contract1Side: string;
  contract1Lots: number;
  contract2Side: string;
  contract2Lots: number;
  contract3Side: string;
  contract3Lots: number;
}
