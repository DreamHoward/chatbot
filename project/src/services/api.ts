import axios from 'axios';
import { WeatherResponse, StockResponse, NewsResponse, ExchangeResponse } from '../types';

const WEATHER_API_KEY = 'YOUR_WEATHER_API_KEY';
const STOCK_API_KEY = 'YOUR_STOCK_API_KEY';
const NEWS_API_KEY = 'YOUR_NEWS_API_KEY';
const EXCHANGE_API_KEY = 'YOUR_EXCHANGE_API_KEY';

export async function getWeather(city: string): Promise<WeatherResponse> {
  try {
    // Simulated API call
    return {
      location: city,
      temperature: Math.round(Math.random() * 30),
      description: ['sunny', 'cloudy', 'rainy'][Math.floor(Math.random() * 3)]
    };
  } catch (error) {
    return {
      location: city,
      temperature: 0,
      description: '',
      error: 'Failed to fetch weather data'
    };
  }
}

export async function getStockPrice(symbol: string): Promise<StockResponse> {
  try {
    // Simulated API call
    return {
      symbol: symbol.toUpperCase(),
      price: Math.round(Math.random() * 1000),
      change: Math.round((Math.random() * 10 - 5) * 100) / 100
    };
  } catch (error) {
    return {
      symbol: symbol,
      price: 0,
      change: 0,
      error: 'Failed to fetch stock data'
    };
  }
}

export async function getNewsSummary(topic: string): Promise<NewsResponse> {
  try {
    // Simulated API call
    const summaries = [
      'Scientists make breakthrough in renewable energy research.',
      'Tech company announces revolutionary new product.',
      'Global climate summit reaches historic agreement.'
    ];
    const sources = ['Reuters', 'Associated Press', 'Bloomberg'];
    
    return {
      title: `Latest news about ${topic}`,
      summary: summaries[Math.floor(Math.random() * summaries.length)],
      source: sources[Math.floor(Math.random() * sources.length)]
    };
  } catch (error) {
    return {
      title: '',
      summary: '',
      source: '',
      error: 'Failed to fetch news data'
    };
  }
}

export async function getExchangeRate(from: string, to: string, amount: number): Promise<ExchangeResponse> {
  try {
    // Simulated API call
    const rate = Math.random() * (2 - 0.5) + 0.5;
    return {
      from: from.toUpperCase(),
      to: to.toUpperCase(),
      rate: Math.round(rate * 100) / 100,
      amount: amount,
      converted: Math.round(amount * rate * 100) / 100
    };
  } catch (error) {
    return {
      from: from,
      to: to,
      rate: 0,
      amount: amount,
      converted: 0,
      error: 'Failed to fetch exchange rate data'
    };
  }
}