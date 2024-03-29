<template>
  <div
    :style="{
      left: styleLeft
    }"
    class="add-widget-context"
  >
    <button
      v-for="widget in widgets"
      :key="widget.type"
      type="button"
      @click="$emit('addWidget', widget.type)"
    >
      {{ widget.name }}
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "WidgetAddingContext",

  props: {
    x: {
      type: Number,
      required: true,
      default: 0
    }
  },

  data() {
    return {
      widgets: [
        {
          name: "Прогноз погоды",
          type: "weather-forecast"
        },
        {
          name: "Точное время",
          type: "exact-time"
        },
        {
          name: "Курс валют",
          type: "exchange-rate"
        }
      ]
    };
  },

  computed: {
    styleLeft() {
      const x = this.x;

      if (x > 0) return `calc(50% + ${x}px)`;

      if (x < 0) return `calc(50% - ${Math.abs(x)}px)`;

      return `50%`;
    }
  },

  mounted() {
    document.addEventListener("click", this.handleClick);
  },

  unmounted() {
    document.removeEventListener("click", this.handleClick);
  },

  methods: {
    isContextNotClicked(className: string) {
      return (
        className !== "add-widget__button" &&
        className !== "add-widget__button-img" &&
        className !== "add-widget-context"
      );
    },

    handleClick(event: MouseEvent) {
      const target = event.target as HTMLElement | undefined;
      if (!target) {
        return;
      }

      const className = target.className;
      if (className && this.isContextNotClicked(className)) {
        this.$emit("hide");
      }
    }
  }
});
</script>

<style lang="scss" scoped>
.add-widget-context {
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 7;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  padding: 5px;

  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 3px 9px 1px rgba(102, 102, 102, 0.425);

  button {
    width: 100%;
    padding: 5px;

    text-align: left;
    white-space: nowrap;

    border-radius: 5px;

    cursor: pointer;
    transition: all 0.2s;

    &:hover {
      background-color: rgba(153, 153, 153, 0.3);

      transition: all 0.2s;
    }
  }
}
</style>