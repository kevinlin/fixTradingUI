import { TradingOperation } from "./trading-operation";

export class TradingExecution {

  constructor() {
    this.state = 'PENDING';
  }

  id: number;
  tradingOperation: TradingOperation;
  symbol: string;
  side: string;
  time: string;
  lots: number;
  state: string;
}
