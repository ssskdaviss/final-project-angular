export interface User {
  id: string;
  email: string;
  password: string;
  balance: number;
  nickname: string;
  crypto: {
    id: string;
    cryptoAmount: number;
  }[];
  history: {
    id: string,
    type: string,
    amount: number,
    priceUsd: number;
  }[]
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

export interface cryptoInterface {
  id: string;
  name: string;
  priceUsd: number;
  symbol: string;
}

