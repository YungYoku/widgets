<template>
  <div class="add-widget-context">
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
    }
  }
};
</script>

<style lang="scss" scoped>
.add-widget-context {
  position: absolute;
  top: 50%;
  left: 50%;

  padding: 10px;

  background-color: #ffffff;
  border-radius: 20px;

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