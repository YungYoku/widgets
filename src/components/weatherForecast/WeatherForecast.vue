<template>
  <div
    v-if="!hidden"
    :class="[
      'widget',
      'weather-forecast',
      cityErrorClassName,
      uniqueClassName,
      isCollapsed ? 'collapsed': ''
    ]"
    :style="{
      order,
      minHeight
    }"
  >
    <widget-error
      v-if="errorShowing && !geoAccessRequestShowing"
      :geo-access-error="geoAccessError"
      :geo-exist-error="geoExistError"
      class="error"
    />

    <weather-forecast-context
      :city-name="cityName"
      :copying-data="copyingData"
      :unique-class-name="'.' + uniqueClassName"
    />

    <widget-navigation
      :rules="navigationRules"
      class="navigation"
      @closeWidget="closeWidget"
      @collapseWidget="collapseWidget"
      @openMap="openMap"
      @openSaved="openSaved"
      @openSettings="openSettings"
    />

    <widget-geo-access
      v-if="geoAccessRequestShowing"
      @allow="loadByCoords"
      @forbid="blockGeoAccess"
    />

    <weather-forecast-settings
      v-if="settingsShowing"
      @close="closeSettings"
      @giveGeoAccess="handleGeoAccess"
      @switchTheme="switchTheme"
    />

    <weather-forecast-saved
      v-if="savedShowing"
      :current-city="cityName"
      @close="closeSaved"
      @loadFromSaved="loadFromSaved"
    />

    <weather-forecast-maps
      v-if="mapsShowing"
      :coords="[lat, lon]"
      @close="closeMaps"
    />

    <weather-forecast-today
      v-if="weatherShowing"
      :city-name="cityName"
      :loading="loading"
      :weather="current"
      class="today"
    />

    <weather-forecast-week
      v-if="weatherShowing"
      :loading="loading"
      :weather="daily"
      class="week"
    />

    <weather-forecast-load-form
      :city-exist-error="cityExistError"
      :loading="loading"
      :searches-amount="searchesAmount"
      class="form"
      @formSubmit="loadByCityName"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import WeatherForecastToday from "@/components/weatherForecast/WeatherForecastToday.vue";
import WeatherForecastWeek from "@/components/weatherForecast/WeatherForecastWeek.vue";
import WeatherForecastLoadForm from "@/components/weatherForecast/WeatherForecastLoadForm.vue";
import WidgetError from "@/components/WidgetError.vue";
import WeatherForecastContext from "@/components/weatherForecast/WeatherForecastContext.vue";
import WeatherForecastSettings from "@/components/weatherForecast/WeatherForecastSettings.vue";
import WidgetGeoAccess from "@/components/WidgetGeoAccess.vue";
import WeatherForecastSaved from "@/components/weatherForecast/WeatherForecastSaved.vue";
import WeatherForecastMaps from "@/components/weatherForecast/WeatherForecastMaps.vue";
import WidgetNavigation from "@/components/WidgetNavigation.vue";
import { WeatherForecastResponseCurrent } from "@/interfaces/weatherForecastResponseCurrent";
import { WeatherForecastResponseDaily } from "@/interfaces/weatherForecastResponseDaily";
import { WeatherForecastResponse } from "@/interfaces/weatherForecastResponse";
import { WeatherError } from "@/interfaces/weatherError";
import axios, { AxiosResponse } from "axios";
import { isWeatherForecastLSSettings } from "@/interfaces/weatherForecastLSSetting";
import { SettingNames } from "@/enums/settingNames";
import { Navigation } from "@/enums/navigation";
import { WeatherForecastCurrent } from "@/interfaces/weatherForecastCurrent";
import { WeatherForecastDaily, WeatherForecastWeekDay } from "@/interfaces/weatherForecastDaily";

const dayNamings = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
const monthNamings = [
  "Янв",
  "Фев",
  "Мар",
  "Апр",
  "Мая",
  "Июн",
  "Июл",
  "Авг",
  "Сен",
  "Окт",
  "Ноя",
  "Дек"
];

