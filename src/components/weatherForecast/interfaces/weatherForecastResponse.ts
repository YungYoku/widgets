import { WeatherForecastResponseCurrent } from "@/components/weatherForecast/interfaces/weatherForecastResponseCurrent";
import { WeatherForecastResponseDaily } from "@/components/weatherForecast/interfaces/weatherForecastResponseDaily";

export interface WeatherForecastResponse {
  current: WeatherForecastResponseCurrent;
  daily: Array<WeatherForecastResponseDaily>;
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: number;
}