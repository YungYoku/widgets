import { WeatherForecastLSGeoSetting, WeatherForecastLSThemeSetting } from "@/interfaces/weatherForecastLSSetting";

interface WeatherForecastSetting {
  title: string;
  actionType: string;
}

interface WeatherForecastGeoSetting extends WeatherForecastLSGeoSetting,
  WeatherForecastSetting {
}

interface WeatherForecastThemeSetting extends WeatherForecastLSThemeSetting,
  WeatherForecastSetting {
}

export type WeatherForecastSettings = [
  WeatherForecastGeoSetting,
  WeatherForecastThemeSetting
]