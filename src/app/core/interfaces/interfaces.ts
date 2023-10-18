export interface User { 
    email: string;
    password: string;
  }

  export interface CryptoData {
    id: string;
    rank: number;
    name: string;
    symbol: string;
    priceUsd: number;
    marketCapUsd: number;
    vwap24Hr: number;
    supply: number;
    volumeUsd24Hr: number;
    changePercent24Hr: number;
  }
  
  export interface CryptoResponse {
    data: CryptoData[];
  }
  
  export interface CryptoHistoryData {
    date: number; 
    priceUsd: number;
  }
  
  export interface CryptoHistoryResponse {
    data: CryptoHistoryData[];
  }