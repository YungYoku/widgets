<template>
  <div class="lightning">
    <img
      alt="Облако"
      class="cloud cloud1"
      src="@/assets/img/cloud.png"
    />

    <img
      alt="Облако"
      class="cloud cloud2"
      src="@/assets/img/cloud.png"
    />

    <img
      alt="Молния"
      class="lightning lightning1"
      src="@/assets/img/lightning.png"
    />

    <img
      alt="Облако"
      class="lightning lightning2"
      src="@/assets/img/lightning.png"
    />
  </div>
</template>

<script>
export default {
  name: "WeatherForecastIconLightning"
};
</script>

<style lang="scss" scoped>
.lightning {
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
      0% {
        transform: scale(1, 1);
      }
      20% {
        transform: scale(0.9, 1);
      }
      30% {
        transform: scale(1, 1);
      }
      100% {
        transform: scale(1, 1);
      }
    }
  }

  .cloud2 {
    left: 15%;

    width: 70%;
    height: 70%;

    transform: rotate(180deg);

    animation: 1s cloud2 linear infinite alternate;

    @keyframes cloud2 {
      from {
        transform: translate(0, 45%) rotate(180deg);
      }
      to {
        transform: translate(0, 45%) rotate(180deg);
      }
    }
  }

  .lightning {
    position: absolute;
    z-index: 2;

    width: 40%;
    height: 40%;

    @keyframes lightning {
      0% {
        transform: translate(0, 0);
        opacity: 1;
      }
      20% {
        transform: translate(5%, 10%);
        opacity: 0;
      }
      40% {
        transform: translate(5%, 10%);
        opacity: 1;
      }
      80% {
        transform: translate(0, 0);
        opacity: 1;
      }
      100% {
        transform: translate(5%, 10%);
        opacity: 0;
      }
    }
  }

  .lightning1 {
    right: 0;
    bottom: 15%;

    animation: 1.5s lightning .0s linear infinite;
  }

  .lightning2 {
    right: 30%;
    bottom: 0;

    animation: 1.5s lightning .2s linear infinite;
  }
}
</style>