<template>
  <div class="settings">
    <weather-forecast-close-button
      @close="$emit('close')"
    />

    <h2 class="settings__title">
      Настройки
    </h2>

    <div class="settings__list">
      <div
        v-for="setting in settings"
        :key="setting.title"
        class="settings__list-item"
      >
        {{ setting.title }}
        <button
          :class="{
            'turned-on': setting.turnedOn
          }"
          class="settings__list-item-button"
          @click="swapSetting(setting.name, setting.actionType)"
        >
        </button>
      </div>
    </div>

    <widget-developer-links />

    <h5 class="settings__developer">
      Разработчик: Максим Алейников
    </h5>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import WeatherForecastCloseButton from "@/components/weatherForecast/WeatherForecastBackButton.vue";
import WidgetDeveloperLinks from "@/components/WidgetDeveloperLinks.vue";
import { SettingName, WeatherForecastLSSettings } from "@/interfaces/weatherForecastLSSetting";
import { WeatherForecastSettings } from "@/interfaces/weatherForecastSetting";

export default Vue.extend({
  name: "WeatherForecastSettings",

  components: { WidgetDeveloperLinks, WeatherForecastCloseButton },

  data() {
    return {
      settings: [
        {
          name: SettingName.Geo,
          title: "Использовать местоположение",
          turnedOn: true,
          actionType: "giveGeoAccess"
        },

        {
          name: SettingName.Theme,
          title: "Фиолетовая тема",
          turnedOn: false,
          actionType: "switchTheme"
        }
      ] as WeatherForecastSettings
    };
  },

  created() {
    this.loadLsSettings();
  },

  methods: {
    swapSetting(name: SettingName, actionType: string) {
      const setting = this.settings.find(item => item.name === name);

      if (setting) {
        const turnedOn = !setting.turnedOn;

        const storage = JSON.parse(localStorage.settings) as WeatherForecastLSSettings;
        if (storage) {
          const storageSetting = storage.find(item => item.name === name);
          if (storageSetting) {
            setting.turnedOn = turnedOn;

            storageSetting.turnedOn = turnedOn;
            localStorage.settings = JSON.stringify(storage);

            this.$emit(actionType, turnedOn);

            this.resetLsSettings();
          }

          return false;
        }

        return false;
      }

      return false;
    },

    resetLsSettings() {
      const settings = this.settings.map(setting => {
        return {
          name: setting.name,
          turnedOn: setting.turnedOn
        };
      });

      localStorage.settings = JSON.stringify(settings);
    },

    updateSettingsFromLs() {
      const lsSettings = JSON.parse(localStorage.settings);
      const length = this.settings.length;

      for (let i = 0; i < length; i++) {
        if (this.settings[i].name === lsSettings[i].name) {
          this.settings[i].turnedOn = lsSettings[i].turnedOn;
        }
      }
    },

    loadLsSettings() {
      if (localStorage.settings) {
        const lsSettings = JSON.parse(localStorage.settings) as WeatherForecastLSSettings;

        if (lsSettings.length !== this.settings.length) {
          this.resetLsSettings();
        } else {
          this.updateSettingsFromLs();
        }
      } else {
        this.resetLsSettings();
      }
    }
  }
});
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
  padding: 30px 20px 20px 20px;

  background-color: var(--main-background-color);
  @supports (backdrop-filter: blur(20px)) {
    background-color: transparent;

    backdrop-filter: blur(20px);
  }
  border-radius: 15px;

  &__title {
    margin: 0 0 20px 0;

    font-size: 26px;
    font-weight: 700;
    overflow-wrap: break-word;
  }

  &__list {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    margin-bottom: auto;
    gap: 10px;

    &-item {
      display: flex;
      justify-content: center;
      align-items: center;

      &-button {
        display: flex;
        justify-content: center;
        align-items: center;

        box-sizing: border-box;

        width: 40px;
        min-width: 40px;
        height: 24px;
        margin: 0 0 0 10px;
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

        &.turned-on {
          padding: 2px 2px 2px 18px;

          background-color: #4bff46;

          transition: all 0.3s;
        }
      }
    }
  }

  &__developer {
    margin: 10px 0 0 0;

    font-size: 16px;
    font-weight: 400;
    text-align: center;
    overflow-wrap: break-word;
  }
}
</style>