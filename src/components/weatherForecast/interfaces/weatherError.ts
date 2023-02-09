export interface WeatherError {
  code: string;
  config: {};
  message: string;
  name: string;
  request: XMLHttpRequest;
  response: {
    config: {};
    data: {};
    headers: {};
    request: XMLHttpRequest;
    status: number;
    statusText: string;
  };
}