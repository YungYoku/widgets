<template>
  <div class="timezone">
    <h3 class="text">
      Регион:
    </h3>

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
</template>

<script lang="ts">
import { defineComponent } from "vue";
import _timezones from "@/assets/js/timezones";

export default defineComponent({
  name: "ExactTimeForm",

  data() {
    return {
      timezone: "Не выбран"
    };
  },

  computed: {
    timezones() {
      if (_timezones) {
        return _timezones;
      }
      return [];
    }
  },

  watch: {
    timezone() {
      this.$emit("loadTimeByTimezone", this.timezone);
    }
  }
});
</script>

<style lang="scss" scoped>
.timezone {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;

  select {
    max-width: 150px;
    padding: 5px 10px;

    font-size: 14px;

    border: 1px solid #999999;
    border-radius: 10px;

    cursor: pointer;
  }
}
</style>