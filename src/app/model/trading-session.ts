import {Instrument} from './instrument';

export interface TradingSession {
  date: Date;
  sgxInstrument: Instrument;
  dceInstrument: Instrument;
  sessionState: string;
  benchmarkExchangeRate: number;
}
