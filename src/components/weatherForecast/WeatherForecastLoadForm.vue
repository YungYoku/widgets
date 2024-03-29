<template>
  <div>
    <form
      :class="{
        'searchable': city.length
      }"
      autocomplete="off"
      class="load-form"
      @submit.prevent="load"
    >
      <input
        ref="inputCity"
        v-model.trim="city"
        :class="{
          'error': inputError
        }"
        :placeholder="placeholder"
        class="input-city"
        name="inputCity"
        required
        title="Название города"
        type="text"
      />

      <div
        v-if="selectShowing && city && optionCities.length >= 1"
        class="city-select"
      >
        <button
          v-for="oCity in optionCities"
          :key="oCity"
          class="city-select__button"
          type="button"
          @click="setCity(oCity)"
        >
          {{ oCity }}
        </button>
      </div>

      <button
        :class="{
          'clickable': city.length
        }"
        class="search"
        type="submit"
      >
        Поиск
        <img
          alt="Поиск"
          class="search-img"
          src="@/assets/img/search.svg"
        />
      </button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import citiesTree from "@/assets/ts/cities";
import { isLetterOfRussianAlphabet } from "@/components/weatherForecast/interfaces/citiesAlphabet";

export default defineComponent({
  name: "WeatherForecastLoadForm",

  props: {
    loading: {
      type: Boolean,
      required: true,
      default: true
    },

    cityExistError: {
      type: Boolean,
      required: true,
      default: false
    },

    searchesAmount: {
      type: Number,
      required: true,
      default: 0
    }
  },

  data() {
    return {
      city: "",
      selectShowing: false,
      citiesTree: citiesTree
    };
  },

  computed: {
    inputError() {
      return this.cityExistError && this.searchesAmount > 0;
    },

    placeholder() {
      return this.inputError ? "Введите существующий город" : "Введите город";
    },

    optionCities() {
      const firstLetter = this.city[0].toLowerCase();
      if (isLetterOfRussianAlphabet(firstLetter)) {
        const cities = this.citiesTree[firstLetter];
        return cities
          .filter(city => city.startsWith(this.city))
          .filter(city => city !== this.city)
          .slice(0, 20);
      }

      return [];
    }
  },

  watch: {
    city() {
      // Убирает лишние пробелы
      this.city = this.city.replace(/\s\s/gi, " ");

      // Оставляет буквы и тире
      this.city = this.city.replace(/[^a-zа-яё\s-]/gi, "");

      if (this.city.length) {
        this.selectShowing = true;

        this.city = this.city.toLowerCase();

        // Слова с заглавной буквы
        this.city = this.city.replace(/(^|\s|-)\S/g, l => l.toUpperCase());
      }
    }
  },

  mounted() {
    document.addEventListener("click", this.handleClick);
  },

  unmounted() {
    document.removeEventListener("click", this.handleClick);
  },

  methods: {
    handleClick(event: MouseEvent) {
      const target = event.target as HTMLElement | undefined;
      if (!target) {
        return;
      }

      const className = target.className.toString();

      if (className) {
        const isInputClicked = className.includes("inputCity");
        const isOptionClicked = className.includes("citySelect") || className.includes("citySelectItem");

        if (isInputClicked) {
          this.selectShowing = true;
        } else if (!isOptionClicked) {
          this.selectShowing = false;
        }
      } else {
        this.selectShowing = false;
      }
    },

    load() {
      if (this.city && !this.loading) {
        this.$emit("formSubmit", this.city);
        this.city = "";
      }
    },

    setCity(city: string) {
      this.city = city;
      this.selectShowing = false;

      const inputCity = this.$refs.inputCity as HTMLElement | undefined;
      if (inputCity) {
        inputCity.focus();
      }
    }
  }
});
</script>

<style lang="scss" scoped>
.load-form {
  position: relative;

  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  height: 100%;

  @media (min-width: 768px) {
    &.searchable {
      .input-city,
      .search {
        width: 50%;

        transition: all 0.3s;
      }
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;

    grid-template: auto auto / 1fr;
  }

  .input-city {
    display: flex;
    justify-content: flex-start;
    align-items: center;

    box-sizing: border-box;

    width: calc(100% - 90px);
    height: 38px;
    margin-right: 10px;
    padding: 10px;

    font: inherit;
    font-size: 14px;
    font-weight: 400;

    background: transparent;
    border: 1px solid #333333;
    border-radius: 10px;

    transition: all 0.3s;

    user-select: text;

    @media (max-width: 1000px) {
      width: 100%;
    }

    &::placeholder {
      color: unset;
    }

    &:focus {
      border: 1px solid #fb8e00;

      transition: all 0.1s;
    }
  }

  .city-select {
    position: absolute;
    top: 38px;
    left: 0;
    z-index: 2;

    display: flex;
    flex-direction: column;

    max-height: 200px;
    margin: 0;
    padding: 10px;
    overflow: auto;

    background-color: var(--widget-background-color);
    border: none;
    border-radius: 10px;
    outline: none;

    &__button {
      width: 100%;
      height: 30px;
      padding: 5px 10px;

      font-size: 14px;
      font-weight: 400;
      text-align: left;

      border-radius: 5px;

      cursor: pointer;
      transition: all 0.3s;

      &:hover,
      &:focus {
        backdrop-filter: brightness(0.8);
        transition: all 0.3s;
      }
    }
  }

  .error {
    color: #ff4646;

    border: 1px solid #ff4646;
  }

  .search {
    display: flex;
    justify-content: center;
    align-items: center;

    box-sizing: border-box;

    width: 90px;
    height: 38px;
    padding: 10px;

    font: inherit;
    font-size: 14px;
    font-weight: 400;
    color: #999999;

    background: transparent;
    border: 1px solid #999999;
    border-radius: 10px;

    cursor: not-allowed;
    transition: all 0.3s;

    -webkit-appearance: button;

    @media (max-width: 768px) {
      width: 100%;
    }

    .search-img {
      display: block;

      width: 16px;
      height: 16px;
      margin-left: 5px;

      filter: invert(60%);
      transition: all 0.3s;

      pointer-events: none;

      @supports (aspect-ratio: 1 / 1) {
        aspect-ratio: 1 / 1;
      }
    }

    &:hover {
      color: #ffffff;

      background-color: #ff4646;
      border: 1px solid #ff4646;

      .search-img {
        filter: invert(1);
      }
    }

    &:focus {
      border: 1px solid #ff4646;
    }

    &.clickable {
      color: #333333;

      border: 1px solid #333333;

      cursor: pointer;

      .search-img {
        filter: invert(0);
      }

      &:focus {
        border: 1px solid #fb8e00;
      }

      &:hover {
        color: #ffffff;

        background-color: #333333;
        border: 1px solid #333333;

        transition: all 0.1s;

        .search-img {
          filter: invert(100%);
          transition: all 0.1s;
        }
      }
    }
  }

  @supports (gap: 10px) {
    gap: 10px;

    .input-city {
      margin-right: 0;
    }
  }
}
</style>