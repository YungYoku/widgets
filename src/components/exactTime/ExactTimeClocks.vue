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
    </div>
  </div>
</template>

<script>
export default {
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
};
</script>

<style lang="scss" scoped>
.exact-time-clocks {
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100px;
  overflow: hidden;

  &__circle {
    position: relative;

    width: 100px;
    height: 100px;

    border: 2px solid #222222;
    border-radius: 50%;

    .exact-time-clocks__arrow.seconds {
      &::after {
        height: 1px;
      }
    }

    .exact-time-clocks__arrow.minutes {
      &::after {
        height: 2px;
      }
    }

    .exact-time-clocks__arrow.hours {
      &::after {
        height: 3px;
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
        top: 0;
        left: 50%;

        width: 50%;

        background-color: #222222;
      }
    }
  }
}
</style>