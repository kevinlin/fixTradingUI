import {Instrument} from './instrument';
import {MarketDataEntry} from './market-data-entry';
import {TradingPosition} from './trading-position';

export interface TradingState {
  sgxInstrument: Instrument;
  dceInstrument: Instrument;

  shortExchangeRate: number;
  sgxBestBid: MarketDataEntry;
  dceBestAsk: MarketDataEntry;
  sgxBidStack: MarketDataEntry[];
  dceAskStack: MarketDataEntry[];
  sgxBidMinusDceAsk: number;

  longExchangeRate: number;
  sgxBestAsk: MarketDataEntry;
  dceBestBid: MarketDataEntry;
  sgxAskStack: MarketDataEntry[];
  dceBidStack: MarketDataEntry[];
  sgxAskMinusDceBid: number;

  tradingPosition: TradingPosition;
  lastAction: string;
  nextAction: string;
}
