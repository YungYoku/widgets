export interface WeatherForecastWeekDay {
  date: string,
  icon: string,
  max: number,
  min: number,
  weekDayNaming: string
}

export interface WeatherForecastDaily {
  week: Array<WeatherForecastWeekDay>,
  averageTemperatureDay: number,
  averageTemperatureNight: number
}