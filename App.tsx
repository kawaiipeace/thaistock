import React, { useState } from 'react';
import { MOCK_STOCKS } from './constants';
import { StockData } from './types';
import { StockList } from './components/StockList';
import { StockChart } from './components/StockChart';
import { AnalysisPanel } from './components/AnalysisPanel';
import { FinancialCard } from './components/FinancialCard';
import { BarChart3, Info } from 'lucide-react';

const App: React.FC = () => {
  const [selectedStock, setSelectedStock] = useState<StockData>(MOCK_STOCKS[0]);

  return (
    <div className="flex h-screen bg-slate-50 text-slate-900 font-sans overflow-hidden">
      {/* Sidebar - Stock List */}
      <aside className="hidden md:flex h-full shrink-0 z-20">
        <StockList 
          stocks={MOCK_STOCKS} 
          selectedSymbol={selectedStock.symbol} 
          onSelect={setSelectedStock} 
        />
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        {/* Mobile Header (Only visible on small screens) */}
        <div className="md:hidden bg-white p-4 border-b border-slate-200 flex items-center justify-between">
            <h1 className="font-bold text-slate-800">ThaiStock AI</h1>
            <button className="text-blue-600 text-sm font-medium">Select Stock</button>
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-5xl mx-auto space-y-6">
            
            {/* Header Section */}
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                   <h1 className="text-3xl md:text-4xl font-bold text-slate-900">{selectedStock.symbol}</h1>
                   <span className="px-2 py-1 bg-slate-200 text-slate-600 text-xs font-bold rounded">{selectedStock.sector}</span>
                </div>
                <h2 className="text-lg text-slate-500 font-medium">{selectedStock.name}</h2>
              </div>
              <div className="text-right">
                <div className="text-3xl font-mono font-bold text-slate-900">{selectedStock.price.toFixed(2)}</div>
                <div className={`flex items-center justify-end gap-2 font-medium ${selectedStock.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  <span>{selectedStock.change > 0 ? '+' : ''}{selectedStock.change.toFixed(2)}</span>
                  <span>({selectedStock.change > 0 ? '+' : ''}{selectedStock.changePercent}%)</span>
                </div>
              </div>
            </header>

            {/* Description */}
            <div className="bg-blue-50/50 p-4 rounded-lg border border-blue-100 flex gap-3 items-start">
              <Info className="text-blue-500 shrink-0 mt-0.5" size={18} />
              <p className="text-sm text-slate-600">{selectedStock.description}</p>
            </div>

            {/* Key Metrics */}
            <FinancialCard stock={selectedStock} />

            {/* Main Grid: Chart + AI Analysis */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Left Column: Chart */}
              <div className="lg:col-span-2">
                 <StockChart 
                    data={selectedStock.history} 
                    color={selectedStock.change >= 0 ? '#16a34a' : '#dc2626'} 
                 />
              </div>

              {/* Right Column: AI Analysis */}
              <div className="lg:col-span-1">
                 <AnalysisPanel stock={selectedStock} />
              </div>

            </div>

             {/* Footer Disclaimers */}
             <footer className="mt-8 pt-6 border-t border-slate-200 text-center text-xs text-slate-400 pb-4">
                <p className="mb-2">ข้อมูลทั้งหมดเป็นข้อมูลจำลอง (Mock Data) เพื่อการสาธิตระบบเท่านั้น ไม่ใช่ข้อมูลจริงจากตลาดหลักทรัพย์</p>
                <p>คำแนะนำการลงทุนจาก AI เป็นเพียงการวิเคราะห์เบื้องต้น ผู้ลงทุนควรศึกษาข้อมูลเพิ่มเติมก่อนตัดสินใจ</p>
             </footer>

          </div>
        </div>

        {/* Mobile Stock Selector (Overlay style - simplified for this demo) */}
        <div className="md:hidden">
           {/* In a real app, this would be a slide-over or modal. 
               For now, the list is hidden on mobile to keep code simple as per "handful of files" constraint. 
               A real mobile implementation would toggle the StockList visibility. */}
        </div>
      </main>
    </div>
  );
};

export default App;
