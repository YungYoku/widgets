<template>
  <div ref="addWidget" class="add-widget">
    <button
      class="add-widget__button"
      type="button"
      @click="showContext"
    >
      <img
        alt="Добавление"
        class="add-widget__button-img"
        src="@/assets/img/add.svg"
      />
    </button>

    <widget-adding-context
      v-if="contextShowing"
      :widgets="widgets"
      :x="contextX"
      @addWidget="addWidget"
      @hide="hideContext"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import widgetAddingContext from "@/components/widgetAdding/widgetAddingContext.vue";

export default defineComponent({
  name: "WidgetAdding",

  components: { widgetAddingContext },

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
      ],
      contextShowing: false,
      contextX: 0
    };
  },

  methods: {
    showContext() {
      const button = this.$refs.addWidget as HTMLElement;
      if (button) {
        const windowWidth = window.innerWidth;
        const buttonX = button.offsetLeft + 45;

        if (buttonX + 150 > windowWidth) {
          this.contextX = -150;
        } else {
          this.contextX = 0;
        }

        this.contextShowing = true;
      }
    },

    hideContext() {
      this.contextShowing = false;
    },

    addWidget(type: string) {
      this.hideContext();
      this.$emit("addWidget", type);
    }
  }
});
</script>

<style lang="scss" scoped>
.add-widget {
  position: relative;

  display: inline-flex;
  justify-content: center;
  align-items: center;
  order: 10000;

  transition: all 0.3s;

  &__button {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 64px;
    height: 64px;

    background-color: #ffffff;
    border-radius: 15px;

    cursor: pointer;
    opacity: 0.5;
    transition: all 0.2s;

    user-select: none;

    &:hover {
      opacity: 1;
      transition: all 0.2s;
    }

    &:focus {
      opacity: 1;
      transition: all 0.2s;
    }

    &-img {
      width: 24px;
      height: 24px;

      pointer-events: none;
    }
  }
}
</style>