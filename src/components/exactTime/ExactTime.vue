<template>
  <div
    v-if="!hidden"
    :class="[
      uniqueClassName,
      isCollapsed ? 'collapsed' : ''
    ]"
    :style="{order}"
    class="widget exact-time"
    @dragstart="startDrag($event)"
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

    <div class="exact-time__timezone">
      <h4 class="text">
        Выберите регион:
      </h4>

      <select
        id="timezone"
        v-model="timezone"
        name="timezone"
        title="Регион"
      >
        <option
          disabled
          hidden
          selected
          value="Не выбран"
        >
          Не выбран
        </option>

        <option
          v-for="timezone in timezones"
          :key="timezone"
          :value="timezone"
        >
          {{ timezone }}
        </option>
      </select>
    </div>


    <exact-time-clocks
      :hours="hours"
      :minutes="minutes"
      :seconds="seconds"
    />


    <widget-loading v-if="loading" />

    <h3
      v-else
      class="text"
    >
      {{ time }}
    </h3>
  </div>
</template>

<script>
import timezones from "@/assets/js/timezones";
import WidgetNavigation from "@/components/WidgetNavigation";
import WidgetLoading from "@/components/WidgetLoading";
import ExactTimeClocks from "@/components/exactTime/ExactTimeClocks";

export default {
  name: "ExactTime",

  components: { ExactTimeClocks, WidgetLoading, WidgetNavigation },

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
      baseURL: "https://worldtimeapi.org/api/",
      loading: true,
      isCollapsed: false,
      interval: null,
      timezone: "Не выбран",
      hours: 0,
      minutes: 0,
      seconds: 0
    };
  },

  computed: {
    uniqueClassName() {
      return `exact-time${this.id}`;
    },

    timezones() {
      if (timezones) {
        return timezones;
      }
      return [];
    },

    time() {
      const hours = this.hours < 10 ? "0" + this.hours : this.hours;
      const minutes = this.minutes < 10 ? "0" + this.minutes : this.minutes;
      const seconds = this.seconds < 10 ? "0" + this.seconds : this.seconds;

      return `${hours}:${minutes}:${seconds}`;
    },

    navigationRules() {
      return ["close", "collapse"];
    }
  },

  watch: {
    timezone() {
      this.loadTimeByTimezone();
    }
  },

  mounted() {
    this.loadTimeByIp();
  },

  destroyed() {
    clearInterval(this.interval);
  },

  methods: {
    startDrag(e) {
      e.dataTransfer.dropEffect = "move";
      e.dataTransfer.effectAllowed = "move";
      e.dataTransfer.setData("itemID", this.id.toString());
    },

    collapseWidget() {
      this.isCollapsed = !this.isCollapsed;
    },

    formatTime(str) {
      const time = str
        .split("T")[1]
        .split(".")[0]
        .split(":");

      return time.map(dig => parseInt(dig));
    },

    loadTimeByIp() {
      this.loading = true;

      this.$http.get(`${this.baseURL}ip`)
        .then(response => {
          const time = response.data.datetime;

          if (time) {
            this.startClocks(this.formatTime(time));
          }

          this.loading = false;
        })
        .catch(error => {
          console.error(error);
        });
    },

    loadTimeByTimezone() {
      this.loading = true;

      this.$http.get(`${this.baseURL}timezone/${this.timezone}`)
        .then(response => {
          this.loading = false;

          const time = response.data.datetime;

          if (time) {
            this.setResponseTime(this.formatTime(time));
          }
        })
        .catch(error => {
          console.error(error);
        });
    },

    increaseHours() {
      if (this.hours < 23) {
        this.hours++;
      } else {
        this.hours = 0;
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

    increaseSeconds() {
      if (this.seconds < 59) {
        this.seconds++;
      } else {
        this.seconds = 0;

        this.increaseMinutes();
      }
    },

    setResponseTime(time) {
      this.hours = time[0];
      this.minutes = time[1];
      this.seconds = time[2];
    },

    startClocks(time) {
      this.setResponseTime(time);
      this.interval = setInterval(this.increaseSeconds, 1000);
    },

    closeWidget() {
      this.$emit("closeWidget", this.id);
    }
  }
};
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

  &__timezone {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;

    select {
      max-width: 150px;
      padding: 10px;

      border: 1px solid #999999;
      border-radius: 15px;
    }
  }

  .text {
    text-align: center;
  }
}
</style>