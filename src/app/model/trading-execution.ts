import { OrderSide } from './enum/order-side.enum';
import { TradingOperation } from "./trading-operation";

export class TradingExecution {

  constructor(tradingOperation: TradingOperation, symbol: string, side: OrderSide) {
    this.tradingOperation = tradingOperation;
    this.symbol = symbol;
    this.side = side;
  }

  id: number;
  tradingOperation: TradingOperation;
  symbol: string;
  side: OrderSide;
  time: string;
  lots: number;
  state: string;
}
