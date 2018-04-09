import {Instrument} from './instrument';
import {MarketDataEntry} from './market-data-entry';
import {TradingPosition} from './trading-position';

export interface TradingState {
  lhsInstrument: Instrument;
  rhsInstrument: Instrument;

  lhsBestBid: MarketDataEntry;
  rhsBestAsk: MarketDataEntry;
  lhsBidStack: MarketDataEntry[];
  rhsAskStack: MarketDataEntry[];
  lhsBidMinusRhsAsk: number;

  lhsBestAsk: MarketDataEntry;
  rhsBestBid: MarketDataEntry;
  lhsAskStack: MarketDataEntry[];
  rhsBidStack: MarketDataEntry[];
  lhsAskMinusRhsBid: number;

  tradingPosition: TradingPosition;
  lastAction: string;
  nextAction: string;
}
