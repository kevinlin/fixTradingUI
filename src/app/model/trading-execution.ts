import { TradingOperation } from "./trading-operation";

export class TradingExecution {

  constructor(symbol: string, side: string) {
    this.symbol = symbol;
    this.side = side;
  }

  id: number;
  tradingOperation: TradingOperation;
  symbol: string;
  side: string;
  time: string;
  lots: number;
  state: string;
}
