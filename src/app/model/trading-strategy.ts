import { Direction } from './Direction';

export class TradingStrategy {
  id: number;
  name: string;
  direction: Direction;
  symbol1: string;
  symbol1Coefficient: number;
  symbol1Direction: Direction;
  symbol1LotRatio: number;
  symbol2: string;
  symbol2Coefficient: number;
  symbol2Direction: Direction;
  symbol2LotRatio: number;
  symbol3: string;
  symbol3Coefficient: number;
  symbol3Direction: Direction;
  symbol3LotRatio: number;
  constantFactor: number;

  // State
  state: string;
  symbol1Position: number;
  symbol2Position: number;
  symbol3Position: number;

  constructor() {
  }

}
