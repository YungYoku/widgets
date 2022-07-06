<template>
  <div class="exchange-rate-error">
    {{ text }}
  </div>
</template>

<script>
export default {
  name: "ExchangeRateError",

  props: {
    text: {
      type: String,
      required: true,
      default: "Ошибка"
    }
  }
};
</script>

<style scoped>
.exchange-rate-error {
  text-align: left;
}
</style>