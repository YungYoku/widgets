import {
  WeatherForecastLSGeoSetting,
  WeatherForecastLSThemeSetting
} from "@/components/weatherForecast/interfaces/weatherForecastLSSetting";
import { SettingNames } from "@/enums/settingNames";

interface WeatherForecastSettingBase {
  title: string;
  enabled: boolean;
  actionType: string;
}

export interface WeatherForecastGeoSetting extends WeatherForecastLSGeoSetting,
  WeatherForecastSettingBase {
  name: SettingNames.Geo,
}

export interface WeatherForecastThemeSetting extends WeatherForecastLSThemeSetting,
  WeatherForecastSettingBase {
  name: SettingNames.Theme,
}

export type WeatherForecastSetting = WeatherForecastGeoSetting | WeatherForecastThemeSetting;

export type WeatherForecastSettings = [
  WeatherForecastGeoSetting,
  WeatherForecastThemeSetting
]