export default defineComponent({
  name: "WeatherForecast",

  components: {
    WidgetNavigation,
    WidgetGeoAccess,
    WidgetError,
    WeatherForecastMaps,
    WeatherForecastSaved,
    WeatherForecastSettings,
    WeatherForecastContext,
    WeatherForecastLoadForm,
    WeatherForecastWeek,
    WeatherForecastToday
  },

  props: {
    id: {
      type: Number,
      required: true,
      default: 0
    },

    order: {
      type: Number,
      required: true,
      default: 0
    },

    hidden: {
      type: Boolean,
      required: true,
      default: false
    }
  },

  data() {
    return {
      baseURL: process.env.VUE_APP_WEATHER_BASE_URL,
      apiKey: process.env.VUE_APP_WEATHER_API_KEY,
      loading: true,
      lang: window.navigator.language.slice(0, 2),
      isCollapsed: false,
      lat: 0,
      lon: 0,
      current: {
        icon: "Sun",
        temperature: "0°С",
        feelsLike: "ощущается как 0°С",
        description: "Погодные условия",
        conditions: "Ветер: 0 м/c, Давление: 0 мм рт. ст"
      } as WeatherForecastCurrent,
      daily: {
        week: [
          {
            date: "1 января",
            icon: "Sun",
            max: 0,
            min: 0,
            weekDayNaming: "Сегодня"
          },
          {
            date: "2 января",
            icon: "Sun",
            max: 0,
            min: 0,
            weekDayNaming: "Пн"
          },
          {
            date: "3 января",
            icon: "Sun",
            max: 0,
            min: 0,
            weekDayNaming: "Вт"
          },
          {
            date: "4 января",
            icon: "Sun",
            max: 0,
            min: 0,
            weekDayNaming: "Ср"
          },
          {
            date: "5 января",
            icon: "Sun",
            max: 0,
            min: 0,
            weekDayNaming: "Чт"
          },
          {
            date: "6 января",
            icon: "Sun",
            max: 0,
            min: 0,
            weekDayNaming: "Пт"
          },
          {
            date: "7 января",
            icon: "Sun",
            max: 0,
            min: 0,
            weekDayNaming: "Сб"
          },
          {
            date: "8 января",
            icon: "Sun",
            max: 0,
            min: 0,
            weekDayNaming: "Вс"
          }
        ],
        averageTemperatureDay: 0,
        averageTemperatureNight: 0
      } as WeatherForecastDaily,
      cityName: "Город",
      geoExistError: false,
      geoAccessError: false,
      cityExistError: false,
      settingsShowing: false,
      savedShowing: false,
      geoAccessRequestShowing: true,
      mapsShowing: false,
      searchesAmount: 0,
      theme: "light"
    };
  },

  computed: {
    uniqueClassName() {
      return `weather-forecast${this.id}`;
    },

    cityErrorClassName(): string {
      return this.errorShowing || this.geoAccessRequestShowing ? "cityError" : "";
    },

    daysInMonth() {
      const year = new Date().getFullYear();
      const monthIndex = new Date().getMonth() + 1;

      return new Date(year, monthIndex, 0).getDate();
    },

    copyingData() {
      return `
        Текущая температура равна ${this.current.temperature}
        , ${this.current.feelsLike}
      `;
    },

    anyGeoError(): boolean {
      return this.geoExistError || this.geoAccessError;
    },

    errorShowing(): boolean {
      return !this.searchesAmount ? this.anyGeoError : false;
    },

    weatherShowing(): boolean {
      return !this.errorShowing && !this.geoAccessRequestShowing;
    },

    minHeight() {
      return ((this.settingsShowing || this.savedShowing) && !this.loading) ? "300px" : "auto";
    },

    navigationRules() {
      if (this.isCollapsed) {
        return [Navigation.Close, Navigation.Collapse];
      }

      if (this.weatherShowing) {
        return [Navigation.Close, Navigation.Collapse, Navigation.Settings, Navigation.Saved, Navigation.Map];
      }

      return [Navigation.Close, Navigation.Collapse, Navigation.Settings, Navigation.Saved];
    }
  },

  mounted() {
    this.hideLoading();

    if (localStorage.settings) {
      const lsSettings: unknown = JSON.parse(localStorage.settings);

      if (lsSettings && isWeatherForecastLSSettings(lsSettings)) {
        const themeSetting = lsSettings.find(setting => setting.name === SettingNames.Theme);
        if (themeSetting) {
          this.switchTheme(themeSetting.turnedOn);
        }

        const geoSetting = lsSettings.find(setting => setting.name === SettingNames.Geo);
        if (!geoSetting?.turnedOn) {
          this.geoAccessRequestShowing = false;
          this.geoAccessError = true;
          return;
        }
      }
    }

    if (navigator.permissions) {
      navigator.permissions.query({
        name: "geolocation"
      })
        .then(permission => {
            this.handleGeoPermission(permission.state);
          }
        );
    }
  },

  methods: {
    handleGeoPermission(permission: string) {
      switch (permission) {
        case "granted":
          this.loadByCoords();
          break;
        case "denied":
          this.geoAccessRequestShowing = false;
          this.geoAccessError = true;
          break;
        case "prompt":
          break;
      }
    },

    showLoading() {
      this.loading = true;
    },

    hideLoading() {
      this.loading = false;
    },

    collapseWidget() {
      this.isCollapsed = !this.isCollapsed;
    },

    switchTheme(isThemePurple: boolean) {
      const lightThemeColor = "rgb(255, 255, 255)";
      const purpleThemeColor = "rgb(173, 170, 255)";
      let themeColor;

      if (isThemePurple) {
        themeColor = purpleThemeColor;
        this.theme = "purple";
      } else {
        themeColor = lightThemeColor;
        this.theme = "light";
      }

      document.documentElement.style.setProperty("--main-background-color", themeColor);
    },

    giveGeoAccess() {
      this.geoAccessError = false;
      this.geoAccessRequestShowing = true;
    },

    blockGeoAccess() {
      this.geoAccessError = true;
      this.geoAccessRequestShowing = false;
    },

    handleGeoAccess(access: boolean) {
      if (this.searchesAmount) {
        return;
      }

      if (access) {
        this.giveGeoAccess();
      } else {
        this.blockGeoAccess();
      }
    },

    handleRequestErrors(error: WeatherError) {
      const response = error.response;
      const status = response.status;
      const statusText = response.statusText;

      switch (status) {
        case 401:
          console.error(`API key error ${status} (${statusText})`);
          break;
        case 404:
          console.error(`Wrong city name error ${status} (${statusText})`);
          break;
        case 429:
          console.error(`Free plan limit error ${status} (${statusText})`);
          break;
      }
    },

    setLatLon(lat: number, lon: number) {
      this.lat = lat;
      this.lon = lon;
    },

    setWeather(weather: WeatherForecastResponse) {
      this.setCurrentWeather(weather.current);
      this.setDailyWeather(weather.daily);
    },

    async loadWeatherForecast(lat: number, lon: number) {
      await axios
        .get(
          `${this.baseURL}data/2.5/onecall?appid=${this.apiKey}`,
          {
            params: {
              lat,
              lon,
              exclude: "hourly,minutely,alerts",
              units: "metric",
              lang: this.lang
            }
          }
        )
        .then((response: AxiosResponse<WeatherForecastResponse>) => {
          this.searchesAmount++;

          this.setLatLon(lat, lon);

          this.setWeather(response.data);

          this.geoAccessRequestShowing = false;
          this.cityExistError = false;
        })
        .catch(this.handleRequestErrors);
    },

    async loadCityName(lat: number, lon: number) {
      await axios
        .get(`${this.baseURL}geo/1.0/reverse?appid=${this.apiKey}`, {
          params: {
            lat,
            lon
          }
        })
        .then(response => {
          this.cityName = response.data[0].local_names[this.lang];
        })
        .catch(this.handleRequestErrors);
    },

    async loadFromSaved(city: string) {
      this.closeSaved();
      if (city !== this.cityName) {
        await this.loadByCityName(city);
      }
    },

    async loadByCoords() {
      if (navigator.geolocation) {
        await navigator.geolocation.getCurrentPosition(
          position => {
            this.showLoading();

            this.geoAccessRequestShowing = false;

            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            Promise.all([
              this.loadCityName(lat, lon),
              this.loadWeatherForecast(lat, lon)
            ]).then(this.hideLoading);
          },
          () => {
            this.geoAccessRequestShowing = false;
            this.geoAccessError = true;
          },
          {
            enableHighAccuracy: true
          }
        );
      } else {
        this.geoAccessRequestShowing = false;
        this.geoExistError = true;
      }
    },

    isItSameCity(city: string) {
      return city.toLowerCase() === this.cityName.toLowerCase();
    },

    handleSameNameCity() {
      const activeElement = document.activeElement as HTMLElement;
      if (activeElement) {
        activeElement.blur();
      }
      this.cityExistError = false;
    },

    async loadCoordsByCityName(city: string) {
      return await axios
        .get(`${this.baseURL}geo/1.0/direct?appid=${this.apiKey}`,
          {
            params: {
              q: city
            }
          })
        .then(response => {
          const responseData = response.data[0];

          return {
            lat: responseData.lat,
            lon: responseData.lon
          };
        })
        .catch(error => {
          console.error(error);
          this.cityExistError = true;
          this.hideLoading();
          return undefined;
        });
    },

    async loadByCityName(cityName: string) {
      if (this.isItSameCity(cityName)) {
        this.handleSameNameCity();
        return;
      }

      this.showLoading();

      const coords = await this.loadCoordsByCityName(cityName);
      if (coords) {
        this.cityName = cityName;

        await this.loadWeatherForecast(coords.lat, coords.lon);
      }

      this.hideLoading();
    },

    getWeekDayNaming(day: number) {
      if (day === 0) {
        return "Сегодня";
      }

      const index = (day + new Date().getDay() - 1) % dayNamings.length;

      return dayNamings[index];
    },

    getDate(day: number, daysInMonth: number) {
      const monthIndex = new Date().getMonth();

      if (day <= daysInMonth) {
        return day + " " + monthNamings[monthIndex];
      }

      return day % daysInMonth + " " + monthNamings[monthIndex + 1];
    },

    getWeatherIconName(id: string) {
      id = id.slice(0, 2); // Иконки одинаковые для дня и ночи, убираем букву в конце id
      switch (id) {
        case "01":
          return "Sun";
        case "02":
          return "Clouds";
        case "03":
          return "Clouds";
        case "04":
          return "Clouds";
        case "09":
          return "Rain";
        case "10":
          return "Rain";
        case "11":
          return "Lightning";
        case "13":
          return "Snow";
        case "50":
          return "Mist";
        default:
          return "Sun";
      }
    },

    setCurrentWeather(current: WeatherForecastResponseCurrent) {
      const description = current.weather[0].description;
      this.current.icon = this.getWeatherIconName(current.weather[0].icon);
      this.current.temperature = `${Math.round(current.temp)}°С`;
      this.current.feelsLike = `ощущается как ${Math.round(current.feels_like)}°С`;
      this.current.description = description[0].toUpperCase() + description.slice(1);
      this.current.conditions = `
        Ветер: ${Math.round(current.wind_speed)} м/с,
        Давление: ${Math.round(current.pressure)} мм рт. ст.
      `;
    },

    updateAverageTemperature() {
      const days = 8;
      let averageTempDay = 0;
      let averageTempNight = 0;

      this.daily.week.forEach(t => {
        averageTempDay += t.max;
        averageTempNight += t.min;
      });

      this.daily.averageTemperatureDay = averageTempDay / days;
      this.daily.averageTemperatureNight = averageTempNight / days;
    },

    getFormattedDay(day: WeatherForecastResponseDaily, index: number): WeatherForecastWeekDay {
      return {
        date: this.getDate(index + new Date().getDate(), this.daysInMonth),
        icon: this.getWeatherIconName(day.weather[0].icon),
        max: Math.round(day.temp.max),
        min: Math.round(day.temp.min),
        weekDayNaming: this.getWeekDayNaming(index)
      };
    },

    setDailyWeather(daily: Array<WeatherForecastResponseDaily>) {
      this.daily.week = daily.map(this.getFormattedDay);
      this.updateAverageTemperature();
    },

    openSettings() {
      this.settingsShowing = true;
    },

    closeSettings() {
      this.settingsShowing = false;
    },

    openSaved() {
      this.savedShowing = true;
    },

    closeSaved() {
      this.savedShowing = false;
    },

    openMap() {
      if (this.weatherShowing) {
        this.mapsShowing = true;
      }
    },

    closeMaps() {
      this.mapsShowing = false;
    },

    closeWidget() {
      this.$emit("closeWidget", this.id);
    }
  }
});
</script>

