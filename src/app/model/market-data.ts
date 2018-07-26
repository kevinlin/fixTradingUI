import { MarketDataEntry } from './market-data-entry';
import { OrderBook } from './order-book';

export interface MarketData {
  symbol: string;
  bestBid: MarketDataEntry;
  bidOrderBook: OrderBook;
  bestAsk: MarketDataEntry;
  askOrderBook: OrderBook;
}
