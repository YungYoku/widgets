<template>
  <div class="maps">
    <weather-forecast-close-button
      class="maps__close-button"
      @close="$emit('close')"
    />

    <div class="maps__map">
      <l-map
        :center="coords"
        :zoom="zoom"
      >
        <l-tile-layer :url="url" />
      </l-map>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import WeatherForecastCloseButton from "@/components/weatherForecast/WeatherForecastBackButton.vue";
import { LMap, LTileLayer } from "vue2-leaflet";

export default Vue.extend({
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
    this.removeLeafletUiTrash();
  },

  methods: {
    removeLeafletUiTrash() {
      const leafletZoom = document.querySelector(".leaflet-control-zoom");
      if (leafletZoom) {
        leafletZoom.remove();
      }

      const leafletAttribution = document.querySelector(".leaflet-control-attribution");
      if (leafletAttribution) {
        leafletAttribution.remove();
      }
    }
  }
});
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

  &__close-button {
    position: absolute;
    top: 30px;
    left: 20px;
  }

  &__map {
    width: 100%;
    height: 100%;
  }
}
</style>