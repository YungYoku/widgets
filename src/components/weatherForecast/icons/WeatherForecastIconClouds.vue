<template>
  <div class="clouds">
    <weather-forecast-icon-sun class="sun" />

    <img
      alt="Облако"
      class="cloud"
      src="@/assets/img/cloud.png"
    />
  </div>
</template>

<script lang="ts">
import WeatherForecastIconSun from "@/components/weatherForecast/icons/WeatherForecastIconSun.vue";
import Vue from "vue";

export default Vue.extend({
  name: "WeatherForecastIconRain",
  components: { WeatherForecastIconSun }
});
</script>

<style lang="scss" scoped>
.clouds {
  position: relative;

  width: 100%;
  height: 100%;

  .sun {
    position: absolute;
    top: 10%;
    left: 10%;

    width: 55%;
    height: 55%;
  }

  .cloud {
    position: absolute;
    right: 0;
    bottom: 0;
    z-index: 2;

    width: 90%;
    height: 90%;

    animation: 1s cloud linear infinite alternate;

    @keyframes cloud {
      from {
        transform: translateX(-5%);
      }
      to {
        transform: translateX(5%);
      }
    }
  }
}
</style>