import React from 'react';
import { format } from 'date-fns';
import { Bot, User } from 'lucide-react';
import { ChatMessage as ChatMessageType } from '../types';

interface ChatMessageProps {
  message: ChatMessageType;
}

function formatResponse(message: ChatMessageType) {
  if (!message.response) return message.text;

  if ('temperature' in message.response) {
    const weather = message.response;
    return `The weather in ${weather.location} is ${weather.temperature}°C, ${weather.description}.`;
  }

  if ('price' in message.response) {
    const stock = message.response;
    return `${stock.symbol}: $${stock.price} (${stock.change >= 0 ? '+' : ''}${stock.change}%)`;
  }

  if ('summary' in message.response) {
    const news = message.response;
    return `${news.title}\n${news.summary}\nSource: ${news.source}`;
  }

  if ('rate' in message.response) {
    const exchange = message.response;
    return `${exchange.amount} ${exchange.from} = ${exchange.converted} ${exchange.to} (Rate: ${exchange.rate})`;
  }

  return message.text;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isBot = message.type === 'bot';
  
  return (
    <div className={`flex gap-3 ${isBot ? 'flex-row' : 'flex-row-reverse'}`}>
      <div className={`flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center ${
        isBot ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-100 text-gray-600'
      }`}>
        {isBot ? <Bot size={20} /> : <User size={20} />}
      </div>
      <div className={`flex flex-col max-w-[80%] ${isBot ? 'items-start' : 'items-end'}`}>
        <div className={`rounded-lg px-4 py-2 ${
          isBot ? 'bg-white' : 'bg-indigo-600 text-white'
        }`}>
          <p className="text-sm whitespace-pre-line">{formatResponse(message)}</p>
        </div>
        <span className="text-xs text-gray-500 mt-1">
          {format(message.timestamp, 'HH:mm')}
        </span>
      </div>
    </div>
  );
}