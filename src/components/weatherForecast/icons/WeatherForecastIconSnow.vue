<template>
  <div class="snow">
    <img
      alt="Облако"
      class="cloud"
      src="@/assets/img/cloud.png"
    />

    <img
      alt="Снег"
      class="snowflake snowflake1"
      src="@/assets/img/snowflake.png"
    />

    <img
      alt="Снег"
      class="snowflake snowflake2"
      src="@/assets/img/snowflake.png"
    />

    <img
      alt="Снег"
      class="snowflake snowflake3"
      src="@/assets/img/snowflake.png"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "WeatherForecastIconSnow"
});
</script>

<style lang="scss" scoped>
.snow {
  position: relative;

  width: 100%;
  height: 100%;
  overflow: hidden;

  .cloud {
    position: absolute;
    top: 0;
    left: 5%;
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

  .snowflake {
    position: absolute;
    top: 60%;

    width: 20%;
    height: 20%;

    @keyframes snowflake {
      0% {
        transform: translate(0, 0);
      }
      20% {
        transform: translate(40%, 40%);
      }
      40% {
        transform: translate(-40%, 80%);
      }
      60% {
        transform: translate(0, 120%);
      }
      80% {
        transform: translate(40%, 160%);
      }
      100% {
        transform: translate(0, 200%);
      }
    }
  }

  .snowflake1 {
    left: 20%;

    animation: 1s snowflake .7s infinite;
  }

  .snowflake2 {
    left: 45%;

    animation: 1s snowflake .2s infinite;
  }

  .snowflake3 {
    left: 70%;

    animation: 1s snowflake .8s infinite;
  }
}
</style>