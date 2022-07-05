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
    @dragstart="startDrag($event)"
  >
    <weather-forecast-error
      v-if="errorShowing && !geoAccessShowing"
      :geo-access-error="geoAccessError"
      :geo-exist-error="geoExistError"
      :searches-amount="searchesAmount"
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

    <weather-forecast-geo-access
      v-if="geoAccessShowing"
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

<script>
import WeatherForecastToday from "@/components/weatherForecast/WeatherForecastToday.vue";
import WeatherForecastWeek from "@/components/weatherForecast/WeatherForecastWeek.vue";
import WeatherForecastLoadForm from "@/components/weatherForecast/WeatherForecastLoadForm.vue";
import WeatherForecastError from "@/components/weatherForecast/WeatherForecastError.vue";
import WeatherForecastContext from "@/components/weatherForecast/WeatherForecastContext.vue";
import WeatherForecastSettings from "@/components/weatherForecast/WeatherForecastSettings.vue";
import WeatherForecastGeoAccess from "@/components/weatherForecast/WeatherForecastGeoAccess.vue";
import WeatherForecastSaved from "@/components/weatherForecast/WeatherForecastSaved.vue";
import WeatherForecastMaps from "@/components/weatherForecast/WeatherForecastMaps.vue";
import WidgetNavigation from "@/components/WidgetNavigation";

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

