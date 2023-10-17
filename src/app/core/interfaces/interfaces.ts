export interface User { 
    email: string;
    password: string;
  }

  export interface CryptoData {
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