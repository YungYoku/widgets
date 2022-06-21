<template>
  <div class="navigation without-context">
    <button
      v-for="button in navigation"
      :key="button.img"
      class="navigationButton"
      type="button"
      @click="button.action"
    >
      <img
        :alt="button.alt"
        :src="button.img"
        class="navigationButtonImg"
      />
    </button>
  </div>
</template>

<script>
import close from "@/assets/img/close.svg";
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
          action: () => {
            this.$emit("closeWidget");
          }
        },
        {
          img: settings,
          alt: "Настройки",
          action: () => {
            this.$emit("openSettings");
          }
        },
        {
          img: saved,
          alt: "Сохранённое",
          action: () => {
            this.$emit("openSaved");
          }
        },
        {
          img: map,
          alt: "На карте",
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

  &Button {
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

    &Img {
      display: block;

      width: 32px;
      height: 32px;

      pointer-events: none;

      @supports (aspect-ratio: 1 / 1) {
        aspect-ratio: 1 / 1;
      }
    }
  }

  @supports (gap: 10px) {
    gap: 10px;

    &Button {
      margin: 0;
    }
  }
}
</style>