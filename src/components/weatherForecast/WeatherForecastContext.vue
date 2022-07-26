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
        class="context__button"
        @click="setting.action"
      >
        {{ setting.text }}
      </button>
    </div>
  </transition>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "WeatherForecastSettings",

  props: {
    uniqueClassName: {
      type: String,
      required: true,
      default: ""
    },

    copyingData: {
      type: String,
      required: true,
      default: ""
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
            navigator.clipboard.writeText(this.copyingData);
          }
        },

        {
          text: "Сохранить",
          action: () => {
            if (localStorage.saved) {
              const saved = JSON.parse(localStorage.saved);

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

    const block = document.querySelector(this.uniqueClassName) as HTMLElement;
    if (block) {
      block.oncontextmenu = this.handleContext;
    }
  },

  destroyed() {
    document.removeEventListener("click", this.handleClick);
  },

  methods: {
    handleClick() {
      this.showing = false;
    },

    getMouseX(event: MouseEvent) {
      const pageX = event.pageX;
      const clientX = event.clientX;

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

    getMouseY(event: MouseEvent) {
      const pageY = event.pageY;
      const clientY = event.clientY;

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

    setMenuCoords(event: MouseEvent) {
      const weatherForecast = document.querySelector(this.uniqueClassName) as HTMLElement;

      if (weatherForecast) {
        const weatherForecastWidth = weatherForecast.clientWidth;
        const weatherForecastHeight = weatherForecast.clientHeight;

        const clickX = this.x = this.getMouseX(event) - weatherForecast.offsetLeft;
        const clickY = this.y = this.getMouseY(event) - weatherForecast.offsetTop;

        if (clickX + 155 > weatherForecastWidth) {
          this.x = clickX - 155;
        }

        if (clickY + 70 > weatherForecastHeight) {
          this.y = clickY - 70;
        }
      }
    },

    isItMobileDevice() {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    },

    doesNotItNeedContext(domEl: HTMLElement) {
      return (
        domEl.nodeName.toLowerCase() === "body" ||
        domEl.classList.contains("without-context")
      );
    },

    doesItNeedContext(domEl: HTMLElement) {
      return domEl.classList.contains("with-context");
    },

    handleContext(event: MouseEvent) {
      this.showing = false;

      if (this.isItMobileDevice()) {
        return false;
      }

      let domEl = event.target as HTMLElement;
      while (domEl) {
        if (this.doesNotItNeedContext(domEl)) {
          this.showing = false;
          break;
        }

        if (this.doesItNeedContext(domEl)) {
          this.setMenuCoords(event);
          this.showing = true;
          break;
        }

        if (domEl.parentNode) {
          domEl = domEl.parentNode as HTMLElement;
        }
      }

      return false;
    }
  }
});
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
  @supports (backdrop-filter: blur(20px)) {
    background-color: transparent;

    backdrop-filter: blur(20px);
  }
  border: 1px solid #333333;
  border-radius: 10px;

  &__button {
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