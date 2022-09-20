<template>
  <div class="chart without-context">
    <vue-apex-charts
      :options="chartOptions"
      :series="series"
      height="80"
      type="area"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import VueApexCharts from "vue3-apexcharts";
import { Temperature } from "@/interfaces/temperature";
import { GraphItem } from "@/interfaces/graphItem";

export default defineComponent({
  name: "WeatherForecastChart",

  components: {
    VueApexCharts
  },

  props: {
    temperature: {
      type: Array,
      required: true,
      default: () => {
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
    series() {
      const temperature = this.temperature as Array<Temperature>;

      const graphTop = {
        name: "",
        data: [] as Array<GraphItem>,
        min: 200
      };

      const graphBottom = {
        name: "",
        data: [] as Array<GraphItem>,
        max: -200
      };

      temperature.forEach(el => {
        if (graphTop.min > el.max) {
          graphTop.min = el.max;
        }

        if (graphBottom.max < el.min) {
          graphBottom.max = el.min;
        }
      });

      graphTop.min = graphTop.min < 0 ? Math.abs(graphTop.min) : 0;
      if (graphBottom.max < 0) {
        graphBottom.max = 0;
      }

      temperature.forEach((el, index) => {
        graphTop.data.push({
          x: index,
          y: el.max + graphTop.min
        });

        graphBottom.data.push({
          x: index,
          y: el.min - graphBottom.max
        });
      });

      return [graphTop, graphBottom];
    }
  }
});
</script>

<style lang="scss" scoped>
.chart {
  overflow: hidden;
}
</style>
