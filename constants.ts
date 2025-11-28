import { StockData } from './types';

// ข้อมูลจำลองหุ้นไทย (Mock Data)
export const MOCK_STOCKS: StockData[] = [
  {
    symbol: 'PTT',
    name: 'บริษัท ปตท. จำกัด (มหาชน)',
    sector: 'Energy & Utilities',
    price: 34.50,
    change: 0.25,
    changePercent: 0.73,
    pe: 8.5,
    pbv: 0.85,
    dividendYield: 5.8,
    volume: 45000000,
    marketCap: "985,000 MB",
    description: "ประกอบธุรกิจก๊าซธรรมชาติ ธุรกิจระบบท่อส่งก๊าซธรรมชาติ ธุรกิจการค้าระหว่างประเทศ ธุรกิจน้ำมัน และธุรกิจปิโตรเคมีครบวงจร",
    history: [
      { date: '2024-01', price: 33.00 }, { date: '2024-02', price: 34.00 }, { date: '2024-03', price: 35.50 },
      { date: '2024-04', price: 34.75 }, { date: '2024-05', price: 33.50 }, { date: '2024-06', price: 34.50 }
    ]
  },
  {
    symbol: 'AOT',
    name: 'บริษัท ท่าอากาศยานไทย จำกัด (มหาชน)',
    sector: 'Transportation',
    price: 65.25,
    change: -0.50,
    changePercent: -0.76,
    pe: 45.2,
    pbv: 6.5,
    dividendYield: 1.2,
    volume: 12000000,
    marketCap: "932,142 MB",
    description: "ประกอบธุรกิจท่าอากาศยานของประเทศไทย โดยมีท่าอากาศยานหลัก 6 แห่ง",
    history: [
      { date: '2024-01', price: 60.00 }, { date: '2024-02', price: 62.50 }, { date: '2024-03', price: 66.00 },
      { date: '2024-04', price: 67.00 }, { date: '2024-05', price: 65.50 }, { date: '2024-06', price: 65.25 }
    ]
  },
  {
    symbol: 'DELTA',
    name: 'บริษัท เดลต้า อีเลคโทรนิคส์ (ประเทศไทย)',
    sector: 'Electronic Components',
    price: 72.00,
    change: 1.50,
    changePercent: 2.13,
    pe: 65.4,
    pbv: 12.1,
    dividendYield: 0.8,
    volume: 8500000,
    marketCap: "898,000 MB",
    description: "ผู้ผลิตและจำหน่ายผลิตภัณฑ์ด้านการจัดการระบบกำลังไฟฟ้า (Power management solutions)",
    history: [
      { date: '2024-01', price: 80.00 }, { date: '2024-02', price: 75.00 }, { date: '2024-03', price: 68.00 },
      { date: '2024-04', price: 70.00 }, { date: '2024-05', price: 71.00 }, { date: '2024-06', price: 72.00 }
    ]
  },
  {
    symbol: 'KBANK',
    name: 'ธนาคารกสิกรไทย จำกัด (มหาชน)',
    sector: 'Banking',
    price: 128.00,
    change: -1.00,
    changePercent: -0.78,
    pe: 7.8,
    pbv: 0.65,
    dividendYield: 4.5,
    volume: 9800000,
    marketCap: "303,000 MB",
    description: "ประกอบกิจการธนาคารพาณิชย์ และธุรกิจหลักทรัพย์และธุรกิจที่เกี่ยวเนื่อง",
    history: [
      { date: '2024-01', price: 130.00 }, { date: '2024-02', price: 125.00 }, { date: '2024-03', price: 122.00 },
      { date: '2024-04', price: 126.00 }, { date: '2024-05', price: 127.50 }, { date: '2024-06', price: 128.00 }
    ]
  },
  {
    symbol: 'CPALL',
    name: 'บริษัท ซีพี ออลล์ จำกัด (มหาชน)',
    sector: 'Commerce',
    price: 58.75,
    change: 0.25,
    changePercent: 0.43,
    pe: 28.5,
    pbv: 4.2,
    dividendYield: 1.8,
    volume: 25000000,
    marketCap: "527,000 MB",
    description: "ดำเนินธุรกิจร้านสะดวกซื้อภายใต้เครื่องหมายการค้า 7-Eleven",
    history: [
      { date: '2024-01', price: 54.00 }, { date: '2024-02', price: 56.00 }, { date: '2024-03', price: 57.50 },
      { date: '2024-04', price: 56.50 }, { date: '2024-05', price: 58.00 }, { date: '2024-06', price: 58.75 }
    ]
  }
];