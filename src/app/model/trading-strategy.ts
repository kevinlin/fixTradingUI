import { Direction } from './direction.enum';

export class TradingStrategy {
  // Strategy details
  id: number;
  name: string;

  // Contract details
  contract1Symbol: string;
  contract1Coefficient: number;
  contract1LotsPerUnit: number;
  contract2Symbol: string;
  contract2Coefficient: number;
  contract2LotsPerUnit: number;
  contract3Symbol: string;
  contract3Coefficient: number;
  contract3LotsPerUnit: number;
  constantFactor: number;

  // State
  state: string;
  marketDirection: Direction;
  positionDirection: Direction;
  units: number;
  contract1Side: string;
  contract1Lots: number;
  contract2Side: string;
  contract2Lots: number;
  contract3Side: string;
  contract3Lots: number;

  constructor() {
  }

  public isActive(): boolean {
    return this.state === 'ACTIVE';
  }

  public isInPosition(): boolean {
    return this.positionDirection != Direction.NEUTRAL;
  }

}
