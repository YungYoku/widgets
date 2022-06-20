<template>
  <div class="settings">
    <h2 class="settingsTitle">
      Настройки
    </h2>

    <weather-forecast-close-button @close="$emit('close')" />

    <div class="settingsList">
      <div
        v-for="(setting, i) in settings"
        :key="setting.title"
        class="settingsListItem"
      >
        {{ setting.title }}
        <button
          :class="{
            'turnedOn': setting.turnedOn
          }"
          class="settingsListItemButton"
          @click="setting.action(i)"
        >
        </button>
      </div>
    </div>

    <div class="settingsSocial">
      <button
        v-for="link in links"
        :key="link.href"
        class="settingsSocialLink"
        @click="link.action"
      >
        <img
          :alt="link.alt"
          :src="link.image"
          class="settingsSocialLinkImg"
        />
      </button>
    </div>

    <h5 class="settingsDeveloper">
      Разработчик: Максим Алейников
    </h5>
  </div>
</template>

<script>
import vk from "@/assets/img/vk.svg";
import telegram from "@/assets/img/telegram.svg";
import WeatherForecastCloseButton from "@/components/weatherForecast/WeatherForecastCloseButton";

export default {
  name: "WeatherForecastSettings",
  components: { WeatherForecastCloseButton },
  data() {
    return {
      settings: [
        {
          title: "Использовать местоположение, если возможно",
          turnedOn: true,
          action: i => {
            const turnedOn = !this.settings[i].turnedOn;

            this.settings[i].turnedOn = turnedOn;

            const storage = JSON.parse(localStorage.settings);
            if (storage) {
              storage[i].turnedOn = turnedOn;
              localStorage.settings = JSON.stringify(storage);
            }

            this.$emit("giveGeoAccess", turnedOn);
          }
        },

        {
          title: "Фиолетовая тема",
          turnedOn: false,
          action: i => {
            const turnedOn = !this.settings[i].turnedOn;

            this.settings[i].turnedOn = turnedOn;

            const storage = JSON.parse(localStorage.settings);
            if (storage) {
              storage[i].turnedOn = turnedOn;
              localStorage.settings = JSON.stringify(storage);
            }
            if (turnedOn) {
              this.$emit("switchTheme", "purple");
            } else {
              this.$emit("switchTheme", "light");
            }
          }
        }
      ],
      links: [
        {
          image: vk,
          alt: "Вконтакте",
          action: () => window.open("https://vk.com/yokuu", "_blank")
        },
        {
          image: telegram,
          alt: "Телеграм",
          action: () => window.open("https://t.me/yungyoku", "_blank")
        }
      ]
    };
  },

  created() {
    if (localStorage.settings) {
      const storage = JSON.parse(localStorage.settings);
      const length = this.settings.length;

      if (storage.length !== length) {
        this.saveCommonSettings();
      }

      for (let i = 0; i < length; i++) {
        if (this.settings[i].title === storage[i].title) {
          this.settings[i].turnedOn = storage[i].turnedOn;
        }
      }
    } else {
      this.saveCommonSettings();
    }
  },

  methods: {
    saveCommonSettings() {
      const settings = this.settings.map(setting => {
        return {
          title: setting.title,
          turnedOn: setting.turnedOn
        };
      });
      localStorage.settings = JSON.stringify(settings);
    }
  }
};
</script>

<style lang="scss" scoped>
.settings {
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
  padding: 60px 20px 20px 20px;

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
    flex-direction: column;
    justify-content: center;
    align-items: center;

    margin-bottom: auto;
    gap: 10px;

    &Item {
      display: flex;
      justify-content: center;
      align-items: center;

      &Button {
        display: flex;
        justify-content: center;
        align-items: center;

        box-sizing: border-box;

        width: 40px;
        min-width: 40px;
        height: 24px;
        margin: 0 10px;
        padding: 2px 18px 2px 2px;
        overflow: hidden;

        font: inherit;
        font-size: 14px;
        font-weight: 400;
        color: #333333;

        background-color: #d6d6d6;
        border-radius: 20px;

        cursor: pointer;
        transition: all 0.3s;

        -webkit-appearance: button;

        &:focus {
          background-color: #666666;
        }

        &::after {
          content: '';

          width: 20px;
          min-width: 20px;
          height: 20px;

          background-color: #ffffff;
          border-radius: 50%;
          box-shadow: 0 1px 20px 1px #999999;
        }

        &.turnedOn {
          padding: 2px 2px 2px 18px;

          background-color: #4bff46;

          transition: all 0.3s;
        }
      }
    }
  }

  &Social {
    display: flex;
    justify-content: center;
    align-items: center;

    &Link {
      display: block;

      width: 32px;
      height: 32px;
      margin: 0 5px;
      padding: 0;

      text-decoration: none;

      background-color: transparent;
      border: none;

      cursor: pointer;
      transition: all 0.1s;

      &:hover,
      &:focus {
        transform: scale(1.1);
        transition: all 0.1s;
      }

      &Img {
        display: block;

        width: 32px;
        height: 32px;

        pointer-events: none;

        @supports (aspect-ratio: 1 / 1) {
          aspect-ratio: 1 / 1;
        }
      }
    }
  }

  &Developer {
    margin: 10px 0 0 0;

    font-size: 16px;
    font-weight: 400;
    text-align: center;
    overflow-wrap: break-word;
  }
}
</style>