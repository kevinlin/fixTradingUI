import {TradingStrategy} from './trading-strategy';

export class IntradayTradingParameter {
  id: number;
  tradingStrategy: TradingStrategy;
  interval = 15;
  mean1Count = 5;
  mean2Count = 10;
  meanSpreadAverageCount = 5;
  meanSpreadStdDevCount = 5;
}
