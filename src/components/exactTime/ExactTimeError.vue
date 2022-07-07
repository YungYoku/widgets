<template>
  <div class="exact-time-error">
    {{ text }}
  </div>
</template>

<script>
export default {
  name: "ExactTimeError",

  props: {
    text: {
      type: String,
      required: true,
      default: "Ошибка"
    }
  }
};
</script>

<style lang="scss" scoped>
.exact-time-error {
  text-align: left;
}
</style>