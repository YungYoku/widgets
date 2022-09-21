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

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "WeatherForecastBackButton"
});
</script>

<style lang="scss" scoped>
.close {
  z-index: 8;

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

    width: 24px;
    height: 24px;

    pointer-events: none;

    @supports (aspect-ratio: 1 / 1) {
      aspect-ratio: 1 / 1;
    }
  }
}
</style>