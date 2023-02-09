export interface TimeError {
  code: string;
  config: {};
  message: string;
  name: string;
  request: XMLHttpRequest;
  response: XMLHttpRequest;
  stack: string;
}