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

export const isWeatherForecastLSSettings = (lsSettings: unknown): lsSettings is WeatherForecastLSSettings => {
  const lsSettingsAmount = 2;

  if (!Array.isArray(lsSettings)) {
    return false;
  }

  if (lsSettings.length !== lsSettingsAmount) {
    return false;
  }

  for (let i = 0; i < lsSettingsAmount; i++) {
    if (
      typeof lsSettings[i].name !== "string" ||
      typeof lsSettings[i].turnedOn !== "boolean"
    ) {
      return false;
    }
  }

  if (
    !lsSettings.find(setting => setting.name === SettingNames.Geo) ||
    !lsSettings.find(setting => setting.name === SettingNames.Theme)
  ) {
    return false;
  }

  return true;
};
