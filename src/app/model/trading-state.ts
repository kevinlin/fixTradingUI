import {Instrument} from './instrument';
import {MarketDataEntry} from './market-data-entry';
import {TradingPosition} from './trading-position';

export interface TradingState {
  benchmarkExchangeRate: number;

  sgxInstrument: Instrument;
  sgxBestBidPrice: number;
  sgxBestBidSize: number;
  sgxBidStack: MarketDataEntry[];
  sgxBestAskPrice: number;
  sgxBestAskSize: number;
  sgxAskStack: MarketDataEntry[];

  dceInstrument: Instrument;
  dceBestBidPrice: number;
  dceBestBidSize: number;
  dceBidStack: MarketDataEntry[];
  dceBestAskPrice: number;
  dceBestAskSize: number;
  dceAskStack: MarketDataEntry[];

  sgxBidMinusDceAsk: number;
  sgxAskMinusDceBid: number;
  tradingPosition: TradingPosition;
  lastAction: string;
  nextAction: string;
}