export default {
  name: "WeatherForecast",

  components: {
    WidgetNavigation,
    WeatherForecastMaps,
    WeatherForecastSaved,
    WeatherForecastGeoAccess,
    WeatherForecastSettings,
    WeatherForecastContext,
    WeatherForecastError,
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
      baseURL: "https://api.openweathermap.org/",
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
      },
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
      },
      cityName: "Город",
      geoExistError: false,
      geoAccessError: false,
      cityExistError: false,
      settingsShowing: false,
      savedShowing: false,
      geoAccessShowing: true,
      mapsShowing: false,
      searchesAmount: 0,
      theme: "light"
    };
  },

  computed: {
    uniqueClassName() {
      return `weather-forecast${this.id}`;
    },

    cityErrorClassName() {
      return this.errorShowing || this.geoAccessShowing ? "cityError" : "";
    },

    daysInMonth() {
      const secondsInDay = 86400;

      const thisMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
      const nextMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1);

      return Math.round((nextMonth - thisMonth) / 1000 / secondsInDay);
    },

    copyingData() {
      return `
        Текущая температура равна ${this.current.temperature}
        , ${this.current.feelsLike}
      `;
    },

    anyGeoError() {
      return this.geoExistError || this.geoAccessError;
    },

    errorShowing() {
      return !this.searchesAmount ? this.anyGeoError : false;
    },

    weatherShowing() {
      return !this.errorShowing && !this.geoAccessShowing;
    },

    minHeight() {
      return ((this.settingsShowing || this.savedShowing) && !this.loading) ? "300px" : "auto";
    },

    navigationRules() {
      if (this.isCollapsed) {
        return ["close", "collapse"];
      }

      if (this.weatherShowing) {
        return ["close", "collapse", "settings", "saved", "map"];
      }

      return ["close", "collapse", "settings", "saved"];
    }
  },

  mounted() {
    this.loading = false;

    if (localStorage.settings) {
      const lsSettings = JSON.parse(localStorage.settings);


      const theme = lsSettings.find(setting => setting.name === "theme");
      if (theme) {
        this.theme = theme.turnedOn ? "purple" : "light";
        this.switchTheme(this.theme);
      }


      const settingsGeoAccess = lsSettings.find(setting => setting.name === "geo").turnedOn;
      if (!settingsGeoAccess) {
        this.geoAccessShowing = false;
        this.geoAccessError = true;
        return;
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
    handleGeoPermission(permission) {
      switch (permission) {
        case "granted":
          this.loadByCoords();
          break;
        case "denied":
          this.geoAccessShowing = false;
          this.geoAccessError = true;
          break;
        case "prompt":
          break;
      }
    },

    startDrag(e) {
      e.dataTransfer.dropEffect = "move";
      e.dataTransfer.effectAllowed = "move";
      e.dataTransfer.setData("itemID", this.id.toString());
    },

    collapseWidget() {
      this.isCollapsed = !this.isCollapsed;
    },

    switchTheme(theme) {
      const lightThemeColor = "rgb(255, 255, 255)";
      const purpleThemeColor = "rgb(173, 170, 255)";
      let themeColor;

      this.theme = theme;

      if (theme === "light") {
        themeColor = lightThemeColor;
      } else {
        themeColor = purpleThemeColor;
      }

      document.documentElement.style.setProperty("--main-background-color", themeColor);
    },

    blockGeoAccess() {
      this.geoAccessShowing = false;
      this.geoAccessError = true;
    },

    handleGeoAccess(flag) {
      if (!this.searchesAmount) {
        if (flag) {
          this.geoAccessError = false;
          this.geoAccessShowing = true;
        } else {
          this.geoAccessError = true;
          this.geoAccessShowing = false;
        }
      }
    },

    handleRequestErrors(error) {
      const response = error.response;
      const status = response.status;
      const statusText = response.statusText;

      if (status === 401) {
        console.error(`API key error ${status} (${statusText})`);
      } else if (status === 404) {
        console.error(`Wrong city name error ${status} (${statusText})`);
      } else if (status === 429) {
        console.error(`Free plan limit error ${status} (${statusText})`);
      }
    },

    async loadWeatherForecast(lat, lon) {
      await this.$http
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
        .then((response) => {
          this.geoAccessShowing = false;
          this.searchesAmount++;
          this.setCurrentWeather(response.data.current);
          this.setDailyWeather(response.data.daily);
          this.cityExistError = false;
        })
        .catch(this.handleRequestErrors);
    },

    async loadCityName(lat, lon) {
      await this.$http
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

    async loadFromSaved(city) {
      this.closeSaved();
      if (city !== this.cityName) {
        await this.loadByCityName(city);
      }
    },

    async loadByCoords() {
      if (navigator.geolocation) {
        await navigator.geolocation.getCurrentPosition(
          position => {
            this.geoAccessShowing = false;

            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            this.lat = lat;
            this.lon = lon;

            this.loading = true;

            Promise.all([
              this.loadCityName(lat, lon),
              this.loadWeatherForecast(lat, lon)
            ]).then(() => {
              this.loading = false;
            });
          },
          () => {
            this.geoAccessShowing = false;
            this.geoAccessError = true;
          },
          {
            enableHighAccuracy: true
          }
        );
      } else {
        this.geoAccessShowing = false;
        this.geoExistError = true;
      }
    },

    async loadByCityName(city) {
      const alreadyLoadedCity = city.toLowerCase() === this.cityName.toLowerCase();
      if (alreadyLoadedCity) {
        document.activeElement.blur();
        this.cityExistError = false;
        return;
      }

      if (city) {
        this.loading = true;

        await this.$http
          .get(`${this.baseURL}geo/1.0/direct?appid=${this.apiKey}`, {
            params: {
              q: city
            }
          })
          .then((response) => {
            this.lat = response.data[0].lat;
            this.lon = response.data[0].lon;

            this.loadWeatherForecast(
              response.data[0].lat,
              response.data[0].lon
            )
              .then(() => {
                this.loading = false;
              });

            this.cityName = city;
          })
          .catch(() => {
            this.cityExistError = true;
            this.loading = false;
          });
      }
    },

    getWeekDayNaming(day) {
      if (day === 0) {
        return "Сегодня";
      }

      const index = (day + new Date().getDay() - 1) % dayNamings.length;

      return dayNamings[index];
    },

    getDate(day, daysInMonth) {
      const month = new Date().getMonth();

      if (day <= daysInMonth) {
        return day + " " + monthNamings[month];
      }

      return day % daysInMonth + " " + monthNamings[month + 1];
    },

    getWeatherIconName(id) {
      id = id.slice(0, 2); // Поскольку иконки одинаковые для дня и ночи, убираем букву в конце id
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

    setCurrentWeather(current) {
      let description = current.weather[0].description;
      this.current.icon = this.getWeatherIconName(current.weather[0].icon);
      this.current.temperature = `${Math.round(current.temp)}°С`;
      this.current.feelsLike = `ощущается как ${Math.round(current.feels_like)}°С`;
      this.current.description = description[0].toUpperCase() + description.slice(1);
      this.current.conditions = `
        Ветер: ${Math.round(current.wind_speed)} м/с,
        Давление: ${Math.round(current.pressure)} мм рт. ст.
      `;
    },

    setAverageTemperature() {
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

    getFormattedDay(day, index) {
      return {
        max: Math.round(day.temp.max),
        min: Math.round(day.temp.min),
        weekDayNaming: this.getWeekDayNaming(index),
        date: this.getDate(index + new Date().getDate(), this.daysInMonth),
        icon: this.getWeatherIconName(day.weather[0].icon)
      };
    },

    setDailyWeather(daily) {
      this.daily.week = daily.map(this.getFormattedDay);
      this.setAverageTemperature();
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
};
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
