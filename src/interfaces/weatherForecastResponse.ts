import { WeatherForecastResponseCurrent } from "@/interfaces/weatherForecastResponseCurrent";
import { WeatherForecastResponseDaily } from "@/interfaces/weatherForecastResponseDaily";

export interface WeatherForecastResponse {
  current: WeatherForecastResponseCurrent;
  daily: Array<WeatherForecastResponseDaily>;
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: number;
}