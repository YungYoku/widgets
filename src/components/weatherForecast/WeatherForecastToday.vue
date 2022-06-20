<template>
  <div class="today withContext">
    <weather-forecast-loading v-if="loading" />

    <div v-else>
      <div class="temperatureWrap">
        <h1 class="cityName">
          {{ cityName }}
        </h1>

        <weather-forecast-icon
          :icon="weather.icon"
          class="icon"
        />

        <h2 class="temperature">
          {{ weather.temperature }}
        </h2>

        <h3 class="feelsLike">
          {{ weather.feelsLike }}
        </h3>
      </div>

      <div class="conditionsWrap">
        <h3 class="description">
          {{ weather.description }}
        </h3>

        <h4 class="conditions">
          {{ weather.conditions }}
        </h4>
      </div>
    </div>
  </div>
</template>

<script>
import WeatherForecastLoading from "@/components/weatherForecast/WeatherForecastLoading.vue";
import WeatherForecastIcon from "@/components/weatherForecast/icons/WeatherForecastIcon.vue";

export default {
  name: "WeatherForecastToday",

  components: {
    WeatherForecastLoading,
    WeatherForecastIcon
  },

  props: {
    loading: {
      type: Boolean,
      required: true,
      default: true
    },

    cityName: {
      type: String,
      required: true,
      default: "Название города"
    },

    weather: {
      type: Object,
      required: true,
      default: () => {
        return {
          icon: "Sun",
          temperature: "0°С",
          feelsLike: "ощущается как 0°С",
          description: "Погодные условия",
          conditions: "Ветер: 0 м/c, Давление: 0 мм рт. ст"
        };
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.today {
  padding: 30px 0 0 0;

  .temperatureWrap {
    display: grid;
    align-items: center;

    grid-template: repeat(3, auto) / 1fr 1fr;
    grid-template-areas:
      "cityName cityName"
      "icon temperature"
      "icon feelsLike";
    justify-items: center;

    @media (max-width: 240px) {
      display: grid;

      grid-template: repeat(3, auto) / 50px 1fr;
      grid-template-areas:
      "cityName cityName"
      "icon temperature"
      "icon feelsLike";
    }

    .cityName {
      grid-area: cityName;

      margin: 0;

      font-size: 26px;
      font-weight: 700;
      overflow-wrap: break-word;
    }

    .icon {
      display: block;

      grid-area: icon;

      width: 100px;
      height: 100px;

      border-radius: 5px;

      pointer-events: none;

      @supports (aspect-ratio: 1 / 1) {
        aspect-ratio: 1 / 1;
      }
    }

    .temperature {
      grid-area: temperature;

      margin: 0;

      font-size: 66px;
      font-weight: 700;
      overflow-wrap: break-word;
    }

    .feelsLike {
      grid-area: feelsLike;

      margin: 0;

      font-size: 16px;
      font-weight: 400;
      overflow-wrap: break-word;
    }
  }

  .conditionsWrap {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    padding: 20px 0;

    text-align: center;

    .description {
      margin: 0;

      font-size: 22px;
      font-weight: 700;
      overflow-wrap: break-word;
    }

    .conditions {
      margin: 0;

      font-size: 16px;
      font-weight: 400;
      overflow-wrap: break-word;
    }
  }
}
</style>
