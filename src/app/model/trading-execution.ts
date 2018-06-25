import { TradingStrategy } from './trading-strategy';

export class TradingExecution {
  id: number;
  tradingStrategy: TradingStrategy;
  date: Date;
  executionAction: string;
  symbol1LotsPerOrder: number;
  symbol2LotsPerOrder: number;
  symbol3LotsPerOrder: number;
  numberOfBatch: number;
  startTime: Date;
  interval: number;
  symbol1Position: number;
  symbol2Position: number;
  symbol3Position: number;
}
