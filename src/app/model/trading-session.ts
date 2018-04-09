import {Instrument} from './instrument';

export interface TradingSession {
  lhsInstrument: Instrument;
  rhsInstrument: Instrument;
  date: string;
  sessionState: string;
}
