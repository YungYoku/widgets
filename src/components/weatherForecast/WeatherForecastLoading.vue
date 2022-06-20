<template>
  <div
    :style="{
      backgroundImage,
      'color': 'green'
    }"
    class="loading"
  >
  </div>
</template>

<script>
export default {
  name: "WeatherForecastLoading",

  computed: {
    backgroundImage() {
      const bgColor = document.documentElement.style.cssText;
      let style;

      const reg = new RegExp(`--main-background-color: rgb`);
      if (bgColor) {
        style = bgColor.replace(reg, "");
      } else {
        style = "--main-background-color: rgb(255, 255, 255);";
      }

      const digits = style
        .split(/\D/)
        .filter(dig => dig !== "")
        .map(dig => parseInt(dig));

      const firstColor = `rgb(${digits[0]}, ${digits[1]}, ${digits[2]})`;
      const difference = 30;
      const secondColor = `rgb(${digits[0] - difference}, ${digits[1] - difference}, ${digits[2] - difference})`;


      return `linear-gradient(90deg, ${firstColor}, ${secondColor}, ${firstColor}, ${secondColor})`;
    }
  }
};
</script>

<style lang="scss" scoped>
.loading {
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;
  padding: 30px;

  background-size: 300% 100%;
  border-radius: 10px;

  animation: 1s loading linear infinite;

  @keyframes loading {
    from {
      background-position: 100% 0;
    }
    to {
      background-position: 0 0;
    }
  }
}
</style>
