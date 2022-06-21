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
    uniqueClassName: {
      type: String,
      required: true,
      default: ""
    },

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
    document.querySelector(this.uniqueClassName).oncontextmenu = this.handleContext;
  },

  destroyed() {
    document.removeEventListener("click", this.handleClick);
  },

  methods: {
    handleClick() {
      this.showing = false;
    },

    getMouseX(e) {
      const pageX = e.pageX;
      const clientX = e.clientX;

      if (pageX) {
        return pageX;
      } else if (clientX) {
        return (
          clientX
          + (
            document.documentElement.scrollLeft
            || document.body.scrollLeft
          )
          - document.documentElement.clientLeft
        );
      }

      return 0;
    },

    getMouseY(e) {
      const pageY = e.pageY;
      const clientY = e.clientY;

      if (pageY) {
        return pageY;
      } else if (clientY) {
        return (
          clientY
          + (
            document.documentElement.scrollTop
            || document.body.scrollTop
          )
          - document.documentElement.clientTop
        );
      }

      return 0;
    },

    setMenuCoords(e) {
      const weatherForecast = document.querySelector(this.uniqueClassName);
      const weatherForecastWidth = weatherForecast.clientWidth;
      const weatherForecastHeight = weatherForecast.clientHeight;

      const clickX = this.x = this.getMouseX(e) - 35;
      const clickY = this.y = this.getMouseY(e) - 35;

      if (clickX + 155 > weatherForecastWidth) {
        this.x = clickX - 155;
      }

      if (clickY + 70 > weatherForecastHeight) {
        this.y = clickY - 70;
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
          || domEl.classList.contains("without-context")
          || domEl.classList.contains("loading")
        ) {
          this.showing = false;
          break;
        }

        if (domEl.classList.contains("with-context")) {
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