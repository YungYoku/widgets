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
        @ready="removeUiTrash"
      >
        <l-tile-layer :url="url" />
      </l-map>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import WeatherForecastCloseButton from "@/components/weatherForecast/WeatherForecastBackButton.vue";
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer } from "@vue-leaflet/vue-leaflet";

export default defineComponent({
  name: "WeatherForecastMaps",

  components: {
    WeatherForecastCloseButton,
    LMap,
    LTileLayer
  },

  props: {
    coords: {
      type: Array as PropType<Array<number>>,
      required: true,
      default: (): Array<number> => [0, 0]
    }
  },

  data() {
    return {
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      zoom: 15,
      uiCleaned: false
    };
  },

  methods: {
    removeUiTrash() {
      const uiTrash = document.querySelector(".leaflet-control-container");

      if (uiTrash && !this.uiCleaned) {
        this.uiCleaned = true;
        uiTrash.remove();
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
  border-radius: 15px;

  &__close-button {
    position: absolute;
    top: 30px;
    left: 20px;
  }

  &__map {
    position: relative;
    z-index: 6;

    width: 100%;
    height: 100%;
  }
}
</style>