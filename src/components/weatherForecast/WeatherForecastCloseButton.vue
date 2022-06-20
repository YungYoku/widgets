<template>
  <button
    class="close"
    @click="$emit('close')"
  >
    <img
      alt="Назад"
      class="closeImg"
      src="@/assets/img/close.svg"
    />
  </button>
</template>

<script>
export default {
  name: "WeatherForecastCloseButton"
};
</script>

<style lang="scss" scoped>
.close {
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 10000;

  display: flex;
  justify-content: center;
  align-items: center;

  box-sizing: border-box;

  padding: 0;

  background: transparent;
  border: none;

  cursor: pointer;
  transition: all 0.1s;

  -webkit-appearance: button;

  &:hover,
  &:focus {
    transform: scale(1.1);
    transition: all 0.1s;
  }

  &Img {
    display: block;

    width: 32px;
    height: 32px;

    pointer-events: none;

    @supports (aspect-ratio: 1 / 1) {
      aspect-ratio: 1 / 1;
    }
  }
}
</style>