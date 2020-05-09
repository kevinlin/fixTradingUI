import {OrderSide} from './enum/order-side.enum';

export class TradingExecution {

  constructor(symbol: string, side: OrderSide) {
    this.symbol = symbol;
    this.side = side;
  }

  id: number;
  operationId: number;
  symbol: string;
  side: OrderSide;
  time: string;
  lots: number;
  fixedPrice: number;
  state: string;
}
