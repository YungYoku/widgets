<template>
  <div class="widgetsView">
    <weather-forecast v-if="true" />
    <exact-time v-if="true" />
    <exchange-rate v-if="true" />
  </div>
</template>

<script>
import ExactTime from "@/components/exactTime/ExactTime";
import ExchangeRate from "@/components/exchangeRate/ExchangeRate";
import WeatherForecast from "@/components/weatherForecast/WeatherForecast.vue";

export default {
  name: "WidgetsView",

  components: { ExchangeRate, ExactTime, WeatherForecast }
};
</script>

<style lang="scss" scoped>
.widgetsView {
  position: relative;

  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: flex-start;

  box-sizing: border-box;

  width: 100%;
  height: 100%;
  min-height: 100vh;
  padding: 30px;
  overflow-x: hidden;
  overflow-y: auto;

  background-color: #222222;

  gap: 30px;

  @media (max-width: 1000px), (max-height: 900px) {
    padding: 10px;
  }

  @media (max-width: 768px) {
    padding: 5px;
  }

  @media (max-width: 600px) {
    padding: 0;
  }
}
</style>
