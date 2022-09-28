<template>
  <div
    :style="{
      backgroundImage
    }"
    class="loading without-context"
  >
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Color } from "@/types/color";

export default defineComponent({
  name: "WidgetLoading",

  props: {
    color: {
      type: String as PropType<Color>,
      required: false,
      default: "rgb(255, 255, 255)" as Color
    }
  },

  computed: {
    backgroundImage() {
      const firstColor = this.color;

      const style = this.color.replace("rgb", "");
      const difference = 30;
      const digits = style
        .split(/\D/)
        .filter(digit => digit !== "")
        .map(digit => parseInt(digit))
        .map(digit => digit - difference);

      const secondColor = `rgb(${digits[0]}, ${digits[1]}, ${digits[2]})`;

      return `linear-gradient(90deg, ${firstColor}, ${secondColor}, ${firstColor}, ${secondColor})`;
    }
  }
});
</script>

<style lang="scss" scoped>
.loading {
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;
  padding: 30px;

  background-size: 300% 100%;
  border-radius: 10px;

  animation: 1s loading linear infinite;

  @keyframes loading {
    from {
      background-position: 100% 0;
    }
    to {
      background-position: 0 0;
    }
  }
}
</style>
