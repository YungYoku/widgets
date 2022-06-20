<template>
  <div class="chart">
    <vue-apex-charts
      :options="chartOptions"
      :series="series"
      height="80"
      type="area"
    />
  </div>
</template>

<script>
import VueApexCharts from "vue-apexcharts";

export default {
  name: "WeatherForecastChart",

  components: {
    VueApexCharts
  },

  props: {
    temps: {
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
      const temps = this.temps;

      const top = {
        name: "",
        data: [],
        min: 200
      };

      const bottom = {
        name: "",
        data: [],
        max: -200
      };

      temps.forEach(el => {
        top.min = top.min > el.max ? el.max : top.min;
        bottom.max = bottom.max < el.min ? el.min : bottom.max;
      });

      top.min = top.min < 0 ? Math.abs(top.min) : 0;
      bottom.max = bottom.max < 0 ? 0 : bottom.max;

      temps.forEach((el, index) => {
        top.data.push({
          x: index,
          y: el.max + top.min
        });

        bottom.data.push({
          x: index,
          y: el.min - bottom.max
        });
      });

      return [top, bottom];
    }
  }
};
</script>

<style lang="scss" scoped>
.chart {
  overflow: hidden;
}
</style>
