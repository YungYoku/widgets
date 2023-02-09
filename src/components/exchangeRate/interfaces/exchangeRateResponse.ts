import { UnformattedCurrency } from "@/components/exchangeRate/interfaces/unformattedCurrency";

export interface ExchangeRateResponse {
  Date: string;
  PreviousDate: string;
  PreviousURL: string;
  Timestamp: string;
  Valute: {
    [key: string]: UnformattedCurrency
  };
}