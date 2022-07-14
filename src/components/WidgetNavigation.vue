<template>
  <div class="navigation without-context">
    <button
      v-for="button in navigation"
      :key="button.img"
      class="navigation__button"
      type="button"
      @click="action(button.name)"
    >
      <img
        :alt="button.alt"
        :src="button.img"
        class="navigation__button-img"
      />
    </button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import close from "@/assets/img/close.svg";
import arrowUp from "@/assets/img/arrow-up.svg";
import arrowDown from "@/assets/img/arrow-down.svg";
import settings from "@/assets/img/settings.svg";
import saved from "@/assets/img/saved.svg";
import map from "@/assets/img/map.svg";

export default Vue.extend({
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
          name: "close",
          img: close,
          alt: "Выход",
          emitType: "closeWidget",
          imageSwapping: false
        },

        {
          name: "collapse",
          img: arrowUp,
          alt: "Свернуть",
          emitType: "collapseWidget",
          imageSwapping: true
        },

        {
          name: "settings",
          img: settings,
          alt: "Настройки",
          emitType: "openSettings",
          imageSwapping: false
        },

        {
          name: "saved",
          img: saved,
          alt: "Сохранённое",
          emitType: "openSaved",
          imageSwapping: false
        },

        {
          name: "map",
          img: map,
          alt: "На карте",
          emitType: "openMap",
          imageSwapping: false
        }
      ]
    };
  },

  computed: {
    navigation() {
      let navigationStore = this.navigationStore;

      navigationStore = navigationStore.filter(nav => {
        return this.rules.includes(nav.name);
      });

      return navigationStore;
    }
  },

  methods: {
    swapImage(name: string) {
      const nav = this.navigationStore.find(item => item.name === name);

      if (nav) {
        if (nav.alt === "Свернуть") {
          nav.img = arrowDown;
          nav.alt = "Развернуть";
        } else if (nav.alt === "Развернуть") {
          nav.img = arrowUp;
          nav.alt = "Свернуть";
        }
      }
    },

    action(name: string) {
      const nav = this.navigationStore.find(item => item.name === name);

      if (nav) {
        this.$emit(nav.emitType);

        if (nav.imageSwapping) {
          this.swapImage(name);
        }
      }
    }
  }
});
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

      width: 24px;
      height: 24px;

      pointer-events: none;

      @supports (aspect-ratio: 1 / 1) {
        aspect-ratio: 1 / 1;
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