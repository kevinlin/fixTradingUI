import { Direction } from './enum/direction.enum';
import { OrderSide } from './enum/order-side.enum';
import { StrategyState } from './enum/strategy-state.enum';

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
  state: StrategyState;
  marketDirection: Direction;
  positionDirection: Direction;
  units: number;
  contract1Side: OrderSide;
  contract1Lots: number;
  contract2Side: OrderSide;
  contract2Lots: number;
  contract3Side: OrderSide;
  contract3Lots: number;

  constructor() {
    this.state = StrategyState.INITIALISED;
    this.marketDirection = Direction.NEUTRAL;
    this.positionDirection = Direction.NEUTRAL;
  }

  public isActive(): boolean {
    return this.state === 'ACTIVE';
  }

  public isInPosition(): boolean {
    return this.positionDirection != Direction.NEUTRAL;
  }

}
