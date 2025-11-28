import React from 'react';
import { StockData } from '../types';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface StockListProps {
  stocks: StockData[];
  onSelect: (stock: StockData) => void;
  selectedSymbol: string;
}

export const StockList: React.FC<StockListProps> = ({ stocks, onSelect, selectedSymbol }) => {
  return (
    <div className="bg-white border-r border-slate-200 h-full overflow-y-auto w-full md:w-80 flex flex-col shadow-sm">
      <div className="p-4 border-b border-slate-100 bg-slate-50 sticky top-0 z-10">
        <h2 className="text-lg font-bold text-slate-700 flex items-center gap-2">
          <span className="w-2 h-6 bg-blue-600 rounded-full"></span>
          ตลาดหลักทรัพย์ (SET)
        </h2>
        <p className="text-xs text-slate-500 mt-1">ข้อมูลจำลอง Real-time</p>
      </div>
      <ul>
        {stocks.map((stock) => (
          <li 
            key={stock.symbol}
            onClick={() => onSelect(stock)}
            className={`p-4 border-b border-slate-100 cursor-pointer transition-colors hover:bg-slate-50 ${selectedSymbol === stock.symbol ? 'bg-blue-50 border-l-4 border-l-blue-600' : 'border-l-4 border-l-transparent'}`}
          >
            <div className="flex justify-between items-start mb-1">
              <span className="font-bold text-slate-800">{stock.symbol}</span>
              <span className="font-mono font-medium text-slate-900">{stock.price.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-500 truncate max-w-[120px]">{stock.name}</span>
              <div className={`flex items-center gap-1 ${stock.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {stock.change >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                <span>{stock.change > 0 ? '+' : ''}{stock.changePercent}%</span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
