<template>
  <button
    class="close"
    type="button"
    @click="$emit('close')"
  >
    <img
      alt="Назад"
      class="close__img"
      src="@/assets/img/close.svg"
    />
  </button>
</template>

<script>
export default {
  name: "WeatherForecastBackButton"
};
</script>

<style lang="scss" scoped>
.close {
  z-index: 10000;

  display: flex;
  justify-content: center;
  align-items: center;

  box-sizing: border-box;

  margin: 0 auto 0 0;
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

  &__img {
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