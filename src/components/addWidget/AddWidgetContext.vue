<template>
  <div
    :style="{
      left: styleLeft
    }"
    class="add-widget-context"
  >
    <button
      v-for="widget in widgets"
      :key="widget.is"
      type="button"
      @click="$emit('addWidget', widget.is)"
    >
      {{ widget.name }}
    </button>
  </div>
</template>

<script>
export default {
  name: "AddWidgetContext",

  props: {
    widgets: {
      type: Array,
      required: true,
      default: () => []
    },

    x: {
      type: Number,
      required: true,
      default: 0
    }
  },

  computed: {
    styleLeft() {
      const x = this.x;

      if (x > 0) {
        return `calc(50% + ${x})`;
      } else if (x < 0) {
        return `calc(50% - ${Math.abs(x)})`;
      } else {
        return `50%`;
      }
    }
  },

  mounted() {
    document.addEventListener("click", this.handleClick);
  },

  destroyed() {
    document.removeEventListener("click", this.handleClick);
  },

  methods: {
    handleClick(e) {
      const className = e.target.className;

      if (
        className
        && className !== "add-widget__button"
        && className !== "add-widget-context"
      ) {
        this.$emit("hide");
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.add-widget-context {
  position: absolute;
  top: 50%;
  left: 50%;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  padding: 10px;

  background-color: #ffffff;
  border-radius: 20px;

  gap: 10px;

  button {
    padding: 10px;

    white-space: nowrap;

    background-color: #ffffff;
    border-radius: 10px;

    cursor: pointer;
    transition: all 0.2s;

    &:hover {
      background-color: #999999;

      transition: all 0.2s;
    }
  }
}
</style>