<style lang="scss" scoped>
.weather-forecast {
  align-items: flex-start;

  grid-template: repeat(3, auto) / 2fr 3fr;
  grid-template-areas:
      'nav week'
      'today week'
      'form form';

  width: 100%;
  max-width: 1150px;
  height: 100%;

  background-color: var(--main-background-color);

  @media (max-width: 1000px) {
    grid-template: repeat(4, auto) / 1fr;
    grid-template-areas:
      'nav'
      'today'
      'week'
      'form';
  }

  @media (max-width: 300px) {
    grid-template: repeat(3, auto) / 1fr;
    grid-template-areas:
      'nav'
      'today'
      'form';

    .week {
      display: none;
    }
  }

  @media (max-width: 240px) {
    grid-template: repeat(2, auto) / 1fr;
    grid-template-areas:
      'nav'
      'today';

    .form {
      display: none;
    }
  }

  &.collapsed {
    width: 94px;
    max-height: 62px;
    padding: 20px;
    overflow: hidden;

    transition: all 0.3s;
  }

  .navigation {
    grid-area: nav;
  }

  .error {
    grid-area: error;
  }

  .today {
    grid-area: today;
  }

  .week {
    grid-area: week;
  }

  .form {
    grid-area: form;
  }
}

.cityError {
  display: grid;

  grid-template: auto / 1fr;
  grid-template-areas:
      'nav'
      'error'
      'form';
}
</style>
