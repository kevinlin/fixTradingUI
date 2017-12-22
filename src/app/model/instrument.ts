import {Maturity} from './maturity';

export interface Instrument {
  exchange: string;
  currency: string;
  maturity: Maturity;
  symbol: string;
}
