export interface ExchangeError {
  code: string;
  config: {};
  message: string;
  name: string;
  request: XMLHttpRequest;
  response: XMLHttpRequest;
}