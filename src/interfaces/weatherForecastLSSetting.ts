export const enum SettingName {
  Geo = "geo",
  Theme = "theme",
}

interface WeatherForecastLSSetting {
  turnedOn: boolean;
}

export interface WeatherForecastLSGeoSetting
  extends WeatherForecastLSSetting {
  name: SettingName.Geo;
}

export interface WeatherForecastLSThemeSetting
  extends WeatherForecastLSSetting {
  name: SettingName.Theme;
}

export type WeatherForecastLSSettings = [
  WeatherForecastLSGeoSetting,
  WeatherForecastLSThemeSetting
]