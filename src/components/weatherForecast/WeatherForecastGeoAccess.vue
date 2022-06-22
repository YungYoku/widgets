<template>
  <div class="geo-access">
    <h2 class="geo-access__text">
      Разрешить доступ к геолокации?
    </h2>

    <form
      class="geo-access__form"
      @submit.prevent
    >
      <button
        class="geo-access__form-button"
        type="button"
        @click="allow"
      >
        Разрешить
      </button>

      <button
        class="geo-access__form-button"
        type="button"
        @click="forbid"
      >
        Запретить
      </button>
    </form>
  </div>
</template>

<script>
export default {
  name: "WeatherForecastGeoAccess",

  methods: {
    allow() {
      this.$emit("allow");
    },

    forbid() {
      this.$emit("forbid");
    }
  }
};
</script>

<style lang="scss" scoped>
.geo-access {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &__text {
    font-size: 24px;
    font-weight: 400;
    text-align: center;
    word-wrap: break-word;
  }

  &__form {
    display: flex;
    justify-content: center;
    align-items: center;

    padding: 20px;

    &-button {
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
  }
}
</style>