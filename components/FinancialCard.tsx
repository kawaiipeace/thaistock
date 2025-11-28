import React from 'react';
import { StockData } from '../types';

export const FinancialCard: React.FC<{ stock: StockData }> = ({ stock }) => {
  const metrics = [
    { label: 'P/E Ratio', value: stock.pe.toFixed(2), unit: 'เท่า', color: stock.pe > 20 ? 'text-amber-600' : 'text-slate-900' },
    { label: 'P/BV Ratio', value: stock.pbv.toFixed(2), unit: 'เท่า', color: 'text-slate-900' },
    { label: 'Dividend Yield', value: stock.dividendYield.toFixed(2), unit: '%', color: 'text-green-600' },
    { label: 'Market Cap', value: stock.marketCap, unit: '', color: 'text-slate-900' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      {metrics.map((m, idx) => (
        <div key={idx} className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex flex-col items-center justify-center text-center">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">{m.label}</span>
          <span className={`text-xl font-bold ${m.color}`}>{m.value} <span className="text-xs font-normal text-slate-400">{m.unit}</span></span>
        </div>
      ))}
    </div>
  );
};
