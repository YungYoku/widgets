<template>
  <div class="widget exactTime">
    <h2 class="title">
      Точное время
    </h2>

    <h3>
      {{ time }}
    </h3>
  </div>
</template>

<script>
export default {
  name: "ExactTime",

  data() {
    return {
      hours: 0,
      minutes: 0,
      seconds: 0
    };
  },

  computed: {
    time() {
      const hours = this.hours < 10 ? "0" + this.hours : this.hours;
      const minutes = this.minutes < 10 ? "0" + this.minutes : this.minutes;
      const seconds = this.seconds < 10 ? "0" + this.seconds : this.seconds;

      return `${hours}:${minutes}:${seconds}`;
    }
  },

  mounted() {
    this.loadTime();
  },

  methods: {
    formatTime(str) {
      const time = str
        .split("T")[1]
        .split(".")[0]
        .split(":");

      return time.map(dig => parseInt(dig));
    },

    loadTime() {
      this.$http.get("https://worldtimeapi.org/api/ip")
        .then(response => {
          const time = response.data.datetime;

          if (time) {
            this.startClocks(this.formatTime(time));
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

    startClocks(time) {
      this.hours = time[0];
      this.minutes = time[1];
      this.seconds = time[2];

      setInterval(this.increaseSeconds, 1000);
    }
  }
};
</script>

<style lang="scss" scoped>
.exactTime {
  max-width: 400px;

  background-color: #ffffff;
}
</style>