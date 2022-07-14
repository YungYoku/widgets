import { WeatherResponseCurrent } from "@/interfaces/weatherResponseCurrent";
import { WeatherResponseDaily } from "@/interfaces/weatherResponseDaily";

export interface WeatherResponse {
  current: WeatherResponseCurrent;
  daily: Array<WeatherResponseDaily>;
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: number;
}