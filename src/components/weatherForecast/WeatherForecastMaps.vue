<template>
  <div class="maps">
    <weather-forecast-close-button @close="$emit('close')" />

    <div class="map">
      <l-map
        :center="coords"
        :zoom="zoom"
      >
        <l-tile-layer :url="url" />
      </l-map>
    </div>
  </div>
</template>

<script>
import { LMap, LTileLayer } from "vue2-leaflet";
import WeatherForecastCloseButton from "@/components/weatherForecast/WeatherForecastCloseButton";

export default {
  name: "WeatherForecastMaps",

  components: {
    WeatherForecastCloseButton,
    LMap,
    LTileLayer
  },

  props: {
    coords: {
      type: Array,
      required: true,
      default: () => {
        return [0, 0];
      }
    }
  },

  data() {
    return {
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      zoom: 15
    };
  },

  mounted() {
    document.querySelector(".leaflet-control-zoom").remove();
    document.querySelector(".leaflet-control-attribution").remove();
  }
};
</script>

<style lang="scss" scoped>
.maps {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 5;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  width: 100%;
  height: 100%;
  overflow: hidden;

  background-color: #ffffff;
  border-radius: 25px;

  .map {
    width: 100%;
    height: 100%;
  }
}
</style>