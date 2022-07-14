<template>
  <div class="mist">
    <weather-forecast-icon-sun class="sun" />

    <img
      alt="Туман"
      class="mistImg"
      src="@/assets/img/mist.png"
    />
  </div>
</template>

<script lang="ts">
import WeatherForecastIconSun from "@/components/weatherForecast/icons/WeatherForecastIconSun.vue";
import Vue from "vue";

export default Vue.extend({
  name: "WeatherForecastIconMist",
  components: { WeatherForecastIconSun }
});
</script>

<style lang="scss" scoped>
.mist {
  position: relative;

  width: 100%;
  height: 100%;

  .sun {
    position: absolute;
    top: 0;
    left: 0;

    width: 100%;
    height: 100%;
  }

  .mistImg {
    position: absolute;
    bottom: 0;
    left: 10%;

    width: 80%;
    height: 80%;

    animation: 2s mist linear infinite alternate;

    @keyframes mist {
      from {
        transform: translate(0, 0);
      }
      to {
        transform: translate(-20%, 0);
      }
    }
  }
}
</style>