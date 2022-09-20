<template>
  <div>
    <component :is="'weatherForecastIcon' + icon" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import WeatherForecastIconClouds from "@/components/weatherForecast/icons/WeatherForecastIconClouds.vue";
import WeatherForecastIconLightning from "@/components/weatherForecast/icons/WeatherForecastIconLightning.vue";
import WeatherForecastIconMist from "@/components/weatherForecast/icons/WeatherForecastIconMist.vue";
import WeatherForecastIconSun from "@/components/weatherForecast/icons/WeatherForecastIconSun.vue";
import WeatherForecastIconRain from "@/components/weatherForecast/icons/WeatherForecastIconRain.vue";
import WeatherForecastIconSnow from "@/components/weatherForecast/icons/WeatherForecastIconSnow.vue";

export default defineComponent({
  name: "WeatherForecastIcon",

  components: {
    WeatherForecastIconClouds,
    WeatherForecastIconLightning,
    WeatherForecastIconMist,
    WeatherForecastIconRain,
    WeatherForecastIconSnow,
    WeatherForecastIconSun
  },

  props: {
    icon: {
      type: String,
      required: true,
      default: "Sun"
    }
  }
});
</script>

<style lang="scss" scoped>
div {
  width: 100%;
  height: 100%;
}
</style>