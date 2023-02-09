<template>
  <div class="chart without-context">
    <vue-apex-charts
      :options="chartOptions"
      :series="graph"
      height="80"
      type="area"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import VueApexCharts from "vue3-apexcharts";
import { Temperature } from "@/components/weatherForecast/interfaces/temperature";
import { GraphItem } from "@/components/weatherForecast/interfaces/graphItem";

export default defineComponent({
  name: "WeatherForecastChart",

  components: {
    VueApexCharts
  },

  props: {
    temperature: {
      type: Array as PropType<Array<Temperature>>,
      required: true,
      default: (): Array<Temperature> => {
        return [
          {
            date: "1 января",
            icon: "https://openweathermap.org/img/wn/02d.png",
            max: 0,
            min: 0,
            weekDayNaming: "Сегодня"
          },

          {
            date: "2 января",
            icon: "https://openweathermap.org/img/wn/02d.png",
            max: 0,
            min: 0,
            weekDayNaming: "Пн"
          },

          {
            date: "3 января",
            icon: "https://openweathermap.org/img/wn/02d.png",
            max: 0,
            min: 0,
            weekDayNaming: "Вт"
          },

          {
            date: "4 января",
            icon: "https://openweathermap.org/img/wn/02d.png",
            max: 0,
            min: 0,
            weekDayNaming: "Ср"
          },

          {
            date: "5 января",
            icon: "https://openweathermap.org/img/wn/02d.png",
            max: 0,
            min: 0,
            weekDayNaming: "Чт"
          },

          {
            date: "6 января",
            icon: "https://openweathermap.org/img/wn/02d.png",
            max: 0,
            min: 0,
            weekDayNaming: "Пт"
          },

          {
            date: "7 января",
            icon: "https://openweathermap.org/img/wn/02d.png",
            max: 0,
            min: 0,
            weekDayNaming: "Сб"
          },

          {
            date: "8 января",
            icon: "https://openweathermap.org/img/wn/02d.png",
            max: 0,
            min: 0,
            weekDayNaming: "Вс"
          }
        ];
      }
    },

    chartColors: {
      type: Object,
      required: true,
      default: () => {
        return {
          day: "#000000",
          night: "#000000"
        };
      }
    }
  },

  data() {
    return {
      chartOptions: {
        annotations: {
          position: "back"
        },

        chart: {
          selection: {
            enabled: false
          },

          zoom: {
            enabled: false
          },

          toolbar: {
            show: false
          },

          sparkline: {
            enabled: false
          }
        },

        tooltip: {
          enabled: false
        },

        colors: [this.chartColors.day, this.chartColors.night],

        dataLabels: {
          enabled: false
        },

        stroke: {
          show: false,
          curve: "straight",
          colors: ["transparent"]
        },

        grid: {
          show: false
        },

        legend: {
          show: false
        },

        markers: {
          size: 0,
          hover: {
            size: 0
          }
        },

        plotOptions: {
          area: {
            fillTo: "origin"
          }
        },

        fill: {
          type: "solid"
        },

        xaxis: {
          type: "numeric",
          labels: {
            show: false,
            style: {
              colors: "transparent"
            }
          },
          axisBorder: {
            show: false
          },
          axisTicks: {
            show: false
          },
          title: {
            style: {
              color: "transparent"
            }
          },
          crosshairs: {
            show: false
          },
          tooltip: {
            enabled: false
          }
        },

        yaxis: {
          show: false,

          labels: {
            show: false,
            style: {
              colors: "transparent"
            }
          },
          axisBorder: {
            show: false
          },
          axisTicks: {
            show: false
          },
          title: {
            style: {
              color: "transparent"
            }
          },
          crosshairs: {
            show: false
          },
          tooltip: {
            enabled: false
          }
        }
      }
    };
  },

  computed: {
    graph() {
      return [this.graphTop, this.graphBottom];
    },

    graphTop() {
      const data = [] as Array<GraphItem>;
      let min = 200;

      this.temperature.forEach(el => {
        if (min > el.max) {
          min = el.max;
        }
      });

      if (min < 0) {
        min = Math.abs(min);
      } else {
        min = 0;
      }

      this.temperature.forEach((el, index) => {
        data.push({
          x: index,
          y: el.max + min
        });
      });

      return {
        name: "",
        data,
        min
      };
    },

    graphBottom() {
      const data = [] as Array<GraphItem>;
      let max = -200;

      this.temperature.forEach(el => {
        if (max < el.min) {
          max = el.min;
        }
      });

      if (max < 0) {
        max = 0;
      }

      this.temperature.forEach((el, index) => {
        data.push({
          x: index,
          y: el.min - max
        });
      });

      return {
        name: "",
        data,
        max
      };
    }
  }
});
</script>

<style lang="scss" scoped>
.chart {
  overflow: hidden;
}
</style>
