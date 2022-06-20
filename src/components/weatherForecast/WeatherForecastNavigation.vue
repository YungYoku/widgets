<template>
  <div class="navigation">
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
import settings from "@/assets/img/settings.svg";
import saved from "@/assets/img/saved.svg";
import map from "@/assets/img/map.svg";

export default {
  name: "WeatherForecastNavigation",

  props: {
    weatherShowing: {
      type: Boolean,
      required: true,
      default: false
    }
  },

  data() {
    return {
      navigationStore: [
        {
          img: settings,
          alt: "Настройки",
          weatherShowing: false,
          action: () => {
            this.$emit("openSettings");
          }
        },
        {
          img: saved,
          alt: "Сохранённое",
          weatherShowing: false,
          action: () => {
            this.$emit("openSaved");
          }
        },
        {
          img: map,
          alt: "На карте",
          weatherShowing: true,
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
        return (nav.weatherShowing && this.weatherShowing) || !nav.weatherShowing;
      });

      return navigationStore;
    }
  }
};
</script>

<style lang="scss" scoped>
.navigation {
  position: absolute;
  top: 20px;
  left: 20px;

  display: flex;
  justify-content: center;
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