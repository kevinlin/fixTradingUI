import { MarketDataEntry } from './market-data-entry';

export interface OrderBook {
  side: string;
  topOfBook: MarketDataEntry;
  stack: MarketDataEntry[];
}
