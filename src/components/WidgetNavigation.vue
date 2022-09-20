<template>
  <div class="navigation without-context">
    <button
      v-for="nav in navigation"
      :key="nav.img"
      class="navigation__button"
      type="button"
      @click="action(nav)"
    >
      <img
        :alt="nav.alt"
        :src="nav.img"
        class="navigation__button-img"
      />
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import close from "@/assets/img/close.svg";
import arrowUp from "@/assets/img/arrow-up.svg";
import arrowDown from "@/assets/img/arrow-down.svg";
import settings from "@/assets/img/settings.svg";
import saved from "@/assets/img/saved.svg";
import map from "@/assets/img/map.svg";
import { WidgetNavigation } from "@/interfaces/widgetNavigation";

export default defineComponent({
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
      ] as Array<WidgetNavigation>
    };
  },

  computed: {
    navigation() {
      return this.navigationStore.filter(nav => {
        return this.rules.includes(nav.name);
      });
    }
  },

  methods: {
    swapImage(nav: WidgetNavigation) {
      if (nav.alt === "Свернуть") {
        nav.img = arrowDown;
        nav.alt = "Развернуть";
      } else if (nav.alt === "Развернуть") {
        nav.img = arrowUp;
        nav.alt = "Свернуть";
      }
    },

    action(nav: WidgetNavigation) {
      this.$emit(nav.emitType);

      if (nav.imageSwapping) {
        this.swapImage(nav);
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