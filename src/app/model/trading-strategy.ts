import { Direction } from './Direction';

export class TradingStrategy {
  id: number;
  name: string;
  direction: Direction;
  symbol1: string;
  symbol1Coefficient: number;
  symbol2: string;
  symbol2Coefficient: number;
  symbol3: string;
  symbol3Coefficient: number;
  constantFactor: number;

  // Execution default
  symbol1Direction: Direction;
  symbol1LotsPerOrder: number;
  symbol2Direction: Direction;
  symbol2LotsPerOrder: number;
  symbol3Direction: Direction;
  symbol3LotsPerOrder: number;
  startTime: string;
  interval: number;

  // State
  state: string;
  symbol1Position: number;
  symbol2Position: number;
  symbol3Position: number;

  constructor() {
  }

}
