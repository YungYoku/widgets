<template>
  <div
    v-if="!hidden"
    :class="[
      uniqueClassName,
      isCollapsed ? 'collapsed' : ''
    ]"
    :style="{
      order
    }"
    class="widget exact-time"
  >
    <widget-navigation
      :rules="navigationRules"
      class="navigation"
      @closeWidget="closeWidget"
      @collapseWidget="collapseWidget"
    />

    <h2 class="title">
      Точное время
    </h2>

    <exact-time-form
      :loading="loading"
      @loadTimeByTimezone="loadTimeByTimezone"
    />

    <widget-error
      v-if="errorExists"
      :text="errorText"
    />

    <div
      v-else
      class="exact-time__content"
    >
      <widget-loading v-if="loading" />

      <exact-time-clocks
        v-else
        :hours="hours"
        :minutes="minutes"
        :seconds="seconds"
      />


      <widget-loading v-if="loading" />

      <div
        v-else
        class="exact-time__time"
      >
        <h3 class="text">
          {{ time }}
        </h3>

        <h3 class="text">
          {{ date }}
        </h3>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import WidgetNavigation from "@/components/WidgetNavigation.vue";
import WidgetLoading from "@/components/WidgetLoading.vue";
import ExactTimeClocks from "@/components/exactTime/ExactTimeClocks.vue";
import ExactTimeForm from "@/components/exactTime/ExactTimeForm.vue";
import WidgetError from "@/components/WidgetError.vue";
import { Time } from "@/interfaces/time";
import { TimeResponse } from "@/interfaces/timeResponse";
import { TimeError } from "@/interfaces/timeError";
import axios, { AxiosResponse } from "axios";
import { Navigation } from "@/enums/navigation";

export default defineComponent({
  name: "ExactTime",

  components: {
    WidgetError,
    ExactTimeForm,
    ExactTimeClocks,
    WidgetLoading,
    WidgetNavigation
  },

  props: {
    id: {
      type: Number,
      required: true,
      default: 0
    },

    order: {
      type: Number,
      required: true,
      default: 0
    },

    hidden: {
      type: Boolean,
      required: true,
      default: false
    }
  },

  data() {
    return {
      baseURL: process.env.VUE_APP_TIME_BASE_URL,
      loading: true,
      isCollapsed: false,
      interval: null as unknown as ReturnType<typeof setInterval>,
      date: "0000-00-00",
      hours: 0,
      minutes: 0,
      seconds: 0,
      errorExists: false,
      errorText: ""
    };
  },

  computed: {
    uniqueClassName() {
      return `exact-time${this.id}`;
    },

    navigationRules() {
      return [Navigation.Close, Navigation.Collapse];
    },

    time() {
      const hours = this.hours < 10 ? "0" + this.hours : this.hours;
      const minutes = this.minutes < 10 ? "0" + this.minutes : this.minutes;
      const seconds = this.seconds < 10 ? "0" + this.seconds : this.seconds;

      return `${hours}:${minutes}:${seconds}`;
    }
  },

  mounted() {
    this.loadTimeByIp();
  },

  destroyed() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  },

  methods: {
    async loadTimeByIp() {
      await this.request("ip");
    },

    async loadTimeByTimezone(timezone: string) {
      await this.request("timezone/" + timezone);
    },

    async request(path: string) {
      this.showLoading();

      await axios
        .get(`${this.baseURL}${path}`)
        .then((response: AxiosResponse<TimeResponse>) => {
          this.resetError();

          const datetime = response.data.datetime;
          const time = this.formatTime(datetime);

          this.setTime(time);
        })
        .catch(this.handleRequestErrors)
        .finally(this.hideLoading);
    },

    resetError() {
      this.errorExists = false;
      this.errorText = "";
    },

    showLoading() {
      this.loading = true;
    },

    hideLoading() {
      this.loading = false;
    },

    formatTime(unformatedTime: string) {
      const fullTime = unformatedTime.split("T");

      const date = fullTime[0];

      const time = fullTime[1]
        .split(".")[0]
        .split(":")
        .map(digit => parseInt(digit));

      return {
        date,
        hours: time[0],
        minutes: time[1],
        seconds: time[2]
      } as Time;
    },

    setTime(time: Time) {
      if (time) {
        this.date = time.date;
        this.hours = time.hours;
        this.minutes = time.minutes;
        this.seconds = time.seconds;

        this.startClocks();
      }
    },

    startClocks() {
      if (!this.interval) {
        this.interval = setInterval(this.increaseSeconds, 1000);
      }
    },

    handleRequestErrors(error: TimeError) {
      this.errorExists = true;

      const status = error.response.status;
      const statusText = error.response.statusText;

      this.errorText = statusText;

      if (status === 404) {
        console.error(`${statusText} ${error}`);
      } else {
        console.error(error);
      }
    },

    increaseSeconds() {
      if (this.seconds < 59) {
        this.seconds++;
      } else {
        this.seconds = 0;

        this.increaseMinutes();
      }
    },

    increaseMinutes() {
      if (this.minutes < 59) {
        this.minutes++;
      } else {
        this.minutes = 0;

        this.increaseHours();
      }
    },

    increaseHours() {
      if (this.hours < 23) {
        this.hours++;
      } else {
        this.hours = 0;
      }
    },

    collapseWidget() {
      this.isCollapsed = !this.isCollapsed;
    },

    closeWidget() {
      this.$emit("closeWidget", this.id);
    }
  }
});
</script>

<style lang="scss" scoped>
.exact-time {
  max-width: 350px;

  background-color: #ffffff;

  &.collapsed {
    max-width: 96px;
    max-height: 62px;
    padding: 20px;
    overflow: hidden;

    transition: all 0.3s;
  }

  &__content {
    display: grid;

    grid-gap: 10px;

    .text {
      text-align: center;
    }
  }
}
</style>