export interface StockData {
  symbol: string;
  name: string;
  sector: string;
  price: number;
  change: number;
  changePercent: number;
  pe: number;
  pbv: number;
  dividendYield: number;
  volume: number;
  marketCap: string;
  description: string;
  history: { date: string; price: number }[];
}

export enum AnalysisStatus {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}

export interface AIAnalysisResult {
  recommendation: 'BUY' | 'SELL' | 'HOLD';
  reasoning: string;
  riskLevel: 'Low' | 'Medium' | 'High';
  targetPrice: string;
}
