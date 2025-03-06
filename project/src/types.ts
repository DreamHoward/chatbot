export interface WeatherResponse {
  location: string;
  temperature: number;
  description: string;
  error?: string;
}

export interface StockResponse {
  symbol: string;
  price: number;
  change: number;
  error?: string;
}

export interface NewsResponse {
  title: string;
  summary: string;
  source: string;
  error?: string;
}

export interface ExchangeResponse {
  from: string;
  to: string;
  rate: number;
  amount: number;
  converted: number;
  error?: string;
}

export type ChatMessage = {
  id: string;
  text: string;
  type: 'user' | 'bot';
  timestamp: Date;
  response?: WeatherResponse | StockResponse | NewsResponse | ExchangeResponse;
};