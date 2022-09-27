<template>
  <div>
    <widget-loading v-if="loading" />

    <div
      v-else
      class="currencies"
    >
      <select
        id="from"
        v-model="from"
        class="currencies__from"
        name="from"
        title="Сконвертировать из"
      >
        <option
          v-for="currency in currenciesList"
          :key="currency"
          :value="currency"
        >
          {{ currency }}
        </option>
      </select>

      ->

      <select
        id="to"
        v-model="to"
        class="currencies__to"
        name="to"
        title="Сконвертировать в"
      >
        <option
          v-for="currency in currenciesList"
          :key="currency"
          :value="currency"
        >
          {{ currency }}
        </option>
      </select>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import WidgetLoading from "@/components/WidgetLoading.vue";

export default defineComponent({
  name: "ExchangeRateForm",

  components: { WidgetLoading },

  props: {
    loading: {
      type: Boolean,
      required: true,
      default: true
    },

    currenciesList: {
      type: Array as PropType<Array<string>>,
      required: true,
      default: (): Array<string> => []
    }
  },

  data() {
    return {
      from: "USD",
      to: "RUB"
    };
  },

  watch: {
    from() {
      this.updateExchangeRate();
    },

    to() {
      this.updateExchangeRate();
    }
  },

  mounted() {
    this.updateExchangeRate();
  },

  methods: {
    updateExchangeRate() {
      this.$emit("updateExchangeRate", {
        from: this.from,
        to: this.to
      });
    }
  }
});
</script>

<style lang="scss" scoped>
div {
  .currencies {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 10px;

    &__from,
    &__to {
      display: flex;
      justify-content: center;
      align-items: center;

      min-width: 10px;
      min-height: 10px;
      padding: 5px 10px;

      font-size: 14px;
      text-align: center;

      border: 1px solid #999999;
      border-radius: 10px;

      cursor: pointer;
    }
  }
}
</style>