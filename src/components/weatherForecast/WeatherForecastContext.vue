<template>
  <transition name="context">
    <div
      v-if="showing"
      :style="{
        left: x + 'px',
        top: y + 'px',
      }"
      class="context"
    >
      <button
        v-for="setting in settings"
        :key="setting.text"
        class="contextButton"
        @click="setting.action"
      >
        {{ setting.text }}
      </button>
    </div>
  </transition>
</template>

<script>
export default {
  name: "WeatherForecastSettings",

  props: {
    copyWeatherForecast: {
      type: Function,
      required: true,
      default: () => {
      }
    },

    cityName: {
      type: String,
      required: true,
      default: "Город"
    }
  },

  data() {
    return {
      x: 0,
      y: 0,
      showing: false,
      settings: [
        {
          text: "Скопировать прогноз",
          action: () => {
            navigator.clipboard.writeText(this.copyWeatherForecast());
          }
        },
        {
          text: "Сохранить",
          action: () => {
            const saved = JSON.parse(localStorage.getItem("saved"));

            if (saved) {
              if (typeof saved === "object") {
                if (!saved.includes(this.cityName)) {
                  saved.push(this.cityName);
                  localStorage.saved = JSON.stringify(saved);
                }
              } else {
                localStorage.removeItem("saved");
                localStorage.saved = JSON.stringify([this.cityName]);
              }
            } else {
              localStorage.saved = JSON.stringify([this.cityName]);
            }
          }
        }
      ]
    };
  },

  mounted() {
    document.addEventListener("click", this.handleClick);
    document.querySelector(".weatherForecast").oncontextmenu = this.handleContext;
  },

  destroyed() {
    document.removeEventListener("click", this.handleClick);
  },

  methods: {
    handleClick() {
      this.showing = false;
    },

    setMenuCoords(e) {
      const weatherForecast = document.querySelector(".weatherForecast");
      const weatherForecastWidth = weatherForecast.clientWidth;
      const weatherForecastHeight = weatherForecast.clientHeight;

      const x = e.layerX;
      const y = e.y;

      if (x + 170 > weatherForecastWidth) {
        this.x = x - 150;
      } else {
        this.x = x - 5;
      }

      if (y + 80 > weatherForecastHeight) {
        this.y = y - 100;
      } else {
        this.y = y - 35;
      }
    },

    handleContext(e) {
      if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        return false;
      }

      let domEl = e.target;
      while (domEl) {
        if (
          domEl.nodeName.toLowerCase() === "body"
          || domEl.classList.contains("chart")
          || domEl.classList.contains("loading")
        ) {
          this.showing = false;
          break;
        }

        if (domEl.classList.contains("withContext")) {
          this.setMenuCoords(e);
          this.showing = true;
          break;
        }

        if (domEl.parentNode) {
          domEl = domEl.parentNode;
        }
      }

      return false;
    }
  }
};
</script>

<style lang="scss" scoped>
.context {
  position: absolute;
  z-index: 10;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  padding: 5px;

  background-color: var(--main-background-color);
  border: 1px solid #333333;
  border-radius: 10px;

  &Button {
    width: 100%;
    padding: 5px;

    text-align: center;
    white-space: nowrap;

    border-radius: 5px;

    cursor: pointer;

    &:hover {
      background-color: rgba(153, 153, 153, 0.3);
    }
  }
}

.context-enter-active,
.context-leave-active {
  transition: opacity 0.2s ease;
}

.context-enter-from,
.context-leave-to {
  opacity: 0;
}
</style>