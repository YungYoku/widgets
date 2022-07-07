<template>
  <div class="error">
    <h2 class="error__text">
      {{ errorText }}
    </h2>
  </div>
</template>

<script>
export default {
  name: "WidgetError",

  props: {
    text: {
      type: String,
      required: false,
      default: ""
    },

    geoExistError: {
      type: Boolean,
      required: false,
      default: false
    },

    geoAccessError: {
      type: Boolean,
      required: false,
      default: false
    }
  },

  computed: {
    errorText() {
      if (this.text) {
        return this.text;
      }

      if (this.geoExistError) {
        return "Устройство не поддерживает геолокацию";
      }

      if (this.geoAccessError) {
        return "Доступ к геолокации запрещен";
      }

      return "";
    }
  }
};
</script>

<style lang="scss" scoped>
.error {
  width: 100%;
  margin-bottom: 20px;

  &__text {
    margin: 0;

    font-size: 22px;
    font-weight: 400;
    text-align: center;
    word-wrap: break-word;
  }
}
</style>