import { Maturity } from './maturity';

export interface Instrument {
  productName: string;
  exchange: string;
  currency: string;
  maturity: Maturity;
  symbol: string;
}
