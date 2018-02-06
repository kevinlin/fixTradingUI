export interface MarketDataEntry {
  symbol: string;
  side: string;
  id: string;
  timestamp: Date;
  positionNo: number;
  price: number;
  size: number;
}
