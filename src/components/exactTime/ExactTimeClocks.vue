<template>
  <div class="exact-time-clocks">
    <div class="exact-time-clocks__circle">
      <div
        :style="{
          transform: secondsAngle
        }"
        class="exact-time-clocks__arrow seconds"
      >
      </div>

      <div
        :style="{
          transform: minutesAngle
        }"
        class="exact-time-clocks__arrow minutes"
      >
      </div>

      <div
        :style="{
          transform: hoursAngle
        }"
        class="exact-time-clocks__arrow hours"
      >
      </div>

      <div class="exact-time-clocks__center"></div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "ExactTimeClocks",

  props: {
    seconds: {
      type: Number,
      required: true,
      default: 0
    },

    minutes: {
      type: Number,
      required: true,
      default: 0
    },

    hours: {
      type: Number,
      required: true,
      default: 0
    }
  },

  computed: {
    secondsAngle() {
      const angle = this.seconds * 6 - 90;
      return `rotate(${angle}deg)`;
    },

    minutesAngle() {
      const angle = this.minutes * 6 - 90;
      return `rotate(${angle}deg)`;
    },

    hoursAngle() {
      const angle = this.hours * 30 - 90;
      return `rotate(${angle}deg)`;
    }
  }
});
</script>

<style lang="scss" scoped>
.exact-time-clocks {
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100px;
  margin-top: 10px;
  overflow: hidden;

  &__circle {
    position: relative;

    width: 100px;
    height: 100px;

    border: 3px solid #222222;
    border-radius: 50%;

    .exact-time-clocks__arrow.seconds {
      z-index: 3;

      &::after {
        top: 0;

        width: 45%;
        height: 1px;

        background-color: #ff6666;
      }
    }

    .exact-time-clocks__arrow.minutes {
      z-index: 2;

      &::after {
        top: -1px;

        width: 40%;
        height: 2px;

        background-color: #222222;
      }
    }

    .exact-time-clocks__arrow.hours {
      z-index: 1;

      &::after {
        top: -2px;

        width: 25%;
        height: 4px;

        background-color: #222222;
      }
    }

    .exact-time-clocks__arrow {
      position: absolute;
      top: 50%;

      width: 100%;

      background-color: transparent;
      border-radius: 5px;

      &::after {
        content: '';
        position: absolute;
        left: 50%;

        border-radius: 5px;
      }
    }

    .exact-time-clocks__center {
      position: absolute;
      top: calc(50% - 3px);
      left: calc(50% - 3px);
      z-index: 4;

      width: 6px;
      height: 6px;

      background-color: #222222;
      border-radius: 50%;
    }
  }
}
</style>