<template>
  <div class="today with-context">
    <widget-loading v-if="loading" />

    <div v-else>
      <div class="temperature">
        <h3 class="temperature__city-name">
          {{ cityName }}
        </h3>

        <weather-forecast-icon
          :icon="weather.icon"
          class="temperature__icon"
        />

        <h2 class="temperature__text">
          {{ weather.temperature }}
        </h2>

        <h4 class="temperature__feels-like">
          {{ weather.feelsLike }}
        </h4>
      </div>

      <div class="conditions">
        <h3 class="conditions__description">
          {{ weather.description }}
        </h3>

        <h4 class="conditions__text">
          {{ weather.conditions }}
        </h4>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import WidgetLoading from "@/components/WidgetLoading.vue";
import WeatherForecastIcon from "@/components/weatherForecast/icons/WeatherForecastIcon.vue";
import { WeatherForecastCurrent } from "@/interfaces/weatherForecastCurrent";

export default defineComponent({
  name: "WeatherForecastToday",

  components: {
    WidgetLoading,
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
      type: Object as PropType<WeatherForecastCurrent>,
      required: true,
      default: (): WeatherForecastCurrent => {
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
});
</script>

<style lang="scss" scoped>
.today {
  .temperature {
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

    &__city-name {
      grid-area: cityName;

      margin: 0;

      font-size: 26px;
      font-weight: 700;
      overflow-wrap: break-word;
    }

    &__icon {
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

    &__text {
      grid-area: temperature;

      margin: 0;

      font-size: 66px;
      font-weight: 700;
      overflow-wrap: break-word;
    }

    &__feels-like {
      grid-area: feelsLike;

      margin: 0;

      font-size: 16px;
      font-weight: 400;
      overflow-wrap: break-word;
    }
  }

  .conditions {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    padding: 20px 0;

    text-align: center;

    &__description {
      margin: 0;

      font-size: 22px;
      font-weight: 700;
      overflow-wrap: break-word;
    }

    &__conditions {
      margin: 0;

      font-size: 16px;
      font-weight: 400;
      overflow-wrap: break-word;
    }
  }
}
</style>
