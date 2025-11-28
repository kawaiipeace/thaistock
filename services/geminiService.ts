import { GoogleGenAI, Type } from "@google/genai";
import { StockData, AIAnalysisResult } from "../types";

const apiKey = process.env.API_KEY || ''; // ใช้ process.env.API_KEY โดยตรง

// Initialize the API client only if the key exists to avoid immediate crash
let ai: GoogleGenAI | null = null;
if (apiKey) {
  ai = new GoogleGenAI({ apiKey: apiKey });
}

export const analyzeStock = async (stock: StockData): Promise<AIAnalysisResult> => {
  if (!ai) {
    // Fallback for demo if no API key is set
    console.warn("API Key not found. Returning mock analysis.");
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate delay
    return {
      recommendation: 'HOLD',
      reasoning: "ไม่พบ API Key ของ Gemini ระบบจึงแสดงผลลัพธ์จำลอง: หุ้นนี้มีพื้นฐานดีแต่ราคายังผันผวน ควรติดตามข่าวสารอย่างใกล้ชิดก่อนตัดสินใจลงทุนเพิ่ม",
      riskLevel: "Medium",
      targetPrice: (stock.price * 1.05).toFixed(2)
    };
  }

  const prompt = `
    คุณคือผู้เชี่ยวชาญด้านการวิเคราะห์หุ้นในตลาดหลักทรัพย์แห่งประเทศไทย (SET)
    โปรดวิเคราะห์หุ้นต่อไปนี้ตามข้อมูลที่ให้:
    
    ชื่อหุ้น: ${stock.symbol} (${stock.name})
    กลุ่มอุตสาหกรรม: ${stock.sector}
    ราคาปัจจุบัน: ${stock.price} บาท
    การเปลี่ยนแปลง: ${stock.change} (${stock.changePercent}%)
    P/E Ratio: ${stock.pe}
    P/BV Ratio: ${stock.pbv}
    Dividend Yield: ${stock.dividendYield}%
    รายละเอียดธุรกิจ: ${stock.description}
    
    โปรดให้คำแนะนำในรูปแบบ JSON ตาม Schema นี้เท่านั้น:
    {
      "recommendation": "BUY" | "SELL" | "HOLD",
      "reasoning": "คำอธิบายสั้นๆ ภาษาไทย ไม่เกิน 3 ประโยค เน้นปัจจัยพื้นฐานและเทคนิค",
      "riskLevel": "Low" | "Medium" | "High",
      "targetPrice": "ราคาเป้าหมายที่เหมาะสม (ระบุเป็นช่วง หรือราคาเดียว)"
    }
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            recommendation: { type: Type.STRING, enum: ["BUY", "SELL", "HOLD"] },
            reasoning: { type: Type.STRING },
            riskLevel: { type: Type.STRING, enum: ["Low", "Medium", "High"] },
            targetPrice: { type: Type.STRING }
          },
          required: ["recommendation", "reasoning", "riskLevel", "targetPrice"]
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as AIAnalysisResult;
    }
    throw new Error("Empty response from AI");
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    return {
      recommendation: 'HOLD',
      reasoning: "เกิดข้อผิดพลาดในการเชื่อมต่อกับ AI กรุณาลองใหม่อีกครั้ง",
      riskLevel: "Medium",
      targetPrice: "-"
    };
  }
};
