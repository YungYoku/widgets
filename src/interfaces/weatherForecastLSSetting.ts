import { SettingNames } from "@/enums/settingNames";

interface WeatherForecastLSSetting {
  turnedOn: boolean;
}

export interface WeatherForecastLSGeoSetting
  extends WeatherForecastLSSetting {
  name: SettingNames.Geo;
}

export interface WeatherForecastLSThemeSetting
  extends WeatherForecastLSSetting {
  name: SettingNames.Theme;
}

export type WeatherForecastLSSettings = [
  WeatherForecastLSGeoSetting,
  WeatherForecastLSThemeSetting
]