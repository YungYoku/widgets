<template>
  <div class="week withContext">
    <widget-loading v-if="loading" />

    <div
      v-else
      class="days"
    >
      <div
        v-for="(day, i) in weather.week"
        :key="i"
        class="daysItem"
      >
        <h4 class="daysItemName">
          {{ day.weekDayNaming }}
        </h4>

        <span class="daysItemDate">
          {{ day.date }}
        </span>

        <weather-forecast-icon
          :icon="day.icon"
          class="daysItemImg"
        />
      </div>
    </div>


    <widget-loading v-if="loading" />

    <div
      v-else
      class="graph"
    >
      <div class="graphMax">
        <div
          v-for="(day, i) in weather.week"
          :key="day.max + '' + i"
          class="graphMaxItem"
        >
          {{ day.max }}°
        </div>
      </div>

      <weather-forecast-chart
        :chart-colors="chartColors"
        :temps="weather.week"
      />

      <div class="graphMin">
        <div
          v-for="(day, i) in weather.week"
          :key="day.min + '' + i"
          class="graphMinItem"
        >
          {{ day.min }}°
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import WidgetLoading from "@/components/WidgetLoading.vue";
import WeatherForecastChart from "@/components/weatherForecast/WeatherForecastChart.vue";
import WeatherForecastIcon from "@/components/weatherForecast/icons/WeatherForecastIcon.vue";

const hotter = "#DC143C";
const hot = "#FF7F50";
const normal = "#f4df5b";
const cold = "#ADD8E6";
const colder = "#4682B4";

export default {
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
      type: Object,
      required: true,
      default: () => {
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
    chartColors() {
      return {
        day: this.getTempColor(this.weather.averageTemperatureDay),
        night: this.getTempColor(this.weather.averageTemperatureNight)
      };
    }
  },

  methods: {
    getTempColor(temp) {
      if (temp >= 30) {
        return hotter;
      } else if (temp >= 20) {
        return hot;
      } else if (temp > 0) {
        return normal;
      } else if (temp <= -20) {
        return colder;
      } else if (temp <= 0) {
        return cold;
      }
    }
  }
};
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

    &Item {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      &Name {
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

      &Date {
        @media (max-width: 420px) {
          width: 27px;
        }
      }

      &Img {
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

    &Max,
    &Min {
      display: flex;
      justify-content: space-between;
      align-items: center;

      &Item {
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
