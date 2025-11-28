import React, { useState } from 'react';
import { StockData, AIAnalysisResult, AnalysisStatus } from '../types';
import { analyzeStock } from '../services/geminiService';
import { Sparkles, AlertCircle, CheckCircle, BrainCircuit } from 'lucide-react';

interface AnalysisPanelProps {
  stock: StockData;
}

export const AnalysisPanel: React.FC<AnalysisPanelProps> = ({ stock }) => {
  const [status, setStatus] = useState<AnalysisStatus>(AnalysisStatus.IDLE);
  const [result, setResult] = useState<AIAnalysisResult | null>(null);

  const handleAnalyze = async () => {
    setStatus(AnalysisStatus.LOADING);
    const data = await analyzeStock(stock);
    setResult(data);
    setStatus(AnalysisStatus.SUCCESS);
  };

  // Reset state when stock changes
  React.useEffect(() => {
    setStatus(AnalysisStatus.IDLE);
    setResult(null);
  }, [stock.symbol]);

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-white rounded-xl border border-indigo-100 p-6 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-indigo-900 flex items-center gap-2">
          <BrainCircuit className="text-indigo-600" />
          AI Stock Analyst
        </h3>
        {status === AnalysisStatus.IDLE && (
          <button
            onClick={handleAnalyze}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors flex items-center gap-2 shadow-sm shadow-indigo-200"
          >
            <Sparkles size={16} />
            วิเคราะห์ด้วย Gemini
          </button>
        )}
      </div>

      {status === AnalysisStatus.LOADING && (
        <div className="py-8 text-center animate-pulse">
          <div className="inline-block w-8 h-8 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mb-3"></div>
          <p className="text-indigo-600 font-medium">Gemini กำลังประมวลผลข้อมูลการเงิน...</p>
          <p className="text-slate-400 text-xs mt-1">วิเคราะห์ P/E, ปันผล และความผันผวน</p>
        </div>
      )}

      {status === AnalysisStatus.SUCCESS && result && (
        <div className="space-y-4 animate-fade-in">
          <div className="flex items-center gap-4">
            <div className={`px-4 py-2 rounded-lg font-bold text-white text-lg tracking-wide shadow-md
              ${result.recommendation === 'BUY' ? 'bg-green-500 shadow-green-200' : 
                result.recommendation === 'SELL' ? 'bg-red-500 shadow-red-200' : 'bg-amber-500 shadow-amber-200'}`}>
              {result.recommendation === 'BUY' ? 'ซื้อ (BUY)' : 
               result.recommendation === 'SELL' ? 'ขาย (SELL)' : 'ถือ (HOLD)'}
            </div>
            <div className="flex flex-col">
               <span className="text-xs text-slate-500 uppercase font-semibold">Risk Level</span>
               <span className={`font-medium ${
                 result.riskLevel === 'Low' ? 'text-green-600' :
                 result.riskLevel === 'High' ? 'text-red-600' : 'text-amber-600'
               }`}>
                 ความเสี่ยง: {result.riskLevel === 'Low' ? 'ต่ำ' : result.riskLevel === 'Medium' ? 'ปานกลาง' : 'สูง'}
               </span>
            </div>
            <div className="flex flex-col ml-auto text-right">
               <span className="text-xs text-slate-500 uppercase font-semibold">Target Price</span>
               <span className="font-bold text-slate-800 text-lg">{result.targetPrice} บาท</span>
            </div>
          </div>

          <div className="bg-white/80 p-4 rounded-lg border border-indigo-50">
            <p className="text-slate-700 leading-relaxed text-sm">
              <span className="font-semibold text-indigo-900 block mb-1">บทวิเคราะห์:</span>
              {result.reasoning}
            </p>
          </div>
          
          <div className="flex gap-2 text-xs text-slate-400 items-center justify-end">
             <CheckCircle size={12} />
             <span>วิเคราะห์โดย Google Gemini 2.5 Flash</span>
          </div>
        </div>
      )}
    </div>
  );
};
