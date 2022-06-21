<template>
  <div class="widget exact-time">
    <widget-navigation
      :rules="navigationRules"
      class="navigation"
      @closeWidget="closeWidget"
    />

    <h2 class="title">
      Точное время
    </h2>

    <div class="exact-time__region">
      <h4>Выберите регион: </h4>
      <select
        id=""
        v-model="timezone"
        name=""
      >
        <option
          v-for="timezone in timezones"
          :key="timezone"
          :value="timezone"
        >
          {{ timezone }}
        </option>
      </select>
    </div>


    <widget-loading v-if="loading" />

    <h3 v-else>
      {{ time }}
    </h3>
  </div>
</template>

<script>
import timezones from "@/assets/js/timezones";
import WidgetNavigation from "@/components/WidgetNavigation";
import WidgetLoading from "@/components/WidgetLoading";

export default {
  name: "ExactTime",

  components: { WidgetLoading, WidgetNavigation },

  props: {
    id: {
      type: Number,
      required: true,
      default: 0
    }
  },

  data() {
    return {
      baseURL: "https://worldtimeapi.org/api/",
      loading: true,
      timezone: "",
      hours: 0,
      minutes: 0,
      seconds: 0
    };
  },

  computed: {
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
      return ["Выход"];
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

  methods: {
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
          this.loading = false;

          const time = response.data.datetime;

          if (time) {
            this.startClocks(this.formatTime(time));
          }
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
      setInterval(this.increaseSeconds, 1000);
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

  &__region {
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
}
</style>