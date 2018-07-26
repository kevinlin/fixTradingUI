import { TradingOperation } from './trading-operation';

export interface Order {

  id: number;
  date: string;
  tradingOperation: TradingOperation;
  clOrdID: string;
  exchange: string;
  symbol: string;
  price: number;
  size: number;
  side: string
  ordType: string;
  transactTime: Date;

  orderID: string;
  origClOrdID: string;
  execID: string;
  execType: string
  ordStatus: string;
  ordRejReason: string;
  lastQty: number;
  lastPx: number;
  leavesQty: number;
  cumQty: number;
  text: string;

}
