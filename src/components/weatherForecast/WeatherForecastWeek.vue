<template>
  <div class="week with-context">
    <widget-loading v-if="loading" />

    <div
      v-else
      class="days"
    >
      <div
        v-for="(day, i) in weather.week"
        :key="i"
        class="days__item"
      >
        <h4 class="days__item-name">
          {{ day.weekDayNaming }}
        </h4>

        <span class="days__item-date">
          {{ day.date }}
        </span>

        <weather-forecast-icon
          :icon="day.icon"
          class="days__item-img"
        />
      </div>
    </div>


    <widget-loading v-if="loading" />

    <div
      v-else
      class="graph"
    >
      <div class="graph__max">
        <div
          v-for="(day, i) in weather.week"
          :key="day.max + '' + i"
          class="graph__max-item"
        >
          {{ day.max }}°
        </div>
      </div>

      <weather-forecast-chart
        :chart-colors="chartColors"
        :temperature="weather.week"
      />

      <div class="graph__min">
        <div
          v-for="(day, i) in weather.week"
          :key="day.min + '' + i"
          class="graph__min-item"
        >
          {{ day.min }}°
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import WidgetLoading from "@/components/WidgetLoading.vue";
import WeatherForecastChart from "@/components/weatherForecast/WeatherForecastChart.vue";
import WeatherForecastIcon from "@/components/weatherForecast/icons/WeatherForecastIcon.vue";
import { ChartColors } from "@/interfaces/chartColors";
import { TemperatureColors } from "@/enums/temperatureColors";
import { WeatherForecastDaily } from "@/interfaces/weatherForecastDaily";

export default defineComponent({
  name: "WeatherForecastWeek",

  components: {
    WidgetLoading,
    WeatherForecastChart,
    WeatherForecastIcon
  },

  props: {
    loading: {
      type: Boolean,
      required: true,
      default: true
    },

    weather: {
      type: Object as PropType<WeatherForecastDaily>,
      required: true,
      default: (): WeatherForecastDaily => {
        return {
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
        };
      }
    }
  },

  computed: {
    chartColors(): ChartColors {
      return {
        day: this.getTemperatureColor(this.weather.averageTemperatureDay),
        night: this.getTemperatureColor(this.weather.averageTemperatureNight)
      };
    }
  },

  methods: {
    getTemperatureColor(temperature: number) {
      if (temperature >= 30) return TemperatureColors.Hotter;

      if (temperature >= 20) return TemperatureColors.Hot;

      if (temperature > 0) return TemperatureColors.Normal;

      if (temperature <= -20) return TemperatureColors.Colder;

      if (temperature <= 0) return TemperatureColors.Cold;

      return TemperatureColors.Normal;
    }
  }
});
</script>

<style lang="scss" scoped>
.week {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 50px;

  @media (max-width: 600px) {
    overflow-x: auto;
    overflow-y: hidden;
  }

  .days {
    display: grid;
    justify-content: space-between;
    align-items: center;

    grid-template: auto / repeat(8, 1fr);

    width: 100%;

    font-weight: 700;
    text-align: center;

    &__item {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      &-name {
        margin: 0;

        font-size: 16px;
        font-weight: 700;
        overflow-wrap: break-word;

        @media (max-width: 768px) {
          max-width: 3ch;
          max-height: 3ch;
          overflow: hidden;
        }
      }

      &-date {
        @media (max-width: 420px) {
          width: 27px;
        }
      }

      &-img {
        display: block;

        width: 100%;
        max-width: 40px;
        max-height: 40px;

        border-radius: 5px;

        pointer-events: none;

        @supports (aspect-ratio: 1 / 1) {
          aspect-ratio: 1 / 1;
        }
      }
    }
  }

  .graph {
    display: grid;

    grid-template: repeat(3, auto) / 1fr;

    width: 100%;
    padding: 50px 20px 40px 20px;

    font-weight: 700;

    @media (max-width: 768px) {
      padding: 50px 0 40px 0;
    }

    @media (max-width: 600px) {
      padding: 30px 0 20px 0;
    }

    &__max,
    &__min {
      display: flex;
      justify-content: space-between;
      align-items: center;

      &-item {
        width: 30px;

        font-size: 16px;
        text-align: center;
      }
    }
  }

  @supports (gap: 50px) {
    gap: 50px;

    @media (max-width: 600px) {
      gap: 30px;
    }

    .graph {
      padding: 0 20px 40px 20px;

      @media (max-width: 768px) {
        padding: 0 0 40px 0;
      }

      @media (max-width: 600px) {
        padding: 0 0 20px 0;
      }
    }
  }
}
</style>
