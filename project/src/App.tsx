import React, { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import { ChatMessage as ChatMessageType } from './types';
import { ChatMessage } from './components/ChatMessage';
import { getWeather, getStockPrice, getNewsSummary, getExchangeRate } from './services/api';

function App() {
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const processMessage = async (text: string) => {
    const weatherMatch = text.match(/weather in (.+)/i);
    const stockMatch = text.match(/stock price of (.+)/i);
    const newsMatch = text.match(/news about (.+)/i);
    const exchangeMatch = text.match(/convert (\d+) ([A-Za-z]{3}) to ([A-Za-z]{3})/i);

    let response;

    if (weatherMatch) {
      response = await getWeather(weatherMatch[1]);
    } else if (stockMatch) {
      response = await getStockPrice(stockMatch[1]);
    } else if (newsMatch) {
      response = await getNewsSummary(newsMatch[1]);
    } else if (exchangeMatch) {
      response = await getExchangeRate(
        exchangeMatch[2],
        exchangeMatch[3],
        parseFloat(exchangeMatch[1])
      );
    }

    return response;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: ChatMessageType = {
      id: Date.now().toString(),
      text: input,
      type: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');

    const response = await processMessage(input);
    
    const botMessage: ChatMessageType = {
      id: (Date.now() + 1).toString(),
      text: 'I could not understand that command. Please try again.',
      type: 'bot',
      timestamp: new Date(),
      response
    };

    setMessages(prev => [...prev, botMessage]);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold text-gray-900">Smart Chatbot</h1>
          <p className="text-sm text-gray-600">Ask about weather, stocks, news, or currency exchange</p>
        </div>
      </header>

      <main className="flex-1 overflow-hidden">
        <div className="max-w-4xl mx-auto h-full flex flex-col">
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map(message => (
              <ChatMessage key={message.id} message={message} />
            ))}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSubmit} className="p-4 bg-white border-t">
            <div className="flex gap-4">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Try: 'weather in Tokyo' or 'convert 100 USD to EUR'"
                className="flex-1 rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <Send size={20} />
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

export default App;