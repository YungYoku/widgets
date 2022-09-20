<template>
  <div class="sun">
    <div class="bg"></div>

    <div class="circle"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "WeatherForecastIconSun"
});
</script>

<style lang="scss" scoped>
.sun {
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;
  overflow: hidden;

  animation: 10s sun linear infinite;

  .bg {
    position: absolute;

    width: 100%;
    height: 100%;

    background-color: #ff9800;

    animation: 0.5s bg linear infinite alternate;

    clip-path: polygon(
        15% 15%,
        //
        37% 20%,
        50% 5%,
        63% 20%,
        //
        85% 15%,
        //
        80% 37%,
        95% 50%,
        80% 63%,
        //
        85% 85%,
        //
        63% 80%,
        50% 95%,
        37% 80%,
        //
        15% 85%,
        //
        20% 63%,
        5% 50%,
        20% 37%
    );

    @keyframes bg {
      from {
        clip-path: polygon(
            10% 10%,
            //
            37% 20%,
            50% 0,
            63% 20%,
            //
            90% 10%,
            //
            80% 37%,
            100% 50%,
            80% 63%,
            //
            90% 90%,
            //
            63% 80%,
            50% 100%,
            37% 80%,
            //
            10% 90%,
            //
            20% 63%,
            0 50%,
            20% 37%
        );
      }
      to {
        clip-path: polygon(
            15% 15%,
            //
            37% 20%,
            50% 5%,
            63% 20%,
            //
            85% 15%,
            //
            80% 37%,
            95% 50%,
            80% 63%,
            //
            85% 85%,
            //
            63% 80%,
            50% 95%,
            37% 80%,
            //
            15% 85%,
            //
            20% 63%,
            5% 50%,
            20% 37%
        );
      }
    }
  }

  .circle {
    position: absolute;

    width: 50%;
    height: 50%;
    overflow: hidden;

    background-color: #ffeb3b;
    border-radius: 50%;

    animation: 0.5s circle linear infinite alternate;

    @keyframes circle {
      from {
        transform: scale(1);
      }
      to {
        transform: scale(0.95);
      }
    }
  }

  @keyframes sun {
    from {
      transform: rotate(0);
    }
    to {
      //transform: rotate(0);
      transform: rotate(360deg);
    }
  }
}
</style>