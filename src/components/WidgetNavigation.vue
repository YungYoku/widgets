<template>
  <div class="navigation without-context">
    <button
      v-for="button in navigation"
      :key="button.img"
      class="navigation__button"
      type="button"
      @click="button.action"
    >
      <img
        :alt="button.alt"
        :class="{
          'turn-over': button.turnOver,
        }"
        :src="button.img"
        class="navigation__button-img"
      />
    </button>
  </div>
</template>

<script>
import close from "@/assets/img/close.svg";
import arrow from "@/assets/img/arrow.svg";
import settings from "@/assets/img/settings.svg";
import saved from "@/assets/img/saved.svg";
import map from "@/assets/img/map.svg";

export default {
  name: "WidgetNavigation",

  props: {
    rules: {
      type: Array,
      required: true,
      default: () => []
    }
  },

  data() {
    return {
      navigationStore: [
        {
          img: close,
          alt: "Выход",
          turnOver: false,
          action: () => {
            this.$emit("closeWidget");
          }
        },

        {
          img: arrow,
          alt: "Сворачивание",
          turnOver: false,
          action: () => {
            this.navigationStore[1].turnOver = !this.navigationStore[1].turnOver;
            this.$emit("collapseWidget");
          }
        },

        {
          img: settings,
          alt: "Настройки",
          turnOver: false,
          action: () => {
            this.$emit("openSettings");
          }
        },

        {
          img: saved,
          alt: "Сохранённое",
          turnOver: false,
          action: () => {
            this.$emit("openSaved");
          }
        },

        {
          img: map,
          alt: "На карте",
          turnOver: false,
          action: () => {
            this.$emit("openMap");
          }
        }
      ]
    };
  },

  computed: {
    navigation() {
      let navigationStore = this.navigationStore;

      navigationStore = navigationStore.filter(nav => {
        return this.rules.includes(nav.alt);
      });

      return navigationStore;
    }
  }
};
</script>

<style lang="scss" scoped>
.navigation {
  display: flex;
  justify-content: flex-start;
  align-items: center;

  &__button {
    display: flex;
    justify-content: center;
    align-items: center;

    box-sizing: border-box;

    margin: 0 10px 0 0;
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

    &-img {
      display: block;

      width: 32px;
      height: 32px;

      pointer-events: none;

      @supports (aspect-ratio: 1 / 1) {
        aspect-ratio: 1 / 1;
      }

      &.turn-over {
        transform: rotate(180deg);
      }
    }
  }

  @supports (gap: 10px) {
    gap: 10px;

    &__button {
      margin: 0;
    }
  }
}
</style>