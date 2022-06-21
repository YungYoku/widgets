<template>
  <div class="saved">
    <weather-forecast-close-button
      @close="$emit('close')"
    />

    <h2 class="savedTitle">
      Сохранённое
    </h2>

    <div class="savedList">
      <button
        v-for="city in saved"
        :key="city"
        :class="{
          'savedListBlockedCity': getFormattedCityName(city) === currentCity
        }"
        class="savedListCity"
        @click="loadFromSaved(city)"
      >
        {{ city }}
      </button>

      <h3
        v-if="!saved.length"
        class="savedListEmpty"
      >
        Пусто
      </h3>
    </div>
  </div>
</template>

<script>
import WeatherForecastCloseButton from "@/components/weatherForecast/WeatherForecastBackButton";

export default {
  name: "WeatherForecastSaved",
  components: { WeatherForecastCloseButton },
  props: {
    currentCity: {
      type: String,
      required: true,
      default: ""
    }
  },

  data() {
    return {
      saved: localStorage.saved ? JSON.parse(localStorage.saved) : []
    };
  },

  methods: {
    getFormattedCityName(city) {
      // Оставляет буквы и тире
      city = city.replace(/[^a-zа-яё\s-]/gi, "");

      if (city.length) {
        city = city.toLowerCase();

        // Слова с заглавной буквы
        city = city.replace(/(^|\s)\S/g, l => l.toUpperCase());
      }

      return city;
    },

    loadFromSaved(city) {
      if (city !== this.currentCity) {
        this.$emit("loadFromSaved", this.getFormattedCityName(city));
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.saved {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 5;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  width: 100%;
  height: 100%;
  padding: 30px 20px 20px 20px;

  background-color: var(--main-background-color);

  @supports (backdrop-filter: blur(20px)) {
    background-color: transparent;

    backdrop-filter: blur(20px);
  }
  border-radius: 25px;

  &Title {
    margin: 0 0 20px 0;

    font-size: 26px;
    font-weight: 700;
    overflow-wrap: break-word;
  }

  &List {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 10px;

    &City {
      display: flex;
      justify-content: center;
      align-items: center;

      box-sizing: border-box;

      height: 38px;
      margin: 0 5px;
      padding: 10px;

      font: inherit;
      font-size: 14px;
      font-weight: 400;
      color: #333333;

      background: transparent;
      border: 1px solid #333333;
      border-radius: 10px;

      cursor: pointer;
      transition: all 0.3s;

      -webkit-appearance: button;

      &:focus {
        border: 1px solid #fb8e00;
      }

      &:hover {
        color: #ffffff;

        background-color: #333333;
        border: 1px solid #333333;

        transition: all 0.1s;
      }
    }

    &BlockedCity {
      cursor: not-allowed;

      &:focus {
        border: 1px solid #ff4646;
      }

      &:hover {
        color: #ffffff;

        background-color: #ff4646;
        border: 1px solid #ff4646;

        transition: all 0.1s;
      }
    }

    &Empty {
      margin-bottom: 20px;

      font-size: 16px;
      font-weight: 400;
      overflow-wrap: break-word;
    }

    @supports (gap: 10px) {
      gap: 10px;

      &City {
        margin: 0;
      }
    }
  }
}
</style>