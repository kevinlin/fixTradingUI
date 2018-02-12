import {Instrument} from './instrument';

export interface TradingSession {
  sgxInstrument: Instrument;
  dceInstrument: Instrument;
  date: string;
  sessionState: string;
}
