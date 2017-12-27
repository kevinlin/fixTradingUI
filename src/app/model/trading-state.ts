import {Instrument} from './instrument';
import {TradingPosition} from './trading-position';

export interface TradingState {
  sgxInstrument: Instrument;
  sgxBestBidPrice: number;
  sgxBestBidSize: number;
  sgxBestAskPrice: number;
  sgxBestAskSize: number;
  dceInstrument: Instrument;
  dceBestBidPrice: number;
  dceBestBidSize: number;
  dceBestAskPrice: number;
  dceBestAskSize: number;
  exchangeRate: number;

  sgxBidMinusDceAsk: number;
  sgxAskMinusDceBid: number;
  tradingPosition: TradingPosition;
  lastAction: string;
  nextAction: string;
